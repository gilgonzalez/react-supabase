import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

// import { useTranslation } from "react-i18next";
// import { Locales } from "@/i18n";
import NavBarItem from "./NavBarItem";


export default function NavBar() {
  // const { t, i18n } = useTranslation("global")

  const teamId = "1";
  const basePath = `teams/${teamId}`;
  const isAdmin = true;

  // const changeLanguage = (lng: Locales) => {
  //   i18n.changeLanguage(lng);
  // }

  const items = [
    isAdmin && {
      title: "Dashboard",
      path: `${basePath}/dashboard`,
    },
    {
      title: "Jugadores",
      path: `${basePath}/players`,
    },
    {
      title: "Convocatorias",
      path: `${basePath}/convocatorias`,
    },
  ].filter(Boolean);

  return (
    <nav className="flex p-2 h-full place-items-start bg-green-300">
      <NavigationMenu>
        <NavigationMenuList className="gap-2 flex-col w-max">
          {items.map(
            (item) =>
              item && (
                <NavBarItem
                  title={item.title}
                  path={item.path}
                  key={item.path}
                />
              )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}