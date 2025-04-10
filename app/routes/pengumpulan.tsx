import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Input, Form } from "@heroui/react";
import MyAlert from "~/components/ui/alert";
import alertType from "~/lib/types/alertype";

export default function UploadForm() {
  const [name, setName] = useState<string>("");
  const [nim, setNim] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hiden, setHiden] = useState<alertType>({
    hide: false,
    message: "",
    color: "default",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name && !nim && !semester) {
      setHiden({
        hide: true,
        message: "semua field harus di isi",
        color: "warning",
      });
      return;
    }

    if (!file) {
      setHiden({
        hide: true,
        message: "file harus di isi",
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("nim", nim);
    formData.append("semester", semester);
    formData.append("file", file);

    // kirim data ke api
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setHiden({
          hide: true,
          message: "Berhasil di Kirim.",
          color: "success",
        });
        setName("");
        setNim("");
        setSemester("");
        setFile(null);
      } else {
        const errorData = await response.json();
        if (errorData.error) {
          setHiden({
            hide: true,
            message: errorData.error,
            color: "danger",
          });
        }
      }
    } catch (error) {
      console.error("Error saat upload:", error);
      alert("Terjadi kesalahan saat mengunggah.");
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-10 text-center">
        Form Pengumpulan Tugas
      </h1>
      <MyAlert color={hiden.color} hide={hiden.hide} message={hiden.message} />
      <Button
        onPress={() => setHiden({ hide: false })}
        variant="ghost"
        size="sm"
        className={`bg-orange-500 ${!hiden.hide ? "hidden" : ""}`}
      >
        close
      </Button>
      <Form
        onSubmit={handleSubmit}
        className="space-y-4 p-5 items-center text-white"
      >
        <Input
          required
          className="max-w-xs bg-gray-800 border rounded-xl"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          fullWidth
          placeholder="Nama example: andre"
        />
        <Input
          className="max-w-xs bg-gray-800 border rounded-xl"
          value={nim}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNim(e.target.value)
          }
          fullWidth
          placeholder="Nim example: 208029308"
        />
        <Input
          className="max-w-xs bg-gray-800 border rounded-xl"
          value={semester}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSemester(e.target.value)
          }
          fullWidth
          placeholder="Semester example: 1,2,...8"
          type="number"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="block text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
        />
        <p className="text-gray-500 font-mono text-xs">
          {file?.size ? `Size: ${(file?.size / (1024 * 1024)).toFixed(2)}` : ""}
        </p>
        <Button
          type="submit"
          fullWidth
          className="bg-blue-800 rounded-md hover:bg-blue-950 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
}
