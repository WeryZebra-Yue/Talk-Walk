import StoryCard from "./StoryCard";
import AddStories from "./AddStories";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebasee";

function Stories() {
  const [realtimePosts] = useCollection(
    db.collection("stories").orderBy("timestap", "desc")
  );

  return (
    <div className="flex space-x-3 mx-auto z-0 overflow-x-scroll pt-4 pb-4 pr-2 pl-2 ">
      <AddStories />
      {realtimePosts?.docs.map((post, index) => {
        return (
          <StoryCard
            key={index}
            profile={post.data().image}
            src={post.data().postImage}
            name={post.data().name}
          />
        );
      })}
    </div>
  );
}

export default Stories;
