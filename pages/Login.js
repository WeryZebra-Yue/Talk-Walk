import Image from 'next/image'
import {signin} from 'next-auth/client'


function Login() {
   

    return (
        <div className="grid place-items-center ">
            
            <Image
            src = "https://firebasestorage.googleapis.com/v0/b/ssclone.appspot.com/o/Logo%2Flogo.png?alt=media&token=aba6b0a3-c347-4429-aa27-8c22bb9ed83c"
            height = {400}
            width = {400}
            objectFit = "contain"
            />
            <h1 onClick={signin} className="p-5 cursor-pointer bg-blue-600 text-white rounded-full text-center font-semibold text-lg"> Log In with Google</h1>

        </div>
    )
}

export default Login
