"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { IPost } from "@Types/prompt.types";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userPosts, setUserPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if(!session) router.push("/");
  }, [router, session]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session!.user!.id}/posts`);
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (session?.user?.id) fetchPosts();
  }, [session]);

  const handleEdit = async (post: IPost) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: IPost) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (!hasConfirmed) return;
    try {
      const response = await fetch(`/api/prompts/${post._id.toString()}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUserPosts((prev) => prev.filter((p) => p._id !== post._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
