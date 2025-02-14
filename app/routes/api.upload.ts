import type { ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {createClient} from "@supabase/supabase-js"
//import { supabase } from '~/lib/supabase';

export async function action({ request }: ActionFunctionArgs) {
    const supabase = createClient(
        process.env.SUPABASE_URL as string,
        process.env.SUPABASE_ANON_KEY as string
      );
    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const nim = formData.get('nim') as string
    const semester = formData.get('semester') as string;
    const file = formData.get('file') as File;

    if (!file) {
        return json({ error: 'File tidak ditemukan.' }, { status: 400 });
    }

    // Konversi file ke ArrayBuffer dan buat Blob
    const fileBuffer = await file.arrayBuffer();
    const filePath = `data/${Date.now()}_${name.toLocaleUpperCase()}_semester${semester}_${file.name}`;

    // Unggah ke Supabase Storage
    const { data, error } = await supabase.storage
        .from('uploads') // Ganti dengan nama bucket di Supabase
        .upload(filePath, Buffer.from(fileBuffer), {
            contentType: file.type,
            upsert: false, // Jika true, file dengan nama sama akan ditimpa
        });

    if (error) {
        console.error('Gagal mengunggah file ke Supabase:', error);
        return json({ error: 'Gagal mengunggah file.' }, { status: 500 });
    }

    // Dapatkan URL file publik
    const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(filePath);
    const fileUrl = publicUrlData.publicUrl;


  // Simpan data ke tabel Supabase
  const { error: insertError } = await supabase
      .from('pengumpulan_mahasiswa') // Nama tabel di Supabase
      .insert([
          {
              name,
              nim,
              semester,
              url_document: fileUrl,
          },
      ]);

  if (insertError) {
      console.error('Gagal menyimpan data ke database:', insertError);
      return json({ error: 'Gagal menyimpan data.' }, { status: 500 });
  }


    

    return json({ fileUrl }, { status: 200 });
}
