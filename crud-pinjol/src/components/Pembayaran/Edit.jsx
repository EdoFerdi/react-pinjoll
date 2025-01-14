/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [jumlah_pinjam, setjumlah_pinjam] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama jumlah_pinjam
  const [tgl_bayar, settgl_bayar] = useState("");
  const [jumlah_bayar, setjumlah_bayar] = useState("");
  const [sisa_bayar, setsisa_bayar] = useState(""); // Menginisialisasi state 'orang' untuk menyimpan ID orang terpilih
  const [listjumlah_pinjam, setlistjumlah_pinjam] = useState([]); // Menginisialisasi state 'listjumlah_pinjam' untuk menyimpan daftar orang dari API
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data jumlah_pinjam berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data jumlah_pinjam berdasarkan ID
    axios
      .get(`https://pinjol-wuxxs-projects.vercel.app/api/api/pembayaran/${id}`)
      .then((response) => {
        setjumlah_pinjam(response.data.pinjaman_id); // Menyimpan nama jumlah_pinjam ke dalam state 'nama'
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
        setlistjumlah_pinjam(response.data.data); // Menyimpan daftar orang ke dalam state 'listjumlah_pinjam'
      })
      .catch((error) => {
        console.error("Error fetching orang data:", error); // Menangani error jika request gagal
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangejumlah_pinjam = (e) => {
    setjumlah_pinjam(e.target.value); // Mengubah state 'jumlah_pinjam' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangetgl_bayar = (e) => {
    settgl_bayar(e.target.value); // Mengubah state 'jumlah_pinjam' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangejumlah_bayar = (e) => {
    setjumlah_bayar(e.target.value); // Mengubah state 'jumlah_pinjam' sesuai dengan nilai input yang diisi pengguna
  };

  // Menghandle perubahan dropdown orang
  const handleChangesisa_bayar = (e) => {
    setsisa_bayar(e.target.value); // Mengubah state 'orang' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle submit form untuk mengedit data jumlah_pinjam
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .put(
        `https://pinjol-wuxxs-projects.vercel.app/api/api/pembayaran/${id}`,
        {
          jumlah_pinjam: jumlah_pinjam,
          tgl_bayar,
          jumlah_bayar,
          sisa_bayar,
        }
      ) // Mengirimkan request PATCH untuk mengupdate data jumlah_pinjam berdasarkan ID
      .then((response) => {
        navigate("/jumlah_pinjam"); // Jika update berhasil, navigasi kembali ke halaman list jumlah_pinjam
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
        {/* Form untuk mengedit jumlah_pinjam jumlah_pinjam */}
        <div className="mb-3">
          <label htmlFor="jumlah_pinjam" className="form-label">
            jumlah_pinjam
          </label>{" "}
          {/* Label untuk dropdown orang */}
          <select
            className="form-select"
            id="jumlah_pinjam"
            value={jumlah_pinjam} // Mengisi nilai dropdown dengan state 'orang'
            onChange={handleChangejumlah_pinjam} // Mengubah nilai dropdown saat pengguna memilih orang
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih jumlah_pinjam</option>{" "}
            {/* Default option untuk dropdown */}
            {listjumlah_pinjam.map(
              // Melakukan mapping dari daftar jumlah_pinjam untuk menampilkan setiap orang sebagai opsi
              (jumlah_pinjam) => (
                <option key={jumlah_pinjam.id} value={jumlah_pinjam.id}>
                  {jumlah_pinjam.jumlah_pinjam} {/* Menampilkan nama jumlah_pinjam */}
                </option>
              )
            )}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tgl_bayar" className="form-label">
            Tanggal bayar
          </label>{" "}
          {/* Label untuk input jumlah_pinjam jumlah_pinjam */}
          <input
            type="date"
            className="form-control"
            id="tgl_bayar"
            value={tgl_bayar} // Mengisi nilai input dengan state 'jumlah_pinjam'
            onChange={handleChangetgl_bayar} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jumlah_bayar" className="form-label">
            Jumlah Bayar
          </label>{" "}
          {/* Label untuk input nama jumlah_pinjam */}
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
          {/* Label untuk input nama jumlah_pinjam */}
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
