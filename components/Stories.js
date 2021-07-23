import StoryCard from "./StoryCard"
import Image from "next/image"

const stories3 = [
    {
        name :"Sonny Sangha",
        src : "https://links.papareact.com/zof",
        profile : "https://links.papareact.com/l4v"

    },
    {
        name :"Elon Musk",
        src : "https://links.papareact.com/4zn",
        profile : "https://links.papareact.com/kxk"

    }, {
        name : "Jeff Bezoz",
        src : "https://links.papareact.com/k2j",
        profile : "https://links.papareact.com/f0p"

    }, {
        name : "Mark Zuckerberg",
        src : "https://links.papareact.com/xql",
        profile : "https://links.papareact.com/snf"

    }, {
        name : "Bill Gates",
        src : "https://links.papareact.com/4u4",
        profile : "https://links.papareact.com/zvy"

    },
]
function Stories() {
    return (
        <div className="justify-center flex space-x-3 mx-auto z-0"> 

  
        {stories3.map((story,index)=>{
         return <StoryCard key ={index}src = {story.src} name = {story.name} profile ={story.profile}/>
     })}
        </div>
    )
}

export default Stories
