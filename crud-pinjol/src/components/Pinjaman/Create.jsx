/* eslint-disable no-unused-vars */
// src/components/Pinjaman/Create.jsx
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreatePinjaman() {
  // Inisialisasi state untuk menyimpan nama Pinjaman
  const [orangId, setOrangId] = useState("");
  // Inisialisasi state untuk menyimpan ID Pinjaman yang dipilih
  const [tglPinjam, setTglPinjam] = useState("");
  const [jmlPinjam, setJmlPinjam] = useState("");
  const [jangkaWaktu, setJangkaWaktu] = useState("");
  // Inisialisasi state untuk menyimpan daftar Pinjaman
  const [orangList, setOrangList] = useState([]);
  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Mengambil daftar Pinjaman dari API saat komponen dimuat
  useEffect(() => {
    const fetchOrang = async () => {
      try {
        const response = await axios.get(
          "https://pinjol-wuxxs-projects.vercel.app/api/api/orang"
        );
        setOrangList(response.data.data); // Simpan data Pinjaman ke dalam state
      } catch (error) {
        setError("Failed to fetch Pinjaman data");
      }
    };

    fetchOrang(); // Panggil fungsi untuk mengambil data Pinjaman
  }, []); // Kosongkan array dependensi agar hanya dijalankan sekali saat komponen dimuat

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika namaPinjaman atau PinjamanId kosong, set pesan error
    if (orangId.trim() === "") {
      setError("Orang are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (tglPinjam.trim() === "") {
      setError("Nama tglPinjam are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (jmlPinjam.trim() === "") {
      setError("jmlPinjam are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (jangkaWaktu.trim() === "") {
      setError("jangkaWaktu are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data Pinjaman
      const response = await axios.post(
        "https://pinjol-wuxxs-projects.vercel.app/api/api/pinjaman", // Endpoint API yang dituju
        {
          tgl_pinjam: tglPinjam, // Data nama Pinjaman
          jumlah_pinjam: jmlPinjam,
          jangka_waktu: jangkaWaktu,
          orang_id: orangId, // Data ID Pinjaman yang dipilih
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika Pinjaman berhasil dibuat
        setSuccess("Pinjaman created successfully!");
        setJangkaWaktu(""); // Kosongkan input form setelah sukses submit
        setTglPinjam("");
        setJmlPinjam("");
        setOrangId(""); // Kosongkan dropdown setelah sukses submit
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Failed to create pinjaman");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating Pinjaman");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Pinjaman</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">Tanggal Pinjam</label>
          {/* Input untuk nama Pinjaman dengan class bootstrap */}
          <input
            type="date"
            className="form-control"
            id="tglPinjam"
            value={tglPinjam} // Nilai input disimpan di state namaPinjaman
            onChange={(e) => setTglPinjam(e.target.value)} // Update state saat input berubah
            placeholder="Enter Tanggal Pinjam" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jumlah Pinjam</label>
          {/* Input untuk nama Pinjaman dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="jmlPinjam"
            value={jmlPinjam} // Nilai input disimpan di state namaPinjaman
            onChange={(e) => setJmlPinjam(e.target.value)} // Update state saat input berubah
            placeholder="Enter Jumlah Pinjam" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">jangka Waktu</label>
          {/* Input untuk nama Pinjaman dengan class bootstrap */}
          <input
            type="date"
            className="form-control"
            id="jangkaWaktu"
            value={jangkaWaktu} // Nilai input disimpan di state namaPinjaman
            onChange={(e) => setJangkaWaktu(e.target.value)} // Update state saat input berubah
            placeholder="Enter Jangka Waktu" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Orang</label>
          {/* Dropdown untuk memilih Pinjaman */}
          <select
            className="form-select"
            id="orangId"
            value={orangId} // Nilai dropdown disimpan di state PinjamanId
            onChange={(e) => setOrangId(e.target.value)} // Update state saat pilihan berubah
          >
            <option value="">Select Orang</option>
            {orangList.map((orang) => (
              <option key={orang.id} value={orang.id}>
                {/* Set key dan value untuk masing-masing Pinjaman */}
                {orang.nama} {/* Nama Pinjaman sebagai teks di dropdown */}
              </option>
            ))}
          </select>
        </div>
        {/* Tombol submit dengan class bootstrap */}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
