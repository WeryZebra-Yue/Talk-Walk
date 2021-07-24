import { HomeIcon } from '@heroicons/react/solid'
import { getSession, useSession } from 'next-auth/client'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import HeaderIcon from '../components/HeaderIcon'
// import Login from './Login'
import Sidebar from '../components/Sidebar'
import { db ,rdb } from '../firebasee'
import Image from 'next/image'
import {signin} from 'next-auth/client'

export default function Home({session}) {

  const [sessions] = useSession();

  if(!session) return (
    <div className="grid place-items-center ">
            
    <Image
    src = "https://links.papareact.com/t4i"
    height = {400}
    width = {400}
    objectFit = "contain"
    />
    <h1 onClick={signin} className="p-5 cursor-pointer bg-blue-600 text-white rounded-full text-center font-semibold text-lg"> Log In with Google</h1>

</div>
  );
  
   rdb.ref("users").child(`${sessions.user.email.split("@")[0]}`).set({
   
      name : sessions.user.name,
      image : sessions.user.image,
      cas : sessions.user.name.toLowerCase()
 
   })
  return (

    <div  className="bg-gray-100">
      
      <Head>
        <title>FaceBook</title>
        
      </Head>
      <Header/>
     <main className="flex flex-row">
      
      {/* <Sidebar/> */}
      <Feed />
     </main>
    </div>
  )
  }

 export async function getServerSideProps(context){
   const session = await getSession(context);
  //  const posts = await db.collection("posts").orderBy("timestap","desc").get();
  //  const docs = posts.docs.map(post =>({
  //   id : post.id,
  //   ...post.data(),
  //   timestap : null 
  //  }))
   return{
     props:{
       session,
       
     },
   }
 }