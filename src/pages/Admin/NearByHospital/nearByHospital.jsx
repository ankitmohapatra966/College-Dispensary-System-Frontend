import React, { useState, useEffect } from "react";
import "./nearByHospital.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../../../components/Modal/modal";
import NearByModal from "./NearByModal/nearByModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const NearByHospital = (props) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);
  const onOFModal = () => {
    if (modal) {
      setClickedItem(null);
    }
    setModal(prev => !prev);
  };
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/hospital/get`)
      .then((response) => {
        setData(response.data.hospitals);
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
    let newArrr = data.filter((item) => item._id !== id);
    setData(newArrr);
  };

  const handleDelete = async (id) => {
    props.showLoader();
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/hospital/delete/${id}`,{withCredentials:true}).then((response)=>{
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
        <div>Near By Hospital</div>
        <div className="add-facility-btn" onClick={onOFModal}>
          Add
        </div>
      </div>
      <div className="admin-facility-rows">
        {data.map((item) => {
          return (
            <div className="admin-facility-row" key={item._id}>
              <div className="admin-facility-left">
                <div className="admin-facility-title">{item.name}</div>
                <div>
                  <div>Address: {item.address}</div>
                  <div>{item.contact}</div>
                </div>
                <div style={{ marginTop: "10px" }}> Added By: {item?.addedBy?.name}</div>
              </div>
              <div className="admin-facility-btns">
                <div onClick={()=>handleEdit(item)}>
                  <EditIcon />
                </div>
                <div onClick={()=>handleDelete(item._id)}>
                  <DeleteIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal
          header="Add NearBy Hospital"
          handleClose={onOFModal}
          children={<NearByModal clickedItem={clickedItem} showLoader={props.showLoader} hideLoader={props.hideLoader} onSuceess={fetchData}/>}
          
        />
      )}
      <ToastContainer/>
    </div>
  );
};

export default NearByHospital;
