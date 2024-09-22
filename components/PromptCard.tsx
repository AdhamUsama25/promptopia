"use client";

import { IPost } from "@Types/prompt.types";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/assets/images/logo.svg";
import copyIcon from "../public/assets/icons/copy.svg";
import copiedIcon from "../public/assets/icons/tick.svg";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
interface PromptCardProps {
  post: IPost;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: IPost) => void;
  handleDelete?: (post: IPost) => void;
}

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image ?? logo}
            alt={post.creator.username}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopyPrompt}>
          <Image
            src={copied === post.prompt ? copiedIcon : copyIcon}
            alt={copied === post.prompt ? "Copied" : "Copy prompt"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="flex gap-1">
        {post.tags.split(" ").map((tag, idx) => (
          <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(tag)}
            key={idx}
          >{`#${tag}`}</p>
        ))}
      </div>

      {session?.user?.id === post.creator._id && pathName === "/profile" && (
        <div className="flex gap-4 mt-5 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
