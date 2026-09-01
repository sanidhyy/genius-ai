import * as z from "zod";

import { IMAGE_RESOLUTION_VALUES } from "@/constants";

export const conversationFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

export const codeFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

export const imageFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Image prompt is required.",
  }),
  amount: z.string().min(1),
  resolution: z.enum(IMAGE_RESOLUTION_VALUES),
});

export const musicFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Music prompt is required.",
  }),
});

export const videoFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Video prompt is required.",
  }),
});

export const apiKeysFormSchema = z
  .object({
    openaiApiKey: z
      .string()
      .trim()
      .refine(
        (value) =>
          value === "" || (value.startsWith("sk-") && value.length >= 12),
        { message: "Invalid API key!" },
      ),
    replicateApiToken: z
      .string()
      .trim()
      .refine((value) => value === "" || value.length >= 8, {
        message: "Invalid API token!",
      }),
  })
  .refine(
    (data) => data.openaiApiKey.length > 0 || data.replicateApiToken.length > 0,
    {
      message: "Enter at least one API key.",
      path: ["openaiApiKey"],
    },
  );
