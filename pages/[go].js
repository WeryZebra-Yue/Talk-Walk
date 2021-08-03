// import { QrcodeIcon } from "@heroicons/react/solid";
// import { route } from "next/dist/next-server/server/router";
import {useRouter} from "next/router"
import { useEffect, useState } from "react";
import { db  , rdb} from "../firebasee";
import Image from "next/image"
import {getSession,signIn,useSession} from "next-auth/client"
import Login from "./Login"
import Prpost from "../components/Prpost"
import HeaderProfile from "../components/HeaderProfile";
function Go({sessions}) {
  const [route,setroute] = useState(null)
  const [username,setname] = useState(null);
  const [userimage,setimage] = useState(null);
  const [flag,setflag] = useState(false);
  const router = useRouter();
  
  
  useEffect(() => {
      if (router.asPath !== router.route) {
           setroute(router.query.go)
          rdb.ref("users").child(router.query.go).once("value",snapshot=>{
              if(snapshot.val()){
                setname(snapshot.val().name)
                setimage(snapshot.val().image)
               }
               else{
                 setflag(true)
               }
          }
         
          )
         
      }
    }, [router])
     
      if(!sessions) return (
      
        <div className="flex flex-col justify-center min-h-screen bg-gray-200 items-center unselectable ">
            
        <Image
        src = "https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo2png.png?alt=media&token=8c95298b-3add-48b3-a9a9-44fdaa2cc6b3"
        height = {200}
        width = {200}
        draggable="false"
        objectFit = "contain"
        />
        <h1 onClick={signIn} className="p-5 cursor-pointer m-7 bg-blue-800 text-white rounded-xl text-center font-semibold text-lg"> Log In with Google</h1>
    
    </div>  );
         

          
     if(!flag){ 
     return (
       
      <div className="h-full min-h-screen w-full bg-gray-200">
        <HeaderProfile userName = {username} userImage = {userimage} email = {route} sessionemail = {sessions.user.email.split('@')[0]} />
      <div className="mx-auto  max-w-md md:max-w-lg lg:max-w-2xl">
             {/* <Profile/> */}
             {/* <Header/> */}
             {/* <HeaderProfile/> */}
             <div className="flex flex-grow">
             {
               route &&
               <Prpost user = {route} flag = {false}/>
             }
             </div> 
                
            
          </div>
          </div>
     )
    }else{
      return(
         <div className="h-full min-h-screen w-full bg-gray-200">
        <HeaderProfile userName = {username} userImage = {userimage} />
      <div className="mx-auto  max-w-md md:max-w-lg lg:max-w-2xl">
             {/* <Profile/> */}
             {/* <Header/> */}
             {/* <HeaderProfile/> */}
             <div className="flex flex-grow">
             {
               route &&
               <Prpost user = {route} flag = {true}/>
             }
             </div> 
                
            
          </div>
          </div>  
      )
    }
    
}

export async function getServerSideProps(context){
    const sessions = await getSession(context);
    return{
        props:{
          sessions,
         
        }
      }
}
export default Go