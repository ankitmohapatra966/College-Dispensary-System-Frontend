import React, { useState, useEffect } from "react";
import "./fascility.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../../../components/Modal/modal";
import Fascilitymodal from "./FascilityModal/fascilityModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Fascility = (props) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);
  const onOFModal = () => {
    if (modal) {
      setClickedItem(null);
    }
    setModal((prev) => !prev);
  };
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/facility/get`)
      .then((response) => {
        setData(response.data.facility);
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

  const handleEdit = (item) => {
    setClickedItem(item);
    setModal(true);

  };

  const filterOutData = (id) => {
    let newArr = data.filter((item) => item._id !== id);
    setData(newArr);
  };
  const handlDelete = async (id) => {
    props.showLoader();
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/facility/delete/${id}`,{withCredentials:true}).then((response)=>{
      filterOutData(id)
    }).catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  return (
    <div className="admin-facility">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <div className="admin-facility-header">
        <div>Fascilities</div>
        <div className="add-facility-btn" onClick={onOFModal}>
          Add
        </div>
      </div>
      <div className="admin-facility-rows">
        {data.map((item) => {
          return (
            <div className="admin-facility-row">
              <div className="admin-facility-left">
                <div className="admin-facility-title">{item.title}</div>
                <div>
                  {item.description}
                </div>
                <div style={{ marginTop: "10px" }}> Added By:{item?.addedBy?.name}</div>
              </div>
              <div className="admin-facility-btns">
                <div onClick={()=>handleEdit(item)}>
                  <EditIcon />
                </div>
                <div onClick={()=>handlDelete(item._id)}>
                  <DeleteIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal
          header="Add Fascility"
          handleClose={onOFModal}
          children={<Fascilitymodal  clickedItem={clickedItem}/>}
          clickedItem={clickedItem}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Fascility;
