import Image from "next/image";

function StoryCard({name,profile,src}) {
    const seeStory = () =>{
        console.log("ss")
    }
    return (
        <div className="relative  h-32 w-20 lg:h-56 lg:w-32  rounded-3xl bg-gray-300 cursor-pointer overflow-x  transition duration-200 transform ease-in hover:scale-105  group" onClick={seeStory}>
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
            <p className="absolute bottom-0 opacity-0 group-hover:opacity-100 z-50 p-2 text-gray-800 font-bold text-[.70rem] lg:text-base ">Ayush Master</p>
 
         <Image
         className="object-cover filter rounded-3xl brightness-50 z-0 transition duration-100 group-hover:brightness-100"
         src={src}
         layout="fill"
         draggable="false"/>
        </div>
}


</div>
         
    )
}

export default StoryCard
