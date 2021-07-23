import {useCollection} from "react-firebase-hooks/firestore"
import { db } from "../firebasee";
import Post from "./Post";


function Prpost({user,flag}) {
    const [realtimePosts] = useCollection(db.collection('post').where("email","==",`${user}`))
    if(!flag){



    
 
    return (
      
        <div className="flex flex-col w-full self-center p-y-10 m-3 justify-self-center items-center justify-center">
        {
            realtimePosts?.docs.length != "0"?(
             
            realtimePosts?.docs.map((post,index)=>{
                  
                        return <Post
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
            })):(
                <div className=" flex h-screen items-center">
                    {
                        realtimePosts?.docs.length == "0"?(
                            <div className="flex text-2xl font-medium mb-20">No post yet!</div>
                        ):null
                    }
                    

                </div>
            )
        }
        </div>
      
    )
    }else{
        return(
        <div className="flex flex-col w-full self-center p-y-10 m-3 justify-self-center items-center justify-center">
            <div className=" flex h-screen items-center">
            <div className="flex text-2xl font-medium mb-20">No Account Found!</div>
            </div>
        </div>
        )
    }
}

export default Prpost
