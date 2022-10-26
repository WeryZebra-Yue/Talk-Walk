import { HomeIcon } from "@heroicons/react/solid";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import HeaderIcon from "../components/HeaderIcon";
// import Login from './Login'
import Sidebar from "../components/Sidebar";
import { db, rdb } from "../firebasee";
import Image from "next/image";
import { signin } from "next-auth/client";
import { useRouter } from "next/router";

export default function Home({ session }) {
  const [sessions] = useSession();
  const Router = useRouter();

  if (!session)
    return (
      <div className="flex flex-col justify-center min-h-screen bg-gray-200 items-center unselectable ">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo2png.png?alt=media&token=8c95298b-3add-48b3-a9a9-44fdaa2cc6b3"
          height={200}
          width={200}
          draggable="false"
          objectFit="contain"
        />
        <h1
          onClick={signin}
          className="p-5 cursor-pointer m-7 bg-blue-800 text-white rounded-xl text-center font-semibold text-lg"
        >
          {" "}
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
        {/* <Sidebar/> */}
        <Feed />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  //  const posts = await db.collection("posts").orderBy("timestap","desc").get();
  //  const docs = posts.docs.map(post =>({
  //   id : post.id,
  //   ...post.data(),
  //   timestap : null
  //  }))
  return {
    props: {
      session,
    },
  };
}
