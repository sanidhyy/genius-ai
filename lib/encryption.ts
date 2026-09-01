import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100_000;

const getEncryptionSecret = () => {
  const secret = process.env.ENCRYPTION_SECRET;

  if (!secret) throw new Error("ENCRYPTION_SECRET is not configured.");

  return secret;
};

const getKey = (salt: Buffer) =>
  crypto.pbkdf2Sync(
    getEncryptionSecret(),
    salt,
    ITERATIONS,
    KEY_LENGTH,
    "sha256",
  );

export const encrypt = (text: string) => {
  if (!text) return "";

  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKey(salt);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  const result = Buffer.concat([salt, iv, tag, encrypted]);

  return result.toString("base64");
};

export const decrypt = (encryptedText: string) => {
  if (!encryptedText) return "";

  try {
    const buffer = Buffer.from(encryptedText, "base64");
    const minLength = SALT_LENGTH + IV_LENGTH + TAG_LENGTH;

    if (buffer.length < minLength) return "";

    const salt = buffer.subarray(0, SALT_LENGTH);
    const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = buffer.subarray(
      SALT_LENGTH + IV_LENGTH,
      SALT_LENGTH + IV_LENGTH + TAG_LENGTH,
    );
    const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const key = getKey(salt);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};
