import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import NextAuth, { Session, User as NextAuthUser, Profile } from "next-auth";

interface GoogleProfile extends Profile {
  email?: string;
  name?: string;
  picture?: string;
}
declare module "next-auth" {
  interface Session {
    user?: NextAuthUser & { id?: string };
  }
}

import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });
      if (sessionUser) {
        if (session.user) {
          session.user.id = sessionUser._id.toString();

          return session;
        }
      }
      return session;
    },
    async signIn({ profile }: { profile?: GoogleProfile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture ?? "",
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
