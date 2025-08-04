import React, { useState, useEffect } from "react";
import "./manageEvent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const ManageEvent = (props) => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/notification/get`)
      .then((response) => {
        console.log(response);
        setData(response.data.notifications);
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

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (title.trim().length === 0) return toast.error("Please Enter Title");
    props.showLoader();
    await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/notification/add`,{title},{withCredentials:true}).then((response)=>{
        
        setData([response.data.notification,...data])
        setTitle("")
    }).catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };
  const filterOutEvent = (id) => {
    let newArr = data.filter((item) => item._id !== id);
    setData(newArr);
  };

  const handleDeleteEvent = async (id) => {
    props.showLoader();
    await axios.delete( `${import.meta.env.VITE_API_BASE_URL}/api/notification/delete/${id}`,{withCredentials:true}).then((response)=>{
        filterOutEvent(id)
    }).catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });

  };
  return (
    <div className="add-staffs-box">
      <form onSubmit={handleSubmitEvent} className="register-form">
        <div className="register-form-div">
          <div className="">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              className="input-box-register mngEventInp"
              placeholder="Add Events"
            />
          </div>
        </div>
        <button type="submit" className="form-btn reg-btn">
          Add
        </button>
      </form>
      <div className="list-staffs">
        {data.map((item, index) => {
          return (
            <div className="list-staff" key={index}>
              <div>{item.title.slice(0, 60)}...</div>
              <div className="list-staff-btns">
                <div onClick={()=>handleDeleteEvent(item._id)} style={{ cursor: "pointer" }}>
                  <DeleteIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageEvent;
