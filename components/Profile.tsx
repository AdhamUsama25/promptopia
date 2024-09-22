import { IPost } from "@Types/prompt.types";
import PromptCard from "./PromptCard";
import Link from "next/link";
interface ProfileProps {
  name: string;
  desc: string;
  data: IPost[];
  handleEdit?: (post: IPost) => void;
  handleDelete?: (post: IPost) => void;
}
const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-fall">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      {data.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-5">
          <p className=" text-center desc">
            {name === "My" ? "You" : name} have no posts to show
          </p>
          {name === "My" && (
            <Link href="/create-prompt" className="black_btn ">
              Create Post
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
