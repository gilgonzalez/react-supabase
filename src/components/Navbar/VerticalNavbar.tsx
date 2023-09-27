import {  LayoutDashboard, ListChecks, Menu, Presentation, TrafficCone, Users2, X} from "lucide-react";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import NavBarItem from "./NavBarItem";
import { useNavbarStore } from "@/store/navbar";


const VerticalNavbar = () => {
  //const [isOpen, setIsOpen] = useState(false);
  const {isOpen, toggle} = useNavbarStore(state => state )
  
  const teamId = "1";
  const basePath = `teams/${teamId}`;
  const isAdmin = true;

  const items = [
    isAdmin && {
      title: "Dashboard",
      path: `${basePath}/dashboard`,
      icon: <LayoutDashboard />
    },
    {
      title: "Jugadores",
      path: `${basePath}/players`,
      icon: <Users2 />
    },
    {
      title: "Convocatorias",
      path: `${basePath}/callslist`,
      icon: <ListChecks />
    },
    {
      title: "Sesiones",
      path: `${basePath}/sesions`,
      icon: <TrafficCone />
    },
    {
      title: "Pizarra",
      path: `${basePath}/board`,
      icon: <Presentation />
    },
  ].filter(Boolean);

  return (
    <nav className={`flex flex-col ${isOpen ? 'w-36' : 'w-12'} transition-all duration-1000 h-full text-black dark:bg-gray-900 bg-[#30c53069]`}>
      <div className="absolute flex flex-col gap-5 p-3 ">
        <div className="flex flex-row">
          <Menu
            className={`w-6 h-6 cursor-pointer ${isOpen ? "text-transparent " : "text-gray-900 "} transition-all duration-1000`}
            onClick={() => { if(!isOpen) toggle() }}
          />
          <X
          className={`w-6 h-6 cursor-pointer translate-x-20 ${isOpen ? "text-white " : "text-transparent scale-0"} transition-all duration-500`}
            onClick={() => { if(isOpen) toggle() }}
        />
        </div>
        <NavigationMenu>
        <NavigationMenuList className="gap-2 flex-col w-max">
          {items.map(
            (item) =>
              item && (
                <NavBarItem
                  icon={item.icon}
                  isOpen={isOpen}
                  title={item.title}
                  path={item.path}
                  key={item.path}
                />
              )
          )}
        </NavigationMenuList>
      </NavigationMenu>
      </div>

    </nav>
  );
};

export default VerticalNavbar;