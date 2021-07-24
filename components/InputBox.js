import {useSession} from 'next-auth/client'
import Image from 'next/image';
import {EmojiHappyIcon} from "@heroicons/react/outline"
import {CameraIcon, VideoCameraIcon} from "@heroicons/react/solid"
import { db, stoeage } from '../firebasee';
import firebase from 'firebase';
import { useRef, useState } from 'react';
import Link from 'next/link';
function InputBox() { 
    const [session] = useSession();
    
            const inputref = useRef(null);
            const filepicker = useRef(null);
            const [imagetopost,setImage] = useState(null);
            const [type,setType] = useState(null);
            const sendPost = (e) =>{
                e.preventDefault();
                function makeid(length) {
                    var result           = '';
                    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for ( var i = 0; i < length; i++ ) {
                      result += characters.charAt(Math.floor(Math.random() * 
                 charactersLength));
                   }
                   return result;
                }
                if(type=="video/mp4"){
                    if(document.getElementById("postimagereview")){
                        document.getElementById("postimagereview").src = "https://cdn.dribbble.com/users/45617/screenshots/5021228/frame_3_4x.png";
                    }
                }
            if(!inputref.current.value)return;
             
            db.collection('post').add({
                message : inputref.current.value,
                name : session.user.name,
                email :session.user.email.split('@')[0],
                id : makeid(10),
                image : session.user.image,
                timestap : firebase.firestore.FieldValue.serverTimestamp()

            }).then(doc=>{
                if(imagetopost){
                    const uploadTask = stoeage.ref(`post/${doc.id}`).putString(imagetopost,'data_url')
                     removeImage()
                        // if()
                     uploadTask.on('state_change',null,error => console.error(error),()=>{
                         stoeage.ref(`post`).child(doc.id).getDownloadURL().then(url=>{
                            //  console.log(url)
                             db.collection('post').doc(doc.id).set({
                                 postImage:url,
                                 Type : type =='video/mp4'
                                 
                             },
                             {merge:true}
                             )
                         })
                     })   

                     setType(null)
                }
            });
            inputref.current.value = ""
        }
        const addImageToPost = (e) =>{
            let types; 
            const reader = new FileReader();
            if(e.target.files[0]){
                setType(e.target.files[0].type)
                    types = e.target.files[0].type;
                console.log(1)
                reader.readAsDataURL(e.target.files[0]);
            }
          
            reader.onload = (readerEvent)=>{
                if(types == "video/mp4"){
                setImage(readerEvent.target.result);  
                    
                } 
                else{
                    setImage(readerEvent.target.result);
                }
                console.log(types)

            } 
            // e.target.files[0].remove()
             document.getElementById('files').value = "";
        }
        const removeImage = () =>{
            document.getElementById('files').value = "";
            setImage(null);
        }

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md 
        text-gray-600 font-medium mt-6 m-3">
            {/* tophalf */}
            <div className="flex space-x-4 p-4 items-center">
                            <Image src={session.user.image}  className="rounded-full w-10 sm:w-12" width={40} height ={40} alt = ""/>

                <form className="flex flex-1">
                <input 
                className="rounded-full h-10  bg-gray-200 flex-grow px-3 focus:outline-none text-xs sm:text-base"
                type="text" placeholder={` What's on your mind ${session.user.name} ?`} ref={inputref}/>
                <button hidden type="submit" onClick={sendPost}>Submit</button>
                </form>
                {imagetopost && (
                    <div className="flex flex-col hover:brightness-110 transition duration-150 hover:scale-105 cursor-pointer min-h-20 min-w-20">
                        <Image className="object-contain rounded-lg h-16" id="postimagereview" height={45} width={90}  src={imagetopost} alt="" />
                        <p  onClick = {removeImage} className="text-xs text-red-500 text-center">Remove</p>
                    </div>
                )}
               {/* <Link href="/234">
                   <a>heloo</a>
               </Link> */}
            {/* bottomhalf */}
            </div>
         <div className="flex justify-evenly p-3 border-1 "> 
            {/* <div className="inputIcon">
             <VideoCameraIcon 
             className="h-7 text-red-500 "/>
             <p className="text-xs sm:text-sm xl:text-base">Live Video</p>            
            </div> */}
            <div onClick={()=>filepicker.current.click()} className="inputIcon">
             <CameraIcon 
             className="h-7 text-green-500 "/>
             <p className="text-xs sm:text-sm xl:text-base">Photo/Video/GIF</p>   
             <input onChange={addImageToPost} id="files" type="file" hidden ref={filepicker}/>   
             </div>
            {/* <div className="inputIcon">
             <EmojiHappyIcon 
             className="h-7 text-yellow-500 "/>
             <p className="text-xs sm:text-sm xl:text-base">Feeling Activity</p>      
             </div> */}

         </div>
        </div>
    )
}

export default InputBox
