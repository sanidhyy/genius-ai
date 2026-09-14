"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff, SparklesIcon, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiKeysFormSchema } from "@/schemas";
import { Heading } from "./heading";

type ApiKeysFormValues = z.infer<typeof apiKeysFormSchema>;

type ApiKeysFormProps = {
  initialValues: ApiKeysFormValues;
};

export const ApiKeysForm = ({ initialValues }: ApiKeysFormProps) => {
  const router = useRouter();
  const [openaiVisible, setOpenaiVisible] = useState(false);
  const [replicateVisible, setReplicateVisible] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const form = useForm<ApiKeysFormValues>({
    resolver: zodResolver(apiKeysFormSchema),
    defaultValues: {
      openaiApiKey: initialValues.openaiApiKey ?? "",
      replicateApiToken: initialValues.replicateApiToken ?? "",
    },
  });

  const isPending = form.formState.isSubmitting || isRemoving;
  const hasSavedKeys = Object.values(initialValues).some(
    (value) => value.trim().length > 0,
  );

  const onSubmit = async (values: ApiKeysFormValues) => {
    try {
      await axios.post("/api/settings/api-keys", values);
      toast.success("API keys saved successfully!");
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const data = error.response.data;
        toast.error(
          typeof data === "string" && data.trim()
            ? data
            : "Failed to save API keys!",
        );
        return;
      }

      toast.error("Failed to save API keys!");
      console.error(error);
    }
  };

  const onRemove = async () => {
    try {
      setIsRemoving(true);
      await axios.delete("/api/settings/api-keys");
      form.reset({
        openaiApiKey: "",
        replicateApiToken: "",
      });
      setIsRemoveOpen(false);
      toast.success("API keys removed successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to remove API keys!");
      console.error(error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <>
      <Heading
        title="AI Settings"
        description="Add your own OpenAI and Replicate keys to generate conversation, images, code, music, and video. Keys are automatically deleted after 30 days."
        icon={SparklesIcon}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

      <div className="px-4 lg:px-8 space-y-8 pb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
            autoCapitalize="off"
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="openaiApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OpenAI API Key</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={openaiVisible ? "text" : "password"}
                        placeholder="sk-•••••••••••••••••••••••••••••••••••"
                        disabled={isPending}
                        aria-disabled={isPending}
                        className="pr-10 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10"
                      disabled={isPending}
                      aria-disabled={isPending}
                      aria-label={
                        openaiVisible
                          ? "Hide OpenAI API key"
                          : "Show OpenAI API key"
                      }
                      onClick={() => {
                        setOpenaiVisible((visible) => !visible);
                      }}
                    >
                      {openaiVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormDescription>
                    Get your API Key from{" "}
                    <Link
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-foreground underline-offset-2 hover:opacity-75"
                    >
                      OpenAI
                    </Link>
                    . Make sure your account has sufficient{" "}
                    <Link
                      href="https://platform.openai.com/settings/organization/billing/credit-grants"
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-foreground underline-offset-2 hover:opacity-75"
                    >
                      credit grants
                    </Link>
                    .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="replicateApiToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Replicate API Token</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={replicateVisible ? "text" : "password"}
                        placeholder="r8_•••••••••••••••••••••••••••••••••••"
                        disabled={isPending}
                        aria-disabled={isPending}
                        className="pr-10 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10"
                      disabled={isPending}
                      aria-disabled={isPending}
                      aria-label={
                        replicateVisible
                          ? "Hide Replicate API token"
                          : "Show Replicate API token"
                      }
                      onClick={() => {
                        setReplicateVisible((visible) => !visible);
                      }}
                    >
                      {replicateVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormDescription>
                    Get your API token from{" "}
                    <Link
                      href="https://replicate.com/account/api-tokens"
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-foreground underline-offset-2 hover:opacity-75"
                    >
                      Replicate
                    </Link>
                    . Used for music and video generation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              {hasSavedKeys && (
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isPending}
                  aria-disabled={isPending}
                  onClick={() => setIsRemoveOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove API Keys
                </Button>
              )}

              <Button
                type="submit"
                disabled={isPending}
                aria-disabled={isPending}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Dialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove API Keys</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove the API keys? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRemoveOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isRemoving}
              aria-disabled={isRemoving}
              onClick={onRemove}
            >
              Remove API Keys
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
