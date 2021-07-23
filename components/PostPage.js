import Image from "next/image"
import{
    ShareIcon
} from "@heroicons/react/solid"
import Link from "next/link"
import { useState } from "react"
import {db,rdb} from '../firebasee'
import {useSession} from 'next-auth/client'
import Like from "./Like"
// import {useRouter} from "next/router"

function Post({id,name,message,email,postImage,image,timestamp,Type}) {
  const [session] = useSession();
  // console.log(likes)


    
    return (
     
        <div className="flex flex-col w-full unselectable max-h-screen">
          <div className="p-5 bg-white  rounded-t-2xl shadow-md"> 
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
          (
              <div className="relative h-96 bg-white  justify-center">
                {
                  !Type && 
                  <Image
                    src={postImage}
                    className="object-contain "
                    objectFit = "contain"
                    layout="fill"
                    />
                }
                {
                  Type && 
                  <video
                    src={postImage}
                    controls
                    className="object-contain"
                    
                    loading="lazy"
                    placeholder="blurURLData"
                    />
                }
                   
              
                   
              </div>
          )}
          <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
               {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
                <Like id={id} />
               {/* ,,,,,,,,,,,,,,,,,,,,,,,,,,,, */}
             
                  <div className="inputIcon rounded-none unselectable rounded-br-2xl">
                <ShareIcon className="h-4"/>
                <p className="text-xs sm:text-base">Share</p>
                  
                  </div>

          </div>
        </div>
    )
    
}

export default Post
