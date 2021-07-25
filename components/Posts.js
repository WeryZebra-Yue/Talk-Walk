import {useCollection} from "react-firebase-hooks/firestore"
import { db } from "../firebasee";
import Post from "./Post";


function Posts({p}) {
     const [realtimePosts] = useCollection(db.collection('post').orderBy('timestap','desc'));
     
    return (
        <div className="m-3">
          

           {    
                
        
               realtimePosts?.docs.map((post,index)=>{
                  
                  return <Post
                    key = {index}
                    indexOfPost = {index}
                    name = {post.data().name}
                    message = {post.data().message}
                    email = {post.data().email}
                    timestamp = {post.data().timestap}
                    image = {post.data().image}
                    postImage = {post.data().postImage}
                    Type = {post.data().Type?post.data().Type:false}
                    id = {post.data().id}
                   />
                })
            //    }):(
            //     p.map((postt,index)=>{
                  
            //         return <Post
            //           key = {index}
            //           name = {postt.data().name}
            //           message = {postt.data().message}
            //           email = {postt.data().email}
            //           timestamp = {postt.data().timestap}
            //           image = {postt.data().image}
            //           postImage = {postt.data().postImage}
            //           id = {post.data().id}
            //          />
            //     }
            //    ))
               
           }     
        </div>
    )
}

export default Posts
