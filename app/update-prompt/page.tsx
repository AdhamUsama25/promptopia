"use client";
import Form from "@components/Form";
import { type IUpdatePost } from "@Types/prompt.types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const EditPromptContent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IUpdatePost>({
    prompt: "",
    tags: "",
  });

  useEffect(() => {
    if(!session) router.push("/");
  }, [router, session]);

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompts/${promptId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promptId) return alert("Prompt ID not found");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/prompts/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
        }),
      });

      if (res.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

const EditPrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPromptContent />
    </Suspense>
  );
};

export default EditPrompt;
