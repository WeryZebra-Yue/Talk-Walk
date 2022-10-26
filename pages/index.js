import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import { db, rdb } from "../firebasee";
import Image from "next/image";
import { signin } from "next-auth/client";

export default function Home({ session }) {
  const [sessions] = useSession();

  if (!session)
    return (
      <div className="flex flex-col justify-center min-h-screen bg-gray-100 items-center unselectable gap-8">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo2png.png?alt=media&token=8c95298b-3add-48b3-a9a9-44fdaa2cc6b3"
          height={200}
          width={120}
          draggable="false"
          objectFit="contain"
        />
        <h1
          onClick={signin}
          className="px-6 py-3 cursor-pointer bg-blue-700 text-white rounded-lg text-center font-normal text-md uppercase"
        >
          Log In with Google
        </h1>
      </div>
    );

  rdb
    .ref("users")
    .child(`${sessions.user.email.split("@")[0]}`)
    .set({
      name: sessions.user.name,
      image: sessions.user.image,
      cas: sessions.user.name.toLowerCase(),
    });
  return (
    <div className="bg-gray-200 min-h-screen">
      <Head>
        <title>Talk-Walk</title>
      </Head>
      <Header />
      <main className="flex flex-row">
        <Feed />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
