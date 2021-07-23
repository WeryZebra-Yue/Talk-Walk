import { useSession } from "next-auth/client"
import Image from "next/image";

function HeaderProfile({userName,userImage}) {
    // const [session] = useSession();
    
    return (
        <div className="bg-white flex shadow-md">
            <div className="flex items-center h-12  m-2  md:h-18 md:m-5">
               { userImage && 
               
               <Image
                src={userImage}
                width={80}
                height={80}
                className="rounded-full h-12 border-2 border-blue-500 shadow-md md:h-18 "
                layout="fixed"/>
               
               }
                <p className=" ml-5 text-lg  md:text-xl">{userName}</p>
            </div>
        </div>
    )
}

export default HeaderProfile