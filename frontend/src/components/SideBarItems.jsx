import { SidebarItem } from "./SideBar";
import { LayoutDashboard, BookTypeIcon, ClipboardCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";


function SideBarItems() {
    return (
        <>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <SidebarItem icon={<LayoutDashboard color="#1f2937" size={25} />} text="Dashboard"  />
            </Link>
            <Link to="/fichamentos" style={{ textDecoration: 'none' }}>
                <SidebarItem icon={<BookTypeIcon  color="#1f2937" size={25} />} text="Fichamentos" />
            </Link>
            <Link to="/quiz" style={{ textDecoration: 'none' }}>
                <SidebarItem icon={<ClipboardCheckIcon  color="#1f2937" size={25} />} text="Quiz" />
            </Link>
        </>
    );
}
export default SideBarItems;