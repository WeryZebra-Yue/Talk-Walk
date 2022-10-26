import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SEC,
    }),
  ],
  // database : "mongodb+srv://weryzebra:dSu8e0icAq3IyM67@cluster0.q0emi.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-wzpzek-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
});
