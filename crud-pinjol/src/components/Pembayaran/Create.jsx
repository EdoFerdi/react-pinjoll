/* eslint-disable no-unused-vars */
// src/components/Pinjaman/Create.jsx
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreatePinjaman() {
  // Inisialisasi state untuk menyimpan nama Pinjaman
  const [pinjaman_id, setpinjamanid] = useState("");
  // Inisialisasi state untuk menyimpan ID Pinjaman yang dipilih
  const [tgl_bayar, settgl_bayar] = useState("");
  const [jumlah_bayar, setjumlah_bayar] = useState("");
  const [sisa_bayar, setsisa_bayar] = useState("");
  // Inisialisasi state untuk menyimpan daftar Pinjaman
  const [pinjamanList, setpinjamanList] = useState([]);
  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Mengambil daftar Pinjaman dari API saat komponen dimuat
  useEffect(() => {
    const fetchpinjaman = async () => {
      try {
        const response = await axios.get(
          "https://pinjol-wuxxs-projects.vercel.app/api/api/pinjaman"
        );
        setpinjamanList(response.data.data); // Simpan data Pinjaman ke dalam state
      } catch (error) {
        setError("Failed to fetch Pinjaman data");
      }
    };

    fetchpinjaman(); // Panggil fungsi untuk mengambil data Pinjaman
  }, []); // Kosongkan array dependensi agar hanya dijalankan sekali saat komponen dimuat

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setpinjamanid("");
    setjumlah_bayar("");
    settgl_bayar("");
    setsisa_bayar("");
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika namaPinjaman atau PinjamanId kosong, set pesan error
    if (pinjaman_id.trim() === "") {
      setError("pinjaman are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (tgl_bayar.trim() === "") {
      setError("Nama tgl_bayar are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (jumlah_bayar.trim() === "") {
      setError("jumlah_bayar are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (sisa_bayar.trim() === "") {
      setError("sisa_bayar are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data Pinjaman
      const response = await axios.post(
        "https://pinjol-wuxxs-projects.vercel.app/api/api/pembayaran", // Endpoint API yang dituju
        {
          pinjaman_id: pinjaman_id,
          tgl_bayar: tgl_bayar, // Data nama Pinjaman
          jumlah_bayar: jumlah_bayar,
          sisa_bayar: sisa_bayar,
          // Data ID Pinjaman yang dipilih
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika Pinjaman berhasil dibuat
        setSuccess("Pinjaman created successfully!");
        setsisa_bayar(""); // Kosongkan input form setelah sukses submit
        settgl_bayar("");
        setjumlah_bayar("");
        setpinjamanid(""); // Kosongkan dropdown setelah sukses submit
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
      <h2 className="mb-4">Create Pembayaran</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">Jumlah Pinjaman</label>
          {/* Dropdown untuk memilih Pinjaman */}
          <select
            className="form-select"
            id="pinjaman_id"
            value={pinjaman_id} // Nilai dropdown disimpan di state PinjamanId
            onChange={(e) => setpinjamanid(e.target.value)} // Update state saat pilihan berubah
          >
            <option value="">Select pinjaman</option>
            {pinjamanList.map((pinjamen) => (
              <option key={pinjamen.id} value={pinjamen.id}>
                {/* Set key dan value untuk masing-masing Pinjaman */}
                {pinjamen.jumlah_pinjam}{" "}
                {/* Nama Pinjaman sebagai teks di dropdown */}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Bayar</label>
          {/* Input untuk nama Pinjaman dengan class bootstrap */}
          <input
            type="date"
            className="form-control"
            id="tgl_bayar"
            value={tgl_bayar} // Nilai input disimpan di state namaPinjaman
            onChange={(e) => settgl_bayar(e.target.value)} // Update state saat input berubah
            placeholder="Enter Tanggal Pinjam" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jumlah Bayar</label>
          {/* Input untuk nama Pinjaman dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="jumlah_bayar"
            value={jumlah_bayar} // Nilai input disimpan di state namaPinjaman
            onChange={(e) => setjumlah_bayar(e.target.value)} // Update state saat input berubah
            placeholder="Enter Jumlah Pinjam" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sisa Bayar</label>
          {/* Input untuk nama Pinjaman dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="sisa_bayar"
            value={sisa_bayar} // Nilai input disimpan di state namaPinjaman
            onChange={(e) => setsisa_bayar(e.target.value)} // Update state saat input berubah
            placeholder="Enter Sisa Bayar" // Placeholder teks untuk input
          />
        </div>

        {/* Tombol submit dengan class bootstrap */}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
