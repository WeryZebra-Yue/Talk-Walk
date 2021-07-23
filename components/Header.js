import Image from 'next/image'
import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    HomeIcon,
    UserGroupIcon,
    ViewGridIcon,
} from '@heroicons/react/solid'
import {
    FlagIcon,
    PlayIcon,
    SearchIcon,
    ShoppingCartIcon
}
from '@heroicons/react/outline'
import HeaderIcon from './HeaderIcon'
import { signOut , useSession } from 'next-auth/client'
import { rdb } from '../firebasee'
import { useState } from 'react'
import Name from './Name'
import Link from 'next/link'

function Header() {
    const [session] = useSession();
    const [DATAS,SETDATA] = useState(null);
    const data = (s)=> {
        // console.log(s)
        if(s == ""){
            SETDATA(null)
            
        };
            if(!s){
                SETDATA(null)
                
            }

            
        rdb.ref("users").orderByChild("cas").startAt(s).endAt(s+"\u88ff").once("value",snapshot=>{
            
                  let data1 =  snapshot.val()
                  let array = []
                  if(!s && s==""){
                    SETDATA(null)
                    array = []

                    return;
                    };
                 if(!snapshot.val()){
                    SETDATA(null)
                    array = []
                    return;
                    ;}

                  for (const [key, value] of Object.entries(data1)) {
                      array.push([value,key])
                     
                    }
                    SETDATA(array)
               })
    
        
        

    }

 
    // console.log(session.user.email.split('@')[0])
        return (
            <div className="sticky  top-0 z-50">
        <div className="flex items-center sticky top-0 bg-white p-2 lg:-px-5 shadow-md z-50">
           {/*Left part*/}
           <div>
               <Image src="https://links.papareact.com/5me" width ={40} height={40} layout = "fixed"/>
           </div>
            <div className="relative flex-col">
            <div className="flex ml-2 flex-grow items-center rounded-full  bg-gray-100 p-2 ">
                <SearchIcon className ="h-6 text-gray-600"/>
                <input className = "flex ml-2 text-xs  items-center bg-transparent outline-none text-gray-600 flex-grow sm:text-base"type="text" placeholder ="Search On FaceBook" onChange={(e)=>data(e.target.value.toLowerCase())} />
                
            </div>
            
            </div>
         
        
        
     

               

           {/* Center  part*/}
           <div className="flex justify-center  flex-grow">
               <div className="flex space-x-3 md:space-x-4">
               {/* <HeaderIcon active Icon = {HomeIcon}/> */}
               {/* <HeaderIcon Icon = {FlagIcon}/>
               <HeaderIcon Icon = {PlayIcon}/>
               <HeaderIcon Icon = {ShoppingCartIcon}/>
               <HeaderIcon Icon = {UserGroupIcon}/> */}

               </div>
           </div>
           {/* Right part*/}
           {/* <div></div> */}
           <a href={`/${session.user.email.split('@')[0]}`}>
            <div className="flex items-center sm:space-x-2 justify-end cursor-pointer" >
                <Image
                    // onClick={signOut}
                    src = {session.user.image}
                    width={40}
                    height={40}
                    layout="fixed"
                    className="cursor-pointer rounded-full"
                />
                <p className="whitespace-nowrap font-semibold pr-3 hidden sm:flex">{session.user.name}</p>
               
            </div>
            </a>
            <div className="flex items-center sm:space-x-2 justify-end">
            <ViewGridIcon className="icon"/>
                <ChatIcon className="icon"/>
                <BellIcon className="icon"/>
                <ChevronDownIcon className="icon"/>
                </div>
        </div>
        <div className="flex flex-col  rounded-md bg-white shadow-md transition-shadow duration-75">
              {/* {console.log(DATAS)} */}
              {
                  
                  DATAS &&
                      DATAS.map((d,index)=>{
                       return <Name email  = {d[1]} key ={index} image={d[0].image} Name ={d[0].name}/>  
                      })
                  
              }
        </div>
        </div>
    )
}

export default Header
