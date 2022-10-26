import { ThumbUpIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { rdb } from "../firebasee";

function Like({ id }) {
  const [session] = useSession();
  const [likes, setLikes] = useState(true);

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

          if (likes && document.getElementById(`like${id}`)) {
            for (const [key, value] of Object.entries(snap.val())) {
              if (value.email == session.user.email) {
                // console.log(id)
                document.getElementById(`like${id}`).classList.add("likees");
                setLikes(false);
                break;
              }
              setLikes(false);
            }
          }
        }
      } else if (document.getElementById(`Number${id}`)) {
        pre = null;
        document.getElementById(`Number${id}`).innerHTML = "";
        document.getElementById(`like${id}`).classList.remove("likees");
      }
    });

  const like = () => {
    Container = document.getElementById(`like${id}`);
    Container.classList.toggle("likees");
    if (Container.classList.contains("likees")) {
      //   console.log("S1s")
      rdb.ref("Likes").child(id).push({
        email: session.user.email,
      });
    } else {
      rdb
        .ref("Likes")
        .child(id)
        .once("value", (snapshot) => {
          for (const [key, value] of Object.entries(snapshot.val())) {
            // console.log(key,value)
            if (value.email == session.user.email) {
              rdb.ref("Likes").child(id).child(key).remove();
              break;
            }
          }
        });
    }
  };

  return (
    <div
      className="inputIcon rounded-none  rounded-bl-2xl"
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
