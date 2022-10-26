import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
function HeaderProfile({ userName, userImage, email, sessionemail }) {
  const [session] = useSession();

  return (
    <div className="bg-white flex shadow-md">
      <div className="flex items-center h-12  m-2  md:h-18 md:m-5 w-full justify-between">
        <div
          className="flex items-center"
          onClick={() => location.replace("/")}
        >
          <svg
            className="h-12 md:h-16 mt-1"
            preserveAspectRatio="xMidYMid meet"
            viewBox="695 273 158 159"
          >
            <g
              data-item-type="text"
              data-item="Business"
              id="logo__item--business"
            >
              <g transform="translate(698.515625 429.67821982214735) scale(1 1) rotate(0 0 0)"></g>
            </g>
            <g
              data-item-type="text"
              id="logo__item--tagline_1"
              data-item="Tagline"
            >
              <g transform="translate(772.4296875 429.67821982214735) scale(1.5408859720062595 1.5408859720062595) rotate(0 0 0)"></g>
            </g>
            <g
              data-item-type="image"
              data-item="Image"
              data-logo-item=""
              id="logo__item--logo_0"
            >
              <g transform="translate(706.4577804427239 267) scale(1.3749956617889585 1.3749956617889585) rotate(0 0 0)">
                <g>
                  <path
                    fill="#2B388F"
                    d="M35.825,22.255c0,0-61.65,53.146,16.298,48.185V55.558C52.123,55.558,0.397,65.479,35.825,22.255z"
                    data-part-id="logo__item--logo_0__0"
                  ></path>
                  <path
                    fill="#26A9E0"
                    d="M59.509,79.402c0,0,61.651-53.146-16.298-48.186v14.882C43.21,46.099,94.94,36.178,59.509,79.402z"
                    data-part-id="logo__item--logo_0__1"
                  ></path>
                  <path
                    fill="#26A9E0"
                    d="M68.029,14.907c0,4.433-3.592,8.017-8.02,8.017c-4.425,0-8.017-3.584-8.017-8.017   c0-4.428,3.592-8.016,8.017-8.016C64.438,6.892,68.029,10.479,68.029,14.907z"
                    data-part-id="logo__item--logo_0__2"
                  ></path>
                  <circle
                    fill="#2B388F"
                    cx="35.035"
                    cy="86.144"
                    r="8.02"
                    data-part-id="logo__item--logo_0__3"
                  ></circle>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className="flex  justify-center items-center self-center justify-self-center">
          {userImage && (
            <div className="relative h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 ">
              <Image
                src={userImage}
                objectFit="fill"
                className=" rounded-full  border-2 border-blue-500 md:flex"
                layout="fill"
              />
            </div>
          )}
          <p className=" ml-3 md:ml-5 text-sm md:text-xl">{userName}</p>
        </div>
        {email && session && email === sessionemail ? (
          <div
            className="p-2 bg-blue-700 text-white rounded-md cursor-pointer text-xs md:p-2 md:tex"
            onClick={signOut}
          >
            Log Out
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HeaderProfile;
