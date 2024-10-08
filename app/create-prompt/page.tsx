"use client";
import Form from "@components/Form";
import { ICreatePost, IUpdatePost } from "@Types/prompt.types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if(!session) router.push("/");
  }, [router, session]);

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<ICreatePost | IUpdatePost>({
    prompt: "",
    tags: "",
  } as ICreatePost);

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/prompts/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tags: post.tags,
        }),
      });

      if (res.ok) {
        router.push("/");
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
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreatePrompt;
