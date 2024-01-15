import * as z from "zod";

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
    message: "Image Prompt is required.",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});
