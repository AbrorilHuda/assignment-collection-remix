import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { supabase } from "~/lib/supabase.client";
import MyTable from "~/components/ui/table";
import { User } from "@supabase/supabase-js";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | remix" },
    {
      name: "description",
      content: "This site Dashboard",
    },
  ];
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login"); // Redirect jika belum login
      } else {
        setUser(user);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">
        Selamat Datang, {user.email?.split("@gmail.com")}
      </h1>
      <MyTable />
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
