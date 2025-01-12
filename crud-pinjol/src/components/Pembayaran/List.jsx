import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
  const [pembayaran, setPembayaran] = useState([]);
  useEffect(() => {
    axios
      .get("https://pinjol-wuxxs-projects.vercel.app/api/api/pembayaran")
      .then((response) => {
        console.log(response);
        setPembayaran(response.data.data);
      });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! pembayaran: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(
            `https://pinjol-wuxxs-projects.vercel.app/api/api/pembayaran${id}`
          )
          .then((response) => {
            // Hapus fakultas dari state setelah sukses dihapus dari server
            setPembayaran(pembayaran.filter((f) => f.id !== id));
            // Tampilkan notifikasi sukses
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Menangani error
            Swal.fire(
              "Error",
              "There was an issue deleting the data.",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      <h2>List pembayaran</h2>
      <NavLink to="/pembayaran/create" className="btn btn-primary mb-3">
        Tambah
      </NavLink>
      <table className="table">
        <thead>
          <tr>
            <th>Nama Peminjman</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Bayar</th>
            <th>Jumlah Bayar</th>
            <th>Sisa Bayar</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {pembayaran.map((data) => (
            <tr key={data.id}>
              <td>{data.pinjamen.orang.nama}</td>
              <td>{data.pinjamen.tgl_pinjam}</td>
              <td>{data.tgl_bayar}</td>
              <td>{data.jumlah_bayar}</td>
              <td>{data.sisa_bayar}</td>
              <td>
                <NavLink
                  to={`/pembayaran/edit/${data.id}`}
                  className="btn btn-warning"
                >
                  Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(data.id, data.nama)}
                  className="btn btn-danger"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
