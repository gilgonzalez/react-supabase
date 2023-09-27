
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
          return `${isActive ? 'text-white' : ''} flex flex-row gap-2 transition-all `
            
        }}
      >
        <span className={`flex flex-row gap-2 `}>{icon}</span>
        <p className={`${isOpen ? '' : 'scale-0 -translate-x-20 w-0'} font-bold text-sm transition-transform duration-1000`}>{title}</p>
      </NavLink>
    </NavigationMenuItem>
  );
};

export default NavBarItem;