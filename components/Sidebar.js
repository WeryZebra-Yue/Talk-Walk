import { useSession } from "next-auth/client";
import {
  ChevronDownIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import SideBarRow from "./SideBarRow";

function Sidebar() {
  const [session] = useSession();
  return (
    <div className="pd-2 max-w-[600px] xl:min-w-[300px] mt-5 fixed">
      <SideBarRow
        src={session.user.image}
        title={session.user.name}
      ></SideBarRow>
      <SideBarRow Icon={UsersIcon} title="Friends" />
      <SideBarRow Icon={UserGroupIcon} title="Groups" />
      <SideBarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SideBarRow Icon={DesktopComputerIcon} title="Watch" />
      <SideBarRow Icon={CalendarIcon} title="Events" />
      <SideBarRow Icon={ClockIcon} title="Memories" />
      <SideBarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
}

export default Sidebar;
