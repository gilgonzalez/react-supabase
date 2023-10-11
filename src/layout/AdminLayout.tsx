import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const user = useAuthStore(state => state.user)
  if (!user) { 

    return <Navigate to="/login" />
  }

    return (
        <div className="flex flex-1 flex-col h-full w-full py-4">
            <Outlet />
        </div>
    )
}