import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { supabase } from "~/lib/supabase.client";
import { useForm, SubmitHandler } from "react-hook-form";
import { LockClosedIcon, InboxIcon } from "@heroicons/react/24/outline";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Login | remix" },
    {
      name: "description",
      content: "This site Login",
    },
  ];
};

type loginType = { email: string; password: string };

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();

  const onSubmit: SubmitHandler<loginType> = async (data) => {
    setError(null); // Reset error

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError("Email atau password salah");
      return;
    }

    navigate("/dashboard"); // Redirect setelah login sukses
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                {...register("email", { required: "Email wajib diisi" })}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Masukkan email"
              />
              <InboxIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                {...register("password", { required: "Password wajib diisi" })}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Masukkan password"
              />
              <LockClosedIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
