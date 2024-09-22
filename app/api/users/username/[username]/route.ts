import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (
  _: Request,
  { params }: { params: { username: string } }
) => {
  try {
    console.log("params", params);
    await connectToDB();
    const user = await User.findOne({
        username: params.username.toLowerCase(),
    });

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("User not found", {
      status: 404,
    });
  }
};