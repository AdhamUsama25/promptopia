"use client";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { IPost } from "@Types/prompt.types";
import { useParams, useRouter } from "next/navigation";
import { IUser } from "@Types/user.types";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const params: { username: string } = useParams();
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/api/users/username/${params.username}`);
        const data = await response.json();
        if (!data) router.push("/404");
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [params, params.username, router, session?.user?.id]);

  useEffect(() => {
    if (session) {
      if (session.user?.id === user?._id) {
        router.push("/profile");
      }
    }
  }, [session, user, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${user?._id}/posts`);
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?._id) fetchPosts();
  }, [user]);

  return (
    user && (
      <Profile
        name={user.username}
        desc={`Welcome to ${user.username} profile page`}
        data={userPosts}
      />
    )
  );
};

export default UserProfile;
