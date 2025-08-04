import React, { useState, useEffect } from "react";
import "./manageStaff.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const ManageStaff = (props) => {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    mobileNo: "",
  });
  const [staffs, setStaffs] = useState([]);
  const [clickedStaff, setClickedStaff] = useState(null);

  const handleOnChange = (event, key) => {
    setInputField({ ...inputField, [key]: event.target.value });
  };
  const handleOnEditBtn = async (item) => {
    setClickedStaff(item);
    setInputField({ ...inputField, ...item });
  };

  const handleUpdate = async () => {
    await axios
      .put(
         `${import.meta.env.VITE_API_BASE_URL}/api/auth/update-staff/${clickedStaff?._id}`,
        inputField,
        { withCredentials: true }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      });
  };
  const filterOutData = (id) => {
    let newArr = staffs.filter((item) => item?._id !== id);
    setStaffs(newArr);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/auth/delete-staff/${id}`,{withCredentials:true}).then((response) =>{
        filterOutData(id)
    }).catch((err) => {
        toast.error(err?.response?.data?.error);
      })
  };
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/get-staff`)
      .then((response) => {
        setStaffs(response.data.staffs);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        props.hideLoader();
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddStaff = async (e) => {
    e.preventDefault();

    if (clickedStaff) {
      handleUpdate();
      return;
    }

    if (
      inputField.name.trim().length === 0 ||
      inputField.email.trim().length === 0 ||
      inputField.password.trim().length === 0 ||
      inputField.designation.trim().length === 0 ||
      inputField.mobileNo.trim().length === 0
    )
      return toast.error("Please fill all the details.");
    props.showLoader();
    await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/add-staff`, inputField, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        setStaffs([inputField, ...staffs]);
        setInputField({
          name: "",
          email: "",
          password: "",
          designation: "",
          mobileNo: "",
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };
  return (
    <div className="add-staffs-box">
      <form className="register-form">
        <div className="register-form-div">
          <div className="register-input-box">
            <input
              value={inputField.name}
              onChange={(event) => handleOnChange(event, "name")}
              type="text"
              className="input-box-register"
              placeholder="Staff Name"
            />
          </div>
          <div className="register-input-box">
            <input
              value={inputField.email}
              disabled={clickedStaff}
              onChange={(event) => handleOnChange(event, "email")}
              type="text"
              className="input-box-register"
              placeholder="Email Id"
            />
          </div>
          {!clickedStaff && (
            <div className="register-input-box">
              <input
                value={inputField.password}
                onChange={(event) => handleOnChange(event, "password")}
                type="text"
                className="input-box-register"
                placeholder="Password"
              />
            </div>
          )}
          <div className="register-input-box">
            <input
              value={inputField.designation}
              onChange={(event) => handleOnChange(event, "designation")}
              type="text"
              className="input-box-register"
              placeholder="Designation"
            />
          </div>
          <div className="register-input-box">
            <input
              value={inputField.mobileNo}
              onChange={(event) => handleOnChange(event, "mobileNo")}
              type="text"
              className="input-box-register"
              placeholder="Mobile No."
            />
          </div>
        </div>
        <button
          type="submit"
          className="form-btn reg-btn"
          onClick={handleAddStaff}
        >
          {!clickedStaff ? "Add" : "Update"}
        </button>
      </form>
      <div className="list-staffs">
        {staffs.map((item, index) => {
          return (
            <div className="list-staff">
              <div>{item.name}</div>
              <div className="list-staff-btns">
                <div
                  onClick={() => handleOnEditBtn(item)}
                  style={{ cursor: "pointer" }}
                >
                  <EditIcon />
                </div>
                <div onClick={()=>handleDelete(item._id)} style={{ cursor: "pointer" }}>
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

export default ManageStaff;
