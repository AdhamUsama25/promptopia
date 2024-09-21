import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const prompts = (await Prompt.find({
        creator: params.id,
    }).populate("creator"));

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred while fetching prompts", {
      status: 500,
    });
  }
};
