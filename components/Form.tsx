import { type IPost } from "@Types/prompt.types";
import Link from "next/link";
import React from "react";
interface IFormProps {
  type: "Create" | "Update";
  post: IPost;
  setPost: React.Dispatch<React.SetStateAction<IPost>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: IFormProps) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world! And let your
        imagination run wild with any AI-Powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
        </label>

        <textarea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder="Write your prompt here"
          required
          className="form_textarea"
        />

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal text-gray-400">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
        </label>

        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          type="text"
          placeholder="#tag"
          required
          className="form_input"
        />

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-small">
            Cancel
          </Link>

          <button
            type="submit"
            className="px-5 py-1.5 bg-primary-orange rounded-full text-white"
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
