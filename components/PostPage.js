import Image from "next/image"
import{
    ShareIcon
} from "@heroicons/react/solid"

import { useRef, useState } from "react"
import {db,rdb} from '../firebasee'
import {useSession} from 'next-auth/client'
import Like from "./Like"
import PageLike from "./PageLike"
import Head from 'next/head'
import Link from "next/link"
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
     
        <div className="flex flex-col w-full unselectable ">
       
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
                  <div className="relative  bg-white justify-center h-96">
                  <Image
                    src={postImage}
                    className="object-contain "
                   
                    placeholder="blurURLData"
                    //  height = {596}
                     objectfit = "contain"
                    //  width = {596}
                    layout ="fill"
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
         
          <div className="flex flex-col pb-2 justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
               {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
              <div className="flex w-full">                { session &&

                  <Like id={id} />
                }
                {
                  !session &&
                  <PageLike id={id}/>

                }
               {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
             
                <a  className="inputIcon rounded-none unselectable" href={`whatsapp://send?text=localhost:3000/post/${id}`} data-action="share/whatsapp/share" >
                  
                <ShareIcon className="h-4"/>
                <p className="text-xs sm:text-base"  id={`share${id}`}>Share</p>
               
                </a>
                </div>
                {!session && 
          <p><Link  href="/">Sign in</Link> to Like and See More Post!</p>}


          </div>
         
        </div>
    )
    
}

export default Post
