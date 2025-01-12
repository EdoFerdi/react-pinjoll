/* eslint-disable no-unused-vars */
// src/components/Orang/Create.jsx
import React, { useState } from "react"; // Import React dan useState untuk menggunakan state hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateOrang() {
  // Inisialisasi state untuk menyimpan nama Orang
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");

  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika nik kosong, set pesan error
    if (nik.trim() === "") {
      setError("Nama Orang is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    if (nama.trim() === "") {
      setError("Nama Dekan is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (email.trim() === "") {
      setError("email is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (nohp.trim() === "") {
      setError("email is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (alamat.trim() === "") {
      setError("email is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data Orang
      const response = await axios.post(
        "https://pinjol-wuxxs-projects.vercel.app/api/api/orang", // Endpoint API yang dituju
        {
          nik: nik, // Data yang dikirim berupa objek JSON dengan properti 'nama'
          nama: nama,
          email: email,
          nohp: nohp,
          alamat: alamat,
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika Orang berhasil dibuat
        setSuccess("Orang created successfully!");
        setNik(""); // Kosongkan input form setelah sukses submit
        setNama("");
        setEmail("");
        setNoHp("");
        setAlamat("");
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Failed to create Orang");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating Orang");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Orang</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}
      {/* Form untuk mengisi nama Orang */}
      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">NIK</label>
          {/* Input untuk nama Orang dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="nik"
            value={nik} // Nilai input disimpan di state nik
            onChange={(e) => setNik(e.target.value)} // Update state saat input berubah
            placeholder="Enter NIK" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Orang</label>
          {/* Input untuk nama Orang dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama} // Nilai input disimpan di state nik
            onChange={(e) => setNama(e.target.value)} // Update state saat input berubah
            placeholder="Enter Orang Name" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          {/* Input untuk nama Orang dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="email"
            value={email} // Nilai input disimpan di state nik
            onChange={(e) => setEmail(e.target.value)} // Update state saat input berubah
            placeholder="Enter Email" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">No Telp</label>
          {/* Input untuk nama Orang dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="nohp"
            value={nohp} // Nilai input disimpan di state nik
            onChange={(e) => setNoHp(e.target.value)} // Update state saat input berubah
            placeholder="Enter No Telp" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Alamat</label>
          {/* Input untuk nama Orang dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="alamat"
            value={alamat} // Nilai input disimpan di state nik
            onChange={(e) => setAlamat(e.target.value)} // Update state saat input berubah
            placeholder="Enter Address" // Placeholder teks untuk input
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
