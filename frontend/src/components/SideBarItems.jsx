import { SidebarItem } from "./SideBar";
import { LayoutDashboard, BookTypeIcon, ClipboardCheckIcon } from "lucide-react";

function SideBarItems() {
    return (
        <>
            <SidebarItem icon={<LayoutDashboard color="#fff" size={25} />} text="Dashboard"  />
            <SidebarItem icon={<BookTypeIcon  color="#fff" size={25} />} text="Fichamentos" />
            <SidebarItem icon={<ClipboardCheckIcon  color="#fff" size={25} />} text="Quiz" />
        </>
    );
}
export default SideBarItems;