import Stories from "./Stories"
import InputBox from "./InputBox"
import Posts from "./Posts"

function Feed() {
    return (
        <div className="flex-grow pb-44 pt-6 overflow-y-auto">
            <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
            {/* Stories */}
            <Stories/>
            {/* InputBox */}
            <InputBox />
            {/* Posts */}
            <Posts />
            </div>
          
        </div>
    )
}

export default Feed
