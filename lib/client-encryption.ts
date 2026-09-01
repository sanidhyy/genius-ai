const APP_SALT = "genius-ai-api-keys-v1";
const ALGORITHM = "AES-GCM";
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const KEY_LENGTH = 256;
const ITERATIONS = 100_000;

const toBase64 = (bytes: Uint8Array) => {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const fromBase64 = (value: string) => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const toBufferSource = (bytes: Uint8Array) => {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
};

const deriveKey = async (userId: string, salt: Uint8Array) => {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(`${APP_SALT}:${userId}`),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: toBufferSource(salt),
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ["encrypt", "decrypt"],
  );
};

export const encrypt = async (text: string, userId: string) => {
  if (!text) return "";

  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await deriveKey(userId, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv: toBufferSource(iv) },
    key,
    new TextEncoder().encode(text),
  );

  return JSON.stringify({
    salt: toBase64(salt),
    iv: toBase64(iv),
    ciphertext: toBase64(new Uint8Array(ciphertext)),
  });
};

export const decrypt = async (encryptedText: string, userId: string) => {
  if (!encryptedText) return "";

  try {
    const payload = JSON.parse(encryptedText) as {
      salt?: string;
      iv?: string;
      ciphertext?: string;
    };

    if (!payload.salt || !payload.iv || !payload.ciphertext) return "";

    const salt = fromBase64(payload.salt);
    const iv = fromBase64(payload.iv);
    const ciphertext = fromBase64(payload.ciphertext);
    const key = await deriveKey(userId, salt);
    const decrypted = await crypto.subtle.decrypt(
      { name: ALGORITHM, iv: toBufferSource(iv) },
      key,
      toBufferSource(ciphertext),
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};
