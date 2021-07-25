import {useRouter} from "next/router"
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import PostPage from "../../components/PostPage";
import { db } from "../../firebasee";
import Head from 'next/head'

function Post() {
    const router = useRouter();
    const [route,setroute] = useState(null)
    const [realtimePosts] = useCollection(db.collection('post').where("id","==",route))
    useEffect(() => {
        if (router.asPath !== router.route) {
            setroute(router.query.post)
      
        }
    }
    , [router])
    if(route)
    {  
        
        return (
            <div className=" w-full justify-center m-0 p-0 bg-gray-200 min-h-screen">
               
              <div className="mx-auto  max-w-md md:max-w-lg lg:max-w-2xl ">
                          
                <div className="flex min-h-screen">
                    <div className="flex flex-col w-full self-center justify-self-center items-center justify-center  p-3 mb-3  ">
                {
             realtimePosts?.docs.map((post,index)=>{
                  
                 return <PostPage
                   key = {index}
                   name = {post.data().name}
                   message = {post.data().message}
                   email = {post.data().email}
                   timestamp = {post.data().timestap}
                   image = {post.data().image}
                   postImage = {post.data().postImage}
                   Type = {post.data().Type}
                   id = {post.data().id}
                  />
                  })
                }
                {/* Hello */}
            </div>
             </div>
             </div>
             </div>
    )}
    else{
       
        return (
            <div className="h-screen bg-gray-200">
        
        
            </div>
    )  
    }
}

export default Post
