/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [nik, setNik] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [nama, setNama] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [email, setEmail] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [nohp, setNoHp] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [alamat, setAlamat] = useState("");
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data prodi berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data mahasiswa berdasarkan ID
    axios
      .get(`https://academic-mi5a.vercel.app/api/api/mahasiswa/${id}`)
      .then((response) => {
        setNik("");
        setNama(""); // Kosongkan input form setelah sukses submit
        setTanggal_Lahir("");
        setTempat_Lahir("");
        setEmail("");
        setNoHp("");
        setAlamat("");
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

    // Mengambil data prodi untuk dropdown
    axios
      .get("https://academic-mi5a.vercel.app/api/api/prodi") // Request ke API fakultas
      .then((response) => {
        setProdiList(response.data.data); // Menyimpan daftar fakultas ke dalam state 'listFakultas'
      })
      .catch((error) => {
        console.error("Error fetching fakultas data:", error); // Menangani error jika request gagal
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangenik = (e) => {
    setNik(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  const handleChangeNama = (e) => {
    setNama(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  const handleChangenoHp = (e) => {
    setNoHp(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  // Menghandle perubahan dropdown fakultas
  const handleChangeAlamat = (e) => {
    setAlamat(e.target.value); // Mengubah state 'fakultas' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle submit form untuk mengedit data prodi
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://academic-mi5a.vercel.app/api/api/mahasiswa/${id}`, {
        nik,
        nama,
        email,
        nohp,
        alamat,
      }) // Mengirimkan request PATCH untuk mengupdate data prodi berdasarkan ID
      .then((response) => {
        navigate("/prodi"); // Jika update berhasil, navigasi kembali ke halaman list prodi
      })
      .catch((error) => {
        console.error("Error updating data:", error); // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data"); // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2>Edit Mahasiswa</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}{" "}
      {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Form untuk mengedit nama prodi */}
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            NIK
          </label>{" "}
          {/* Label untuk input nama prodi */}
          <input
            type="text"
            className="form-control"
            id="nik"
            value={nik} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangenik} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama
          </label>{" "}
          {/* Label untuk input nama prodi */}
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeNama} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>{" "}
          {/* Label untuk input nama prodi */}
          <input
            type="text"
            className="form-control"
            id="email"
            value={email} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeEmail} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nohp" className="form-label">
            No Hp
          </label>{" "}
          {/* Label untuk input nama prodi */}
          <input
            type="text"
            className="form-control"
            id="nohp"
            value={nohp} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangenoHp} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nohp" className="form-label">
            Alamat
          </label>{" "}
          {/* Label untuk input nama prodi */}
          <input
            type="text"
            className="form-control"
            id="alamat"
            value={alamat} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeAlamat} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>{" "}
        {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}
