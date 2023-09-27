
import { NavigationMenuItem } from "../ui/navigation-menu";
import { NavLink } from "react-router-dom";
import { useEffect} from "react";
interface Props {
  title: string;
  path: string;
  isOpen: boolean;
  icon: React.ReactNode
}

const NavBarItem = ({ title, path, isOpen, icon }: Props) => {
  useEffect(() => {});
  return (
    <NavigationMenuItem className="flex self-start">
      <NavLink
        to={path}
        className={({ isActive }) => {
          return `${isActive ? 'text-white' : ''} flex flex-row gap-2 transition-all duration-300`
            
        }}
      >
        <span className={`flex flex-row gap-2 `}>{icon}</span>
        <p className={`${isOpen ? '' : '-translate-x-10 text-transparent '} font-bold text-sm transition-all duration-1000`}>{title}</p>
      </NavLink>
    </NavigationMenuItem>
  );
};

export default NavBarItem;