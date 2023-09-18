import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="flex flex-1 flex-col h-full w-full py-4 px-5">
            <Outlet />
        </div>
    )
}