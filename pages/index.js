import { HomeIcon } from '@heroicons/react/solid'
import { getSession, useSession } from 'next-auth/client'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import HeaderIcon from '../components/HeaderIcon'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import { db ,rdb } from '../firebase'

export default function Home({session}) {


  if(!session) return <Login/>;
  else{
    const [sessions] = useSession();
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