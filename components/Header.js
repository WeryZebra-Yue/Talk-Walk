import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/client";
import { rdb } from "../firebasee";
import { useState } from "react";
import Name from "./Name";

function Header() {
  const [session] = useSession();
  const [data, setData] = useState(null);
  const handleSearchQueryChange = (s) => {
    if (s == "") {
      setData(null);
    }
    if (!s) {
      setData(null);
    }

    rdb
      .ref("users")
      .orderByChild("cas")
      .startAt(s)
      .endAt(s + "\u88ff")
      .once("value", (snapshot) => {
        let data1 = snapshot.val();
        let array = [];
        if (!s && s == "") {
          setData(null);
          array = [];

          return;
        }
        if (!snapshot.val()) {
          setData(null);
          array = [];
          return;
        }

        for (const [key, value] of Object.entries(data1)) {
          array.push([value, key]);
        }
        setData(array);
      });
  };

  return (
    <div className="sticky  top-0 z-50">
      <div className="flex items-center sticky cursor-pointer top-0 bg-white p-2 lg:-px-5 shadow-md z-50">
        <div onClick={() => location.replace("/")}>
          <svg
            className="h-10 md:h-14 mt-1"
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

        <div className="relative flex-col">
          <div className="flex ml-2 flex-grow items-center rounded-lg bg-gray-100 p-3 gap-3">
            <SearchIcon className="h-6 text-gray-600" />
            <input
              className="flex text-xs  items-center bg-transparent outline-none text-gray-600 flex-grow sm:text-base"
              type="text"
              placeholder="Search On Talk-Walk"
              onChange={(e) =>
                handleSearchQueryChange(e.target.value.toLowerCase())
              }
            />
          </div>
        </div>

        {/* Center  part*/}
        <div className="flex justify-center  flex-grow">
          <div className="flex space-x-3 md:space-x-4"></div>
        </div>
        {/* Right part*/}
        <a href={`/${session.user.email.split("@")[0]}`}>
          <div className="flex items-center sm:space-x-2 justify-end cursor-pointer">
            <Image
              src={session.user.image}
              width={40}
              height={40}
              layout="fixed"
              className="cursor-pointer rounded-full"
            />
            <p className="whitespace-nowrap font-semibold pr-3 hidden sm:flex">
              {session.user.name}
            </p>
          </div>
        </a>
        <div className="flex items-center sm:space-x-2 justify-end"></div>
      </div>
      <div className="flex flex-col  rounded-md bg-white shadow-md transition-shadow duration-75">
        {data &&
          data.map((d, index) => {
            return (
              <Name
                email={d[1]}
                key={index}
                image={d[0].image}
                Name={d[0].name}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Header;
