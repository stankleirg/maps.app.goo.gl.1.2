SETUP

A. GOOGLE APPS SCRIPT

1. Buka Google Sheet kamu.
2. Pastikan tab bernama "Sheet1" (atau ubah SHEET_NAME di Code.gs).
3. Buka Apps Script.
4. Paste isi Code.gs.
5. Ganti:
   PASTE_SHEET_ID_DI_SINI
   dengan Sheet ID kamu.
6. Save.
7. Deploy > New deployment > Web app.
8. Execute as: Me
9. Who has access: Anyone
10. Deploy dan copy URL yang berakhir /exec

Contoh:
https://script.google.com/macros/s/AKfycb.../exec


B. VERCEL

1. Upload folder project ini ke GitHub, lalu Import Project di Vercel.
   Atau pakai Vercel CLI.

2. Di Vercel buka:
   Project > Settings > Environment Variables

3. Tambahkan:
   Name:
   APPS_SCRIPT_URL

   Value:
   URL Apps Script /exec tadi

4. Save environment variable.

5. Redeploy project:
   Deployments > ... > Redeploy

6. Buka URL Vercel kamu.

Flow:
Vercel page
-> user menekan tombol
-> browser meminta izin lokasi
-> lokasi dikirim ke /api/location
-> Vercel serverless mengirim ke Apps Script
-> Apps Script menulis ke Google Sheet
-> halaman membuka Google Maps

PENTING:
Halaman harus tetap menjelaskan bahwa lokasi akan dibagikan setelah izin diberikan.
Jangan menyamarkan halaman sebagai Google Maps atau layanan lain.
