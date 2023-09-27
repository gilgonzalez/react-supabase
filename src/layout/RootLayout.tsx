import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Outlet } from 'react-router-dom'
import VerticalNavbar from '../components/Navbar/VerticalNavbar';

const RootLayout = () => {
  return (
    <div className="h-full w-screen flex justify-between flex-col dark:bg-slate-700 dark:text-slate-300">
      <div className="flex items-center justify-between w-full pl-8 pr-6 bg-[#007700] pt-2 pb-2">
          <h1
            className="text-2xl"
            style={{ fontFamily: "Poppins", color: "white" }}
          >
            TEAM MANAGER
          </h1>
        {/* <ThemeToggleButton /> */}
        <Avatar>
          <AvatarImage src="https://avatarfiles.alphacoders.com/258/258594.png" />
        </Avatar>
      </div>
      <div className="flex flex-row">

      <div className="min-h-screen w-44">
          {/* <NavBar /> */}
          <VerticalNavbar/>
      </div>
      <main className="w-full h-full px-8 md:px-8">
        <Outlet />
      </main>
      </div>
    </div>
  )
}

export default RootLayout