import Image from "next/image"

function SideBarRow({src,Icon,title}) {
    return (
        <div className = "flex items-center py-2 ml-2 cursor-pointer hover:bg-gray-200 rounded-[10px]">
             {src&&(
                 <Image 
                 className ="rounded-full"
                 src = {src}
                 width = {30}
                 height = {30}
             />   )}
             {Icon && 
                 <Icon className="h-7 w-7 text-blue-500  "/>}
                 <p className="ml-2 hidden sm:inline-flex font-medium text-gray-900 ">{title}</p>
        </div>
    )
}

export default SideBarRow
