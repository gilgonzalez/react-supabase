
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
    <NavigationMenuItem className="flex w-full ">
      <NavLink
        to={path}
        className={({ isActive }) => {
          return (
            (isActive
              ? "bg-green-600 translate-x-5 text-slate-300"
              : " bg-green-400 hover:bg-gray-400") +
            " p-1.5 rounded-md bg w-36 text-center hover:translate-x-5 hover:bg-green-600 transition-all "
          );
        }}
      >
        {title}
      </NavLink>
    </NavigationMenuItem>
  );
};

export default NavBarItem;