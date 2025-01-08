import React, { useEffect, useState } from "react"
import axios from 'axios'
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; //import SweerAlert2
export default function List() {
  //state orang
  const [orang, setOrang] = useState([]);

  useEffect(() => {
    axios
      .get("https://academic-mi5a.vercel.app/api/api/orang")
      .then((response) => {
        console.log(response);
        setOrang(response.data.data);
      });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Fakultas: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(`https://academic-mi5a.vercel.app/api/api/orang/${id}`)
          .then((response) => {
            // Hapus orang dari state setelah sukses dihapus dari server
            setOrang(orang.filter((f) => f.id !== id));
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
      <h2>List Orang</h2>
      <NavLink to="/orang/create" className="btn btn-primary mb-3">
        Tambah
      </NavLink>

      <table className="table">
        <thead>
          <tr>
            <th>NIK</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No Telp</th>
            <th>Alamat</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {orang.map((data) => (
            <tr key={data.id}>
              <td>{data.nik}</td>
              <td>{data.nama}</td>
              <td>{data.email}</td>
              <td>{data.nohp}</td>
              <td>{data.alamat}</td>
              <td>
                <NavLink
                  to={`/orang/edit/${data.id}`}
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