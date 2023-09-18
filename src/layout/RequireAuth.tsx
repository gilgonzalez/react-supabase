import { Navigate } from "react-router-dom";


export default function RequireAuth({ children, isAllowed, redirectTo }: { children: JSX.Element, isAllowed: boolean, redirectTo: string }) {

  console.log(isAllowed)
  console.log(redirectTo)
  if (!isAllowed) return <Navigate to={redirectTo} replace />

  return  children;
}