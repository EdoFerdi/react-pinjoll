/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [nik, setNik] = useState(""); // Menginisialisasi state 'nik' untuk menyimpan NIK
  const [nama, setNama] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama
  const [email, setEmail] = useState(""); // Menginisialisasi state 'email' untuk menyimpan email
  const [nohp, setNoHp] = useState(""); // Menginisialisasi state 'nohp' untuk menyimpan nomor HP
  const [alamat, setAlamat] = useState(""); // Menginisialisasi state 'alamat' untuk menyimpan alamat
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data mahasiswa berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get(`https://pinjol-wuxxs-projects.vercel.app/api/api/orang/${id}`)
      .then((response) => {
        const { nik, nama, email, nohp, alamat } = response.data;
        setNik(nik);
        setNama(nama);
        setEmail(email);
        setNoHp(nohp);
        setAlamat(alamat);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });
  }, [id]); // Dependency array untuk memastikan useEffect hanya dijalankan saat 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangenik = (e) => setNik(e.target.value);
  const handleChangeNama = (e) => setNama(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangenoHp = (e) => setNoHp(e.target.value);
  const handleChangeAlamat = (e) => setAlamat(e.target.value);

  // Menghandle submit form untuk mengedit data
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://pinjol-wuxxs-projects.vercel.app/api/api/orang/${id}`, {
        nik,
        nama,
        email,
        nohp,
        alamat,
      })
      .then(() => {
        navigate("/orang"); // Jika update berhasil, navigasi kembali ke halaman list prodi
      })
      .catch((error) => {
        console.error("Error updating data:", error); // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data"); // Menampilkan pesan error
      });
  };

  return (
    <div>
      <h2>Edit Mahasiswa</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nik" className="form-label">
            NIK
          </label>
          <input
            type="text"
            className="form-control"
            id="nik"
            value={nik}
            onChange={handleChangenik}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama
          </label>
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama}
            onChange={handleChangeNama}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleChangeEmail}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nohp" className="form-label">
            No HP
          </label>
          <input
            type="text"
            className="form-control"
            id="nohp"
            value={nohp}
            onChange={handleChangenoHp}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="alamat" className="form-label">
            Alamat
          </label>
          <input
            type="text"
            className="form-control"
            id="alamat"
            value={alamat}
            onChange={handleChangeAlamat}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
