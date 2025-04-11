import { Link } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/lib/utils/session.server";
import Aurora from "~/components/Aurora";

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("uploadVerified")) {
    return redirect("/pengumpulan", { status: 303 });
  }

  // Clear session setelah berhasil diakses
  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    }
  );
};

export default function SuccessPage() {
  return (
    <>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="max-w-md mx-auto p-8 text-center">
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
          <h1 className="text-xl font-bold text-green-800">
            Pengumpulan Berhasil!
          </h1>
          <p className="text-green-700">Terima kasih telah mengerjakan.</p>
        </div>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </>
  );
}
