import Head from 'next/head'
import {CameraIcon, VideoCameraIcon} from "@heroicons/react/solid"
import Image from 'next/image'
import { useRef, useState } from 'react';
import { db, stoeage } from '../../firebasee';
import firebase from 'firebase';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/client';
function Adder() {
    const [session] = useSession();
    // const inputref = useRef(null);
    const filepicker = useRef(null);
    const Router = useRouter();
    const [imagetopost,setImage] = useState("https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c");
    const [type,setType] = useState(null);
    const [texts,setTexts] = useState(null);
    
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
        

        // if(!imagetopost){
            //      setImage()
            // }
        // if(type=="video/mp4"){
            //     if(document.getElementById("postimagereview")){
                //         document.getElementById("postimagereview").src = "https://cdn.dribbble.com/users/45617/screenshots/5021228/frame_3_4x.png";
        //     }
        // }
        // console.log(imagetopost)
        
        // console.log(!imagetopost , imagetopost!="https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c")
        if(imagetopost && imagetopost!="https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c"){
            Router.push('/')
     db.collection('stories').add({
        // message : inputref.current.value,
        name : session.user.name,
        email :session.user.email.split('@')[0],
        id : makeid(10),
        image : session.user.image,
        timestap : firebase.firestore.FieldValue.serverTimestamp()

    }).then(doc=>{
      
            const uploadTask = stoeage.ref(`stories/${doc.id}`).putString(imagetopost,'data_url')
            //  removeImage()
                // if()
             uploadTask.on('state_change',null,error => console.error(error),()=>{
                 stoeage.ref(`stories`).child(doc.id).getDownloadURL().then(url=>{
                    //  console.log(url)
                     db.collection('stories').doc(doc.id).set({
                         postImage:url,
                        
                         
                     },
                     {merge:true}
                     )
                 })
             })   

            
        
     

    }).then(()=>{
       

    });
    // inputref.current.value = ""
    
}
else{
    setTexts("Choose Image !")
}
}
const addImageToPost = (e) =>{
  
    const reader = new FileReader();
    
    if(e.target.files[0]){
        setTexts(null)
       
        reader.readAsDataURL(e.target.files[0]);
    }
  
    reader.onload = (readerEvent)=>{
        
       
            setImage(readerEvent.target.result);
       
    } 
    // e.target.files[0].remove()
     document.getElementById('files').value = "";

}
const removeImage = () =>{
    document.getElementById('files').value = "";
    setImage("https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c");
}


    return (

        <div className="bg-gray-200 min-h-screen  flex items-center justify-center">
        <Head>
        <title>Add Story</title>    
        </Head>   
       
        <div className="bg-white p-2 rounded-2xl shadow-md 
        text-gray-600 font-medium mt-6 m-3 w-full  md:w-6/12 pt-8 pr-4 pl-4 ">
            {/* tophalf */}
            {imagetopost&&
               <div className="relative  bg-white justify-center h-96   rounded-md">
               <Image 
                 src={imagetopost}
                 className="object-contain"
                
                 placeholder="blurURLData"
                 //  height = {596}
                  objectfit = "contain"
                 //  width = {596}
                 layout ="fill"
                 />
                
           </div>
       }
        {imagetopost!="https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c" &&
                                         <p  onClick = {removeImage} className="text-xs text-red-500 text-center cursor-pointer">Remove</p>
                                        }
            <div className="flex space-x-4 p-4 items-center">
                            {/* <Image src={session.user.image}  className="rounded-full w-10 sm:w-12" width={40} height ={40} alt = ""/> */}

             
               
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
            <div onClick={()=>filepicker.current.click()} className="inputIcon ">
             <CameraIcon 
             className="h-7 text-green-500 "/>
             <p className="text-xs sm:text-sm xl:text-base">Photo/GIF</p>   
             <input onChange={addImageToPost} id="files" type="file" accept=".gif,.jpg ,.jpeg,.png" hidden ref={filepicker}/>   
            
             </div>
           
            {/* <div className="inputIcon">
             <EmojiHappyIcon 
             className="h-7 text-yellow-500 "/>
             <p className="text-xs sm:text-sm xl:text-base">Feeling Activity</p>      
             </div> */}

         </div>
         <form className="flex flex-1  items-center justify-center ">
                {/* <input 
                className="rounded-full h-10  bg-gray-200 flex-grow px-3 focus:outline-none text-xs sm:text-base" placeholder="  Add text to your Story..."
                type="text"  ref={inputref}/> */}
                <button  type="submit" className="bg-gray-100 pr-7 pl-7 pt-2 pb-2 rounded-md hover:bg-gray-300" onClick={sendPost}>Add Story</button>
                </form>
         <div className="flex items-center justify-center"> 
         {texts}
             </div>
        </div>
        </div>
    )
}

export default Adder
