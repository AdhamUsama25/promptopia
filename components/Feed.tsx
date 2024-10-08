"use client";

import { ChangeEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { IPost } from "@Types/prompt.types";

interface PromptCardListProps {
  data: IPost[];
  handleTagClick: (tag: string) => void;
}

export const PromptCardList = ({
  data,
  handleTagClick,
}: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<IPost[]>([]);

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handleTagClick = (tag: string) => {
    setSearchQuery("#" + tag);
  };

  const filteredPosts = posts.filter((post) => {
    const modifiedSearchQuery = searchQuery.toLowerCase().trim();

    const filteredByTags = post.tags
      ?.toLowerCase()
      .includes(modifiedSearchQuery.replace("#", ""));

    const filteredByPrompt = post.prompt
      ?.toLowerCase()
      .includes(modifiedSearchQuery);

    const filteredByCreator = post.creator?.username
      ?.toLowerCase()
      .includes(modifiedSearchQuery);
      
    return filteredByTags || filteredByPrompt || filteredByCreator;
  });
  return (
    <section className="feed">
      <form className="relative w-full flex-center ">
        <input
          type="text"
          placeholder="Search for a prompt, tag, or a username"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
