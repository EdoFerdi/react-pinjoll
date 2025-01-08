/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [nama, setNama] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama pinjaman
  const [tanggal, settanggal] = useState("");
  const [singkatan, setSingkatan] = useState("");
  const [orang, setorang] = useState(""); // Menginisialisasi state 'orang' untuk menyimpan ID orang terpilih
  const [listorang, setListorang] = useState([]); // Menginisialisasi state 'listorang' untuk menyimpan daftar orang dari API
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data pinjaman berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data pinjaman berdasarkan ID
    axios
      .get(`https://academic-mi5a.vercel.app/api/api/pinjaman/${id}`)
      .then((response) => {
        setNama(response.data.result.nama); // Menyimpan nama pinjaman ke dalam state 'nama'
        settanggal(response.data.result.tanggal);
        setSingkatan(response.data.result.singkatan);
        setorang(response.data.result.orang.id); // Menyimpan ID orang ke dalam state 'orang'
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

    // Mengambil data orang untuk dropdown
    axios
      .get("https://academic-mi5a.vercel.app/api/api/orang") // Request ke API orang
      .then((response) => {
        setListorang(response.data.data); // Menyimpan daftar orang ke dalam state 'listorang'
      })
      .catch((error) => {
        console.error("Error fetching orang data:", error); // Menangani error jika request gagal
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangeNama = (e) => {
    setNama(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangetanggal = (e) => {
    settanggal(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeSingkatan = (e) => {
    setSingkatan(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  // Menghandle perubahan dropdown orang
  const handleorangChange = (e) => {
    setorang(e.target.value); // Mengubah state 'orang' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle submit form untuk mengedit data pinjaman
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://academic-mi5a.vercel.app/api/api/pinjaman/${id}`, {
        nama,
        tanggal,
        singkatan,
        orang_id: orang,
      }) // Mengirimkan request PATCH untuk mengupdate data pinjaman berdasarkan ID
      .then((response) => {
        navigate("/pinjaman"); // Jika update berhasil, navigasi kembali ke halaman list pinjaman
      })
      .catch((error) => {
        console.error("Error updating data:", error); // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data"); // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2>Edit Program Studi</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}{" "}
      {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Form untuk mengedit nama pinjaman */}
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Program Studi
          </label>{" "}
          {/* Label untuk input nama pinjaman */}
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
          <label htmlFor="nama" className="form-label">
            Nama tanggal
          </label>{" "}
          {/* Label untuk input nama pinjaman */}
          <input
            type="text"
            className="form-control"
            id="tanggal"
            value={tanggal} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangetanggal} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Singkatan
          </label>{" "}
          {/* Label untuk input nama pinjaman */}
          <input
            type="text"
            className="form-control"
            id="singkatan"
            value={singkatan} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeSingkatan} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="orang" className="form-label">
            Nama orang
          </label>{" "}
          {/* Label untuk dropdown orang */}
          <select
            className="form-select"
            id="orang"
            value={orang} // Mengisi nilai dropdown dengan state 'orang'
            onChange={handleorangChange} // Mengubah nilai dropdown saat pengguna memilih orang
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih orang</option>{" "}
            {/* Default option untuk dropdown */}
            {listorang.map(
              // Melakukan mapping dari daftar orang untuk menampilkan setiap orang sebagai opsi
              (orang) => (
                <option key={orang.id} value={orang.id}>
                  {orang.nama} {/* Menampilkan nama orang */}
                </option>
              )
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>{" "}
        {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}
