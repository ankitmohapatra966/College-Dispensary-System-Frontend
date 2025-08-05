// import React, { useState, useEffect } from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Link } from "react-router-dom";
// import "./manageMedicine.css";
// import SearchBox from "../../../components/SearchBox/searchBox";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import Modal from "../../../components/Modal/modal";
// import MedicineModal from "./MedicineModal/medicineModal";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// const ManageMedicine = (props) => {
//   const [medicineSearch, setMedicineSearch] = useState("");
//   const [addModal, setAddModal] = useState(false);
//   const [clickedMedicine, setClickedMedicine] = useState(null);
//   const [data, setData] = useState([]);

//   const onOffModal = () => {
//     if(addModal){
//       setClickedMedicine(null)
//     }
//     setAddModal((prev) => !prev);
//   };

//   const onChangeValue = (value) => {
//     setMedicineSearch(value);
//   };

//   const fetchData = async () => {
//     props.showLoader();
//     await axios
//       .get(
//          `${import.meta.env.VITE_API_BASE_URL}/api/medicine/search-by-name?name=${medicineSearch}`
//       )
//       .then((response) => {
//         setData(response.data.medicines);
//       })
//       .catch((err) => {
//         toast.error(err?.response?.data?.error);
//       })
//       .finally(() => {
//         props.hideLoader();
//       });
//   };

//   const handleEdit = (item) => {
//     setClickedMedicine(item);
//     setAddModal(true);
//   };

//   const filterOutMedicine = (id) => {
//     let newArr = data.filter((item) => item._id !== id);
//     setData(newArr);
//   };

//   const handleDelete = async (id) => {
//     props.showLoader();
//     await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/medicine/delete/${id}`,{withCredentials:true}).then((response)=>{
//       filterOutMedicine(id)
//     }).catch((err) => {
//         toast.error(err?.response?.data?.error);
//       })
//       .finally(() => {
//         props.hideLoader();
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [medicineSearch]);
//   return (
//     <div className="manageMedicine">
//       <div className="go-back">
//         <Link to={"/admin/dashboard"}>
//           <ArrowBackIcon />
//           Back To Dashboard
//         </Link>
//       </div>
//       <div className="top-manage-medicine">
//         <SearchBox
//           value={medicineSearch}
//           onChange={onChangeValue}
//           placeholder="Search Medicine"
//         />
//         <div className="add-manage-medicine" onClick={onOffModal}>
//           Add
//         </div>
//       </div>
//       <div className="manageMedicine-card">
//         <div className="report-form-rows">
//           <div className="report-form-header">
//             <div>Sr. No.</div>
//             <div className="col-2-mng">Medicine Name</div>
//             <div className="col-2-mng">Added By</div>
//             <div className="col-3-mng">Quantity</div>
//             <div>Edit</div>
//             <div>Delete</div>
//           </div>
//           <div className="report-form-row-block">
//             {data.map((item,index) => {
//               return (
//                 <div className="report-form-row">
//                   <div>{index+1}</div>
//                   <div className="col-2-mng">{item.name}</div>
//                   <div className="col-2-mng">{item?.addedBy?.name}</div>

//                   <div className="col-3-mng">{item.quantity}</div>
//                   <div onClick={()=>handleEdit(item)} className="edit-icon">
//                     <EditIcon />
//                   </div>
//                   <div onClick={()=>handleDelete(item._id)} className="delete-icon">
//                     <DeleteIcon />
//                   </div>
//                 </div>
//               );
//             })}
//             {
//               data.length === 0 && <div className="report-form-row">
//               <div>No medicine Yet</div>
//             </div>
//             }
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//       {addModal && (
//         <Modal
//           header="Add Medicine"
//           handleClose={onOffModal}
//           children={<MedicineModal clickedMedicine={clickedMedicine} showLoader={props.showLoader} hideLoader={props.hideLoader} />}
//         />
//       )}
//     </div>
//   );
// };

// export default ManageMedicine;
import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import "./manageMedicine.css";
import SearchBox from "../../../components/SearchBox/searchBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../../components/Modal/modal";
import MedicineModal from "./MedicineModal/medicineModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ManageMedicine = (props) => {
  const [medicineSearch, setMedicineSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [clickedMedicine, setClickedMedicine] = useState(null);
  const [data, setData] = useState([]);

  const onOffModal = () => {
    if (addModal) setClickedMedicine(null);
    setAddModal((prev) => !prev);
  };

  const onChangeValue = (value) => {
    setMedicineSearch(value);
  };

  // 🔹 Fetch Medicines
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/medicine/search-by-name?name=${medicineSearch}`,
        { withCredentials: true }
      )
      .then((response) => {
        setData(response.data.medicines || []);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to fetch medicines");
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, [medicineSearch]);

  // 🔹 Edit
  const handleEdit = (item) => {
    setClickedMedicine(item);
    setAddModal(true);
  };

  // 🔹 Delete Medicine
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) return;

    props.showLoader();
    await axios
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/medicine/delete/${id}`,
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Medicine deleted successfully");
        setData((prev) => prev.filter((item) => item._id !== id)); // Remove from state
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to delete medicine");
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  return (
    <div className="manageMedicine">
      <div className="go-back">
        <Link to={"/admin/dashboard"}>
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>

      <div className="top-manage-medicine">
        <SearchBox
          value={medicineSearch}
          onChange={onChangeValue}
          placeholder="Search Medicine"
        />
        <div className="add-manage-medicine" onClick={onOffModal}>
          Add
        </div>
      </div>

      <div className="manageMedicine-card">
        <div className="report-form-rows">
          <div className="report-form-header">
            <div>Sr. No.</div>
            <div className="col-2-mng">Medicine Name</div>
            <div className="col-2-mng">Added By</div>
            <div className="col-3-mng">Quantity</div>
            <div>Edit</div>
            <div>Delete</div>
          </div>

          <div className="report-form-row-block">
            {data.map((item, index) => (
              <div className="report-form-row" key={item._id}>
                <div>{index + 1}</div>
                <div className="col-2-mng">{item.name}</div>
                <div className="col-2-mng">{item?.addedBy?.name || "Unknown"}</div>
                <div className="col-3-mng">{item.quantity}</div>
                <div onClick={() => handleEdit(item)} className="edit-icon">
                  <EditIcon />
                </div>
                <div onClick={() => handleDelete(item._id)} className="delete-icon">
                  <DeleteIcon />
                </div>
              </div>
            ))}

            {data.length === 0 && (
              <div className="report-form-row">
                <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                  No medicines yet
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />

      {addModal && (
        <Modal
          header={clickedMedicine ? "Edit Medicine" : "Add Medicine"}
          handleClose={onOffModal}
          children={
            <MedicineModal
              clickedMedicine={clickedMedicine}
              showLoader={props.showLoader}
              hideLoader={props.hideLoader}
              onSuccess={() => {
                onOffModal();
                fetchData();
              }}
            />
          }
        />
      )}
    </div>
  );
};

export default ManageMedicine;
