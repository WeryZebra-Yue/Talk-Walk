import Image from "next/image";

function StoryCard({name,profile,src}) {
    const seeStory = () =>{
        console.log("ss")
    }
    return (
        <div className="relative  rounded-3xl bg-gray-300  flex-grow cursor-pointer overflow-x  transition duration-200 transform ease-in hover:scale-105  group" onClick={seeStory}>
            {
         src &&
        <div className="relative h-32 w-20 lg:h-56 lg:w-32 p-1 unselectable " >
         
             <Image
         className="opacity-0 absolute lg:opacity-100 rounded-full z-50 group-hover:opacity-0"
         width={40}
         height={40}
         src={profile}
         layout="fixed"
         objectFit="cover"
         draggable="false"
         />
            <p className="absolute bottom-0 opacity-0 group-hover:opacity-100 z-50 p-3 text-gray-800 font-bold ">Ayush Master</p>
 
         <Image
         className="object-cover filter rounded-3xl brightness-75 z-0 transition duration-100 hover:brightness-90"
         src={src}
         layout="fill"
         draggable="false"/>
        </div>
}


</div>
         
    )
}

export default StoryCard
