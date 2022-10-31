import Image from "next/image";

function StoryCard({ name, profile, src }) {
  return (
    <div className="relative  h-32 w-20 lg:h-56 lg:w-32 rounded-xl bg-gray-300 cursor-pointer overflow-x  transition duration-200 transform ease-in hover:scale-105 group">
      {src && (
        <div className="relative h-32 w-20 lg:h-56 lg:w-32  unselectable flex flex-col items-center justify-center">
          <Image
            className="opacity-0 absolute lg:opacity-100 rounded-full z-50 transition-opacity group-hover:opacity-0"
            width={40}
            height={40}
            src={profile}
            layout="fixed"
            objectFit="cover"
            draggable="false"
          />
          <p className="transition-all absolute bottom-0 text-center rounded-b-xl border-t-2 pb-1 border-gray-400 w-full opacity-0 group-hover:opacity-100 z-50 bg-white text-gray-800 font-bold text-[10px] lg:text-base ">
            {name}
          </p>

          <Image
            className="object-cover filter rounded-xl brightness-50 z-0 transition-all duration-100 group-hover:brightness-100"
            src={src}
            layout="fill"
            draggable="false"
          />
        </div>
      )}
    </div>
  );
}

export default StoryCard;
