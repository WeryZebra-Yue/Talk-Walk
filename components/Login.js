import Image from 'next/image'
import {signin} from 'next-auth/client'


function Login() {
   

    return (
        <div className="grid place-items-center ">
            
            <Image
            src = "https://links.papareact.com/t4i"
            height = {400}
            width = {400}
            objectFit = "contain"
            />
            <h1 onClick={signin} className="p-5 cursor-pointer bg-blue-600 text-white rounded-full text-center font-semibold text-lg"> Log In with Google</h1>

        </div>
    )
}

export default Login
