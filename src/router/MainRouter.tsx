import RootLayout from '@/layout/RootLayout'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from "@/supabase/client";
import { User as ZustandUser} from '@/store/auth'

import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import RequireAuth from '@/layout/RequireAuth';
import AdminLayout from '@/layout/AdminLayout';
import Dashboard from '@/pages/Dashboard';
import Players from '@/pages/Players';
import Player from '@/pages/Player';
import Login from '@/pages/Login';
import Convocatoria from '@/pages/Convocatoria';
import Convocatorias from '@/pages/Convocatorias';
import NotFound from '@/pages/NotFound';
import { useAuthStore } from '@/store/auth';

const MainRouter = () => {

  const { user, setUser} = useAuthStore(state => state)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          setLoading(true);
          const user_id = session.user.id;
          const user : ZustandUser = {
            status: "authenticated",
            id: user_id,
            email: session.user.email ?? null,
            name: ''
          }
          user_id && setUser(user);
          console.log(user)
        } else {
          setUser(null);
          console.log({user})
        }

        setLoading(false);
      }
    );

    return () => subscription.data.subscription.unsubscribe();
  }, []);

  const isAdmin = true;
  const isAllowed = isAdmin;
  const idTeam = 1

  
  const redirectTo = !user
  ? "/login"
  : isAdmin
  ? `teams/${idTeam}/dashboard`
      : `teams/${idTeam}/dashboard`;
  
  if (loading) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />} >
        <Route index path="/" element={<Navigate to={redirectTo} />} />
          <Route
            path="teams"
            element={
              <RequireAuth isAllowed={!!isAllowed} redirectTo={redirectTo}>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route path=":id/dashboard" element={<Dashboard />} />
            <Route path=":id/players" element={<Players />} />
            <Route path=":id/players/:playerId" element={<Player />} />
            <Route path=":id/players/create" element={<Player />} />
            <Route path=":id/callslist" element={<Convocatorias />} />
            <Route path=":id/callslist/:idCall" element={<Convocatoria />} />
            <Route path=":id/callslist/create" element={<Convocatoria />} />
            <Route path=":id/sesions" element={<Convocatorias />} />
            <Route path=":id/sesions/:sesionId" element={<Convocatoria />} />
            <Route path=":id/sesions/create" element={<Convocatoria />} />
            <Route path=":id/board" element={<Convocatoria />} />
          </Route>
        </Route>
        <Route path='login' element={<Login />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter