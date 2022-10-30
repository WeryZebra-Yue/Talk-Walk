import Image from "next/image";
import Link from "next/link";
import Adder from "../pages/stories/Adder";

function AddStories() {
  function clicked() {
    useEffect(() => {
      const adder = document.querySelector(".adder");
      adder.classList.add("active");
    }, []);
  }
  return (
    <div className="flex items-center  hover:scale-105 transition duration-100  rounded-3xl justify-center border-2 border-blue-500 h-32 w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x ">
      <Link href="./stories/Adder">
        <div
          className="h-32 w-20 lg:h-56 lg:w-32 flex items-center justify-center"
          onClick={clicked}
        >
          <svg
            className="h-8 w-8 md:h-12 md:w-12 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 88 80"
            fill="none"
          >
            <rect x="35" width="19" height="80" rx="2" fill="#169BE7" />
            <g filter="url(#filter0_d)">
              <rect
                x="4"
                y="50"
                width="19"
                height="80"
                rx="2"
                transform="rotate(-90 4 50)"
                fill="#084081"
              />
            </g>
            <defs>
              <filter
                id="filter0_d"
                x="0"
                y="31"
                width="88"
                height="27"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundLinkFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </Link>
    </div>
  );
}

export default AddStories;
