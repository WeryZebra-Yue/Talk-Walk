import Head from "next/head";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRef, useState } from "react";
import { db, stoeage } from "../../firebasee";
import firebase from "firebase";
import { useRouter } from "next/router";

import { useSession } from "next-auth/client";
import LogoHeader from "../../components/LogoHeader";
function Adder() {
  const [session] = useSession();
  // const inputref = useRef(null);
  const filepicker = useRef(null);
  const Router = useRouter();
  const [imagetopost, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c"
  );
  const [type, setType] = useState(null);
  const [texts, setTexts] = useState(null);

  const sendPost = (e) => {
    e.preventDefault();
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
 
    if (
      imagetopost &&
      imagetopost !=
        "https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c"
    ) {
      Router.push("/");

      // console.log()

      db.collection("stories")
        .add({
        
          name: session.user.name,
          email: session.user.email.split("@")[0],
          id: makeid(10),
          image: session.user.image,
          timestap: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((doc) => {
          const uploadTask = stoeage
            .ref(`stories/${doc.id}`)
            .putString(imagetopost, "data_url");
         
          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            () => {
              stoeage
                .ref(`stories`)
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  //  console.log(url)
                  db.collection("stories").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        })
        .then(() => {});
     
    } else {
      setTexts("Choose Image !");
    }
  };
  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      setTexts(null);

      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
   
    document.getElementById("files").value = "";
  };
  const removeImage = () => {
    document.getElementById("files").value = "";
    setImage(
      "https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c"
    );
  };

  return (
    <div className="bg-gray-200 min-h-screen w-full  flex   flex-col">
      <Head>
        <title>Add Story</title>
      </Head>
      <LogoHeader />
      <div
        className="bg-white p-2 rounded-2xl shadow-md justify-self-center  self-center
        text-gray-600 font-medium mt-6 m-3 w-full  md:w-6/12 pt-8 pr-4 pl-4 "
      >
       
        {imagetopost && (
          <div className="relative  bg-white justify-center h-96   rounded-md">
            <Image
              src={imagetopost}
              className="object-contain"
              placeholder="blurURLData"
             
              objectfit="contain"
              
              layout="fill"
            />
          </div>
        )}
        {imagetopost !=
          "https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c" && (
          <p
            onClick={removeImage}
            className="text-xs text-red-500 text-center cursor-pointer"
          >
            Remove
          </p>
        )}
        <div className="flex space-x-4 p-4 items-center">
         
        </div>
        <div className="flex justify-evenly p-3 border-1 ">
        
          <div
            onClick={() => filepicker.current.click()}
            className="inputIcon "
          >
            <CameraIcon className="h-7 text-green-500 " />
            <p className="text-xs sm:text-sm xl:text-base">Photo/GIF</p>
            <input
              onChange={addImageToPost}
              id="files"
              type="file"
              accept=".gif,.jpg ,.jpeg,.png"
              hidden
              ref={filepicker}
            />
          </div>

         
        </div>
        <form className="flex flex-1  items-center justify-center ">
          
          <button
            type="submit"
            className="bg-gray-100 pr-7 pl-7 pt-2 pb-2 rounded-md hover:bg-gray-300"
            onClick={sendPost}
          >
            Add Story
          </button>
        </form>
        <div className="flex items-center justify-center">{texts}</div>
      </div>
    </div>
  );
}

export default Adder;
