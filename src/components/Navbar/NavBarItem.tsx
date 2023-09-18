
import { NavigationMenuItem } from "../ui/navigation-menu";
import { NavLink } from "react-router-dom";
import { useEffect} from "react";
interface Props {
  title: string;
  path: string;
}

const NavBarItem = ({ title, path }: Props) => {
  useEffect(() => {});
  return (
    <NavigationMenuItem className="flex w-full">
      <NavLink
        to={path}
        className={({ isActive }) => {
          return (
            (isActive
              ? "bg-green-600 translate-x-5 text-white"
              : " bg-green-400 hover:bg-gray-400") +
            " border-2 border-green-600 font-semibold p-1.5 rounded-md bg w-36 text-center text-white hover:translate-x-5 hover:bg-green-600 transition-transform"
          );
        }}
      >
        {title}
      </NavLink>
    </NavigationMenuItem>
  );
};

export default NavBarItem;