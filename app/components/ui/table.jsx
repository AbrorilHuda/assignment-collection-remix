import { useState, useEffect } from "react";
import { supabaseClient } from "../../lib/supabase";
import { convertToWIB } from "../../lib/utils/date";

export default function MyTable() {
  const [mahasiswa, setMahasiswa] = useState();

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabaseClient
        .from("pengumpulan_mahasiswa")
        .select("*");
      if (error) console.error("Error:", error);
      else setMahasiswa(data);
    }

    fetchUsers();
  }, []);

  if (!mahasiswa) return <p>Loading...🔍</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="pb-4 bg-white dark:bg-gray-900">
        <div className="relative mt-1">
          <input
            type="text"
            id="table-search"
            className="block pt-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for nim"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              NIM
            </th>
            <th scope="col" className="px-6 py-3">
              NAMA
            </th>
            <th scope="col" className="px-6 py-3">
              SEMESTER
            </th>
            <th scope="col" className="px-6 py-3">
              DATE UPLOAD
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((m) => (
            <tr
              key={m.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {m.nim}
              </th>
              <td className="px-6 py-4">{m.name}</td>
              <td className="px-6 py-4">{m.semester}</td>
              <td className="px-6 py-4">{convertToWIB(m.created_at)}</td>
              <td className="px-6 py-4">
                <a
                  href={m.url_document}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline pe-2"
                  target="_blank"
                >
                  view
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
