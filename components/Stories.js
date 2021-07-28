import StoryCard from "./StoryCard"
import Image from "next/image"
import AddStories from "./AddStories"
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebasee";

function Stories() {
    const [realtimePosts] = useCollection(db.collection('stories').orderBy('timestap','desc'));
    return (
        <div className="  flex space-x-3 mx-auto z-0 overflow-x-scroll pt-4 pb-4 pr-2 pl-2 "> 
        <AddStories/>
        {/* return <StoryCard key ={index}src = {story.src} name = {story.name} profile ={story.profile}/> */}
        {    
                
        
                realtimePosts?.docs.map((post,index)=>{
                   
                   return <StoryCard
                     key = {index}
                     profile = {post.data().image}
                     src = {post.data().postImage}
                     name = {post.data().name}
                   
                   
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

export default Stories
