/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [tgl_pinjam, settanggal_pinjam] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [jumlah_pinjam, setjumlah_pinjam] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [jangka_waktu, setjangka_waktu] = useState(""); // Menginisialisasi state ' untuk menyimpan ID terpilih
  const [orang_id, setOrangId] = useState("");
  const [orangList, setOrangList] = useState([]);
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data pinjaman berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data pinjaman berdasarkan ID
    axios
      .get(`https://pinjol-wuxxs-projects.vercel.app/api/api/pinjaman/${id}`)
      .then((response) => {
        settanggal_pinjam(response.data.tgl_pinjam);
        setjumlah_pinjam(response.data.jumlah_pinjam); // Menyimpan nama prodi ke dalam state 'nama'
        setjangka_waktu(response.data.jangka_waktu); // Menyimpan ID ke dalam state '
        setOrangId(response.data.orang_id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

    // Mengambil data  untuk dropdown
    axios
      .get("https://pinjol-wuxxs-projects.vercel.app/api/api/orang") // Request ke API
      .then((response) => {
        setOrangList(response.data.data); // Menyimpan daftar ke dalam state 'lis'
      })
      .catch((error) => {
        console.error("Error fetching orang data:", error); // Menangani error jika request gagal
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangetanggal_pinjam = (e) => {
    settanggal_pinjam(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangejumlah_pinjam = (e) => {
    setjumlah_pinjam(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  const handleChangejangka_waktu = (e) => {
    setjangka_waktu(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  // Menghandle perubahan dropdown

  // Menghandle perubahan dropdown
  const handleChangeOrang = (e) => {
    setOrangId(e.target.value); // Mengubah state ' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle submit form untuk mengedit data pinjaman
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://pinjol-wuxxs-projects.vercel.app/api/api/pinjaman/${id}`, {
        tgl_pinjam,
        jumlah_pinjam,
        jangka_waktu,
        orang_id: orang_id,
      }) // Mengirimkan request PATCH untuk mengupdate data prodi berdasarkan ID
      .then((response) => {
        
        navigate("/pinjaman"); // Jika update berhasil, navigasi kembali ke halaman list prodi
      })
      .catch((error) => {
        console.error("Error updating data:", error); // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data"); // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2 className="mt-3 mb-3 ms-3">Edit pinjaman Klinik</h2>{" "}
      {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}{" "}
      {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Form untuk mengedit nama prodi */}
        <div className="mb-3 ms-3">
          <label htmlFor="tanggal_pinjam" className="form-label">
            Tanggal Pinjam
          </label>{" "}
          {/* Label untuk input nama prodi */}
          <input
            type="date"
            className="form-control"
            id="tgl_pinjam"
            value={tgl_pinjam} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangetanggal_pinjam} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="jumlah_pinjam" className="form-label">
            Jumlah Pinjam
          </label>{" "}
          {/* Label untuk input nama prodi */}
          <input
            type="text"
            className="form-control"
            id="jumlah_pinjam"
            value={jumlah_pinjam} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangejumlah_pinjam} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="jangka_waktu" className="form-label">
            Tanggal Pinjam
          </label>{" "}
          {/* Label untuk input nama prodi */}
          <input
            type="date"
            className="form-control"
            id="jangka_waktu"
            value={jangka_waktu} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangejangka_waktu} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="Orang" className="form-label">
            Nama Orang
          </label>{" "}
          {/* Label untuk dropdown Orang */}
          <select
            className="form-select"
            id="orang_id"
            value={orang_id} // Mengisi nilai dropdown dengan state 'orang'
            onChange={handleChangeOrang} // Mengubah nilai dropdown saat pengguna memilih orang
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih Orang</option>{" "}
            {/* Default option untuk dropdown */}
            {orangList.map(
              // Melakukan mapping dari daftar orang untuk menampilkan setiap orang sebagai opsi
              (f) => (
                <option key={f.id} value={f.id}>
                  {f.nama} {/* Menampilkan nama orang */}
                </option>
              )
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-secondary ms-3">
          Simpan
        </button>{" "}
        {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}
