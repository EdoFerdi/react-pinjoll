/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [pinjaman, setPinjaman] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama pinjaman
  const [tglBayar, setTglBayar] = useState("");
  const [jumlahBayar, setJumlahBayar] = useState("");
  const [sisaBayar, setSisaBayar] = useState(""); // Menginisialisasi state 'orang' untuk menyimpan ID orang terpilih
  const [listPinjaman, setlistPinjaman] = useState([]); // Menginisialisasi state 'listPinjaman' untuk menyimpan daftar orang dari API
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data pinjaman berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data pinjaman berdasarkan ID
    axios
      .get(`https://pinjol-wuxxs-projects.vercel.app/api/api/pembayaran/${id}`)
      .then((response) => {
        setPinjaman(response.data.pinjaman); // Menyimpan nama pinjaman ke dalam state 'nama'
        setTglBayar(response.data.tgl_bayar);
        setJumlahBayar(response.data.jumlah_bayar);
        setSisaBayar(response.data.sisa_bayar);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

    // Mengambil data orang untuk dropdown
    axios
      .get("https://pinjol-wuxxs-projects.vercel.app/api/api/pinjaman") // Request ke API orang
      .then((response) => {
        setlistPinjaman(response.data.data); // Menyimpan daftar orang ke dalam state 'listPinjaman'
      })
      .catch((error) => {
        console.error("Error fetching orang data:", error); // Menangani error jika request gagal
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangepinjaman = (e) => {
    setPinjaman(e.target.value); // Mengubah state 'pinjaman' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangetglBayar = (e) => {
    setTglBayar(e.target.value); // Mengubah state 'pinjaman' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangejumlahBayar = (e) => {
    setJumlahBayar(e.target.value); // Mengubah state 'pinjaman' sesuai dengan nilai input yang diisi pengguna
  };

  // Menghandle perubahan dropdown orang
  const handleChangesisaBayar = (e) => {
    setSisaBayar(e.target.value); // Mengubah state 'orang' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };

  // Menghandle submit form untuk mengedit data pinjaman
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://academic-mi5a.vercel.app/api/api/pinjaman/${id}`, {
        pinjaman: pinjaman,
        tglBayar,
        jumlahBayar,
        sisaBayar,
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
      <h2>Edit Pembayaran</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}{" "}
      {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Form untuk mengedit pinjaman pinjaman */}
        <div className="mb-3">
          <label htmlFor="pinjaman" className="form-label">
            Pinjaman
          </label>{" "}
          {/* Label untuk dropdown orang */}
          <select
            className="form-select"
            id="pinjaman"
            value={pinjaman} // Mengisi nilai dropdown dengan state 'orang'
            onChange={handleChangepinjaman} // Mengubah nilai dropdown saat pengguna memilih orang
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih Pinjaman</option>{" "}
            {/* Default option untuk dropdown */}
            {listPinjaman.map(
              // Melakukan mapping dari daftar pinjaman untuk menampilkan setiap orang sebagai opsi
              (pinjaman) => (
                <option key={pinjaman.id} value={pinjaman.id}>
                  {pinjaman.jumlah_pinjam} {/* Menampilkan nama pinjaman */}
                </option>
              )
            )}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tglBayar" className="form-label">
            Tanggal bayar
          </label>{" "}
          {/* Label untuk input pinjaman pinjaman */}
          <input
            type="date"
            className="form-control"
            id="tglBayar"
            value={tglBayar} // Mengisi nilai input dengan state 'pinjaman'
            onChange={handleChangetglBayar} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jumlahBayar" className="form-label">
            Jumlah Bayar
          </label>{" "}
          {/* Label untuk input nama pinjaman */}
          <input
            type="text"
            className="form-control"
            id="jumlahBayar"
            value={jumlahBayar} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangejumlahBayar} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Sisa Bayar
          </label>{" "}
          {/* Label untuk input nama pinjaman */}
          <input
            type="text"
            className="form-control"
            id="sisaBayar"
            value={sisaBayar} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangejumlahBayar} // Mengubah nilai input saat ada perubahan (user mengetik)
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
