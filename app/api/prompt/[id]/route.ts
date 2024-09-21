import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Prompt not found", {
      status: 404,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred while updating the prompt", {
      status: 500,
    });
  }
};

export const DELETE = async (
  _: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred while deleting the prompt", {
      status: 500,
    });
  }
};
