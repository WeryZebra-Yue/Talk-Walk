// import { QrcodeIcon } from "@heroicons/react/solid";
// import { route } from "next/dist/next-server/server/router";
import {useRouter} from "next/router"
import { useEffect, useState } from "react";
import { db  , rdb} from "../firebasee";
import Image from "next/image"
import {getSession,useSession} from "next-auth/client"
import Login from "../components/Login"
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
     
      if(!sessions) return <Login/>
         

          
     if(!flag){ 
     return (
       
      <div className="h-full min-h-screen w-full bg-gray-200">
        <HeaderProfile userName = {username} userImage = {userimage} />
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