import RootLayout from '@/layout/RootLayout'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from "@/supabase/client";

import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import RequireAuth from '@/layout/RequireAuth';
import AdminLayout from '@/layout/AdminLayout';
import Dashboard from '@/pages/Dashboard';
import Players from '@/pages/Players';
import Player from '@/pages/Player';
import Login from '@/pages/Login';
import Convocatoria from '@/pages/Convocatoria';
import Convocatorias from '@/pages/Convocatorias';

const MainRouter = () => {

  const [user, setUser] = useState<
    (User & { role: string; }) | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          setLoading(true);
          const user_id = session.user.id;
          user_id && setUser({ ...session.user, role: "ADMIN" });

        } else {
          setUser(null);
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
            <Route path=":id/convocatorias" element={<Convocatorias />} />
            <Route path=":id/convocatorias/:idConvocatoria" element={<Convocatoria />} />
          </Route>
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter