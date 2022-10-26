import Image from "next/image";
import Link from "next/link";

function Name({ Name, image, email }) {
  return (
    <div>
      <a href={`/${email.split("@")[0]}`}>
        <div className="relative  flex items-center p-3 hover:bg-gray-200 cursor-pointer   ">
          <Image
            src={image}
            width={40}
            height={40}
            className="rounded-full p-2"
          />
          <p className="pl-3 font-medium">{Name}</p>
          <hr className="bg-black" />
        </div>
      </a>
    </div>
  );
}

export default Name;
