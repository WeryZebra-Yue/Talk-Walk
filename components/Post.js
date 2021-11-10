import Image from "next/image"
import{
    ShareIcon
} from "@heroicons/react/solid"
import Link from "next/link"
import { useRef, useState } from "react"
import {db,rdb} from '../firebasee'
import {useSession} from 'next-auth/client'
import Like from "./Like"
// import {useRouter} from "next/router"

function Post({id,name,message,email,postImage,image,timestamp,Type}) {
  const [session] = useSession();
  const textAreaRef = useRef(null);
  // console.log(likes)
  function shares(e){
   console.log(id)
   if(document.getElementById(`share${id}`)){
    document.getElementById(`share${id}`).innerHTML = "Copied"
    
      textAreaRef.current.select();
      document.execCommand('copy');
      // This is just personal preference.
      // I prefer to not show the the whole text area selected.
      e.target.focus();
      setCopySuccess('Copied!');
  
    setTimeout(()=>{
    document.getElementById(`share${id}`).innerHTML = "Share"
    

    },600)
  }
  }

    
    return (
     
        <div className="flex flex-col w-full unselectable">
          <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-md"> 
          <a href={`/${email.split('@')[0]}`}>
              <div className="flex items-center space-x-2 cursor-pointer">

                  <Image src={image} className="rounded-full" width={40} height ={40} alt = ""/>
                  <div>
                    
                      <p className="font-medium">{name}</p>
                      { timestamp?(
                      <p className="text-xs text-gray-500 ">{new Date(timestamp?.toDate()).toLocaleString()}</p>):(
                      <p className="text-xs text-gray-500 ">Loading...</p>

                      )

                        }
                  </div>
              </div>
              </a>
              <p className="pt-4 font-normal">{message}</p>
          </div>
          {postImage&&
          
          !Type && 
               <div className="relative  bg-white justify-center max-h-96">
               <img
                 src={postImage}
                 className="object-contain max-h-96 w-full"

                 
                 />
           </div>
       }
       {postImage&&
       
       <div className="relative  bg-white justify-center">
         {Type && 
         <video
           src={postImage}
           controls
           className="object-contain self-center max-h-96 w-full"
           objectfit="cover"
           loading="lazy"
           placeholder="blurURLData"
           />
         }
         </div>
         }
          <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
               {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
                <Like id={id} />
               {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
             
                <a  className="inputIcon rounded-none unselectable rounded-br-2xl" href={`whatsapp://send?text=https://is-clone3.vercel.app/post/${id}`} data-action="share/whatsapp/share" >
                  
                <ShareIcon className="h-4"/>
                <p className="text-xs sm:text-base"  id={`share${id}`}>Share</p>
                </a>

          </div>
        </div>
    )
    
}

export default Post
