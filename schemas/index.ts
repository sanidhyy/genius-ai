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
    message: "Image prompt is required.",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
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
