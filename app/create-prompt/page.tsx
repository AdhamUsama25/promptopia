"use client";
import Form from "@components/Form";
import { IPost } from "@Types/prompt.types";
import React, { useState } from "react";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      console.log(post);
      setSubmitting(false);
    }, 1000);
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
