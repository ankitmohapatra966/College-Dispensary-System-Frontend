import React from "react";
import "./adminGallary.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddModal from "./AddModal/addModal";
import { useState, useEffect } from "react";
import DeleteModal from "./DeleteModal/deleteModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const AdminGallary = (props) => {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  const [data, setData] = useState([])
  const setAddModalFunc = () => {
    setAddModal((prev) => !prev);
  };
  const setDeleteModalFunc = (item = null) => {
    if (deleteModal) {
      setClickedItem(null);
    } else {
      setClickedItem(item);
    }

    setDeleteModal((prev) => !prev);
  };

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/gallary/get`)
      .then((response) => {
        setData(response.data.images);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="gallary-admin">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <div className="add-pic-gallary-btn" onClick={setAddModalFunc}>
        Add
      </div>
      <div className="gallary-home">
        {data.map((item) => {
          return (
            <div
            key={item._id}
              className="gallary-home-image-block img-admin"
              onClick={()=>setDeleteModalFunc(item)}
            >
              <img
                src={item.link}
                className="gallary-home-image"
              />
            </div>
          );
        })}
      </div>
      {addModal && <AddModal onClose={setAddModalFunc} />}
      {deleteModal && (
        <DeleteModal clickedItem={clickedItem} onClose={setDeleteModalFunc} />
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminGallary;
