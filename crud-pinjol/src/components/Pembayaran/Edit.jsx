/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [pinjaman_id, setpinjaman_id] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama pinjaman_id
  const [tgl_bayar, settgl_bayar] = useState("");
  const [jumlah_bayar, setjumlah_bayar] = useState("");
  const [sisa_bayar, setsisa_bayar] = useState(""); // Menginisialisasi state 'orang' untuk menyimpan ID orang terpilih
  const [listpinjaman_id, setlistpinjaman_id] = useState([]); // Menginisialisasi state 'listpinjaman_id' untuk menyimpan daftar orang dari API
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data pinjaman_id berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data pinjaman_id berdasarkan ID
    axios
      .get(`https://pinjol-wuxxs-projects.vercel.app/api/api/pembayaran/${id}`)
      .then((response) => {
        setpinjaman_id(response.data.pinjaman_id); // Menyimpan nama pinjaman_id ke dalam state 'nama'
        settgl_bayar(response.data.tgl_bayar);
        setjumlah_bayar(response.data.jumlah_bayar);
        setsisa_bayar(response.data.sisa_bayar);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

    // Mengambil data orang untuk dropdown
    axios
      .get("https://pinjol-wuxxs-projects.vercel.app/api/api/pinjaman") // Request ke API orang
      .then((response) => {
        setlistpinjaman_id(response.data.data); // Menyimpan daftar orang ke dalam state 'listpinjaman_id'
      })
      .catch((error) => {
        console.error("Error fetching orang data:", error); // Menangani error jika request gagal
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangepinjaman_id = (e) => {
    setpinjaman_id(e.target.value); // Mengubah state 'pinjaman_id' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangetgl_bayar = (e) => {
    settgl_bayar(e.target.value); // Mengubah state 'pinjaman_id' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangejumlah_bayar = (e) => {
    setjumlah_bayar(e.target.value); // Mengubah state 'pinjaman_id' sesuai dengan nilai input yang diisi pengguna
  };

  // Menghandle perubahan dropdown orang
  const handleChangesisa_bayar = (e) => {
    setsisa_bayar(e.target.value); // Mengubah state 'orang' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle submit form untuk mengedit data pinjaman_id
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .put(
        `https://pinjol-wuxxs-projects.vercel.app/api/api/pembayaran/${id}`,
        {
          pinjaman_id: pinjaman_id,
          tgl_bayar,
          jumlah_bayar,
          sisa_bayar,
        }
      ) // Mengirimkan request PATCH untuk mengupdate data pinjaman_id berdasarkan ID
      .then((response) => {
        navigate("/pembayaran"); // Jika update berhasil, navigasi kembali ke halaman list pinjaman_id
      })
      .catch((error) => {
        console.error("Error updating data:", error); // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data"); // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2>Edit Pembayaran</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}{" "}
      {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Form untuk mengedit pinjaman_id pinjaman_id */}
        <div className="mb-3">
          <label htmlFor="pinjaman_id" className="form-label">
            Pinjaman
          </label>{" "}
          {/* Label untuk dropdown orang */}
          <select
            className="form-select"
            id="pinjaman_id"
            value={pinjaman_id} // Mengisi nilai dropdown dengan state 'orang'
            onChange={handleChangepinjaman_id} // Mengubah nilai dropdown saat pengguna memilih orang
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih pinjaman_id</option>{" "}
            {/* Default option untuk dropdown */}
            {listpinjaman_id.map(
              // Melakukan mapping dari daftar pinjaman_id untuk menampilkan setiap orang sebagai opsi
              (pinjaman_id) => (
                <option key={pinjaman_id.id} value={pinjaman_id.id}>
                  {pinjaman_id.jumlah_pinjam} {/* Menampilkan nama pinjaman_id */}
                </option>
              )
            )}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tgl_bayar" className="form-label">
            Tanggal bayar
          </label>{" "}
          {/* Label untuk input pinjaman_id pinjaman_id */}
          <input
            type="date"
            className="form-control"
            id="tgl_bayar"
            value={tgl_bayar} // Mengisi nilai input dengan state 'pinjaman_id'
            onChange={handleChangetgl_bayar} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jumlah_bayar" className="form-label">
            Jumlah Bayar
          </label>{" "}
          {/* Label untuk input nama pinjaman_id */}
          <input
            type="text"
            className="form-control"
            id="jumlah_bayar"
            value={jumlah_bayar} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangejumlah_bayar} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Sisa Bayar
          </label>{" "}
          {/* Label untuk input nama pinjaman_id */}
          <input
            type="text"
            className="form-control"
            id="sisa_bayar"
            value={sisa_bayar} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangesisa_bayar} // Mengubah nilai input saat ada perubahan (user mengetik)
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
