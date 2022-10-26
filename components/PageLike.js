import { ThumbUpIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { rdb } from "../firebasee";

function Like({ id }) {
  function like() {}

  let Container;
  let pre,
    rig = null;

  rdb
    .ref("Likes")
    .child(id)
    .on("value", (snap) => {
      let s = "";

      // console.log(1)
      if (snap.val()) {
        rig = Object.entries(snap.val()).length;
        if (rig != pre) {
          if (document.getElementById(`Number${id}`)) {
            pre = rig;

            document.getElementById(`Number${id}`).innerHTML = rig;
          }
        }
      } else if (document.getElementById(`Number${id}`)) {
        pre = null;
        document.getElementById(`Number${id}`).innerHTML = "";
        document.getElementById(`like${id}`).classList.remove("likees");
      }
    });

  return (
    <div
      className="inputIcon rounded-none "
      id={`like${id}`}
      onClick={like}
      onDoubleClick={null}
    >
      <ThumbUpIcon className="h-4 unselectable " />
      <p className="text-xs  unselectable sm:text-base" id={`Number${id}`}></p>
      <p className="text-xs unselectable sm:text-base ">Like</p>
    </div>
  );
}

export default Like;
