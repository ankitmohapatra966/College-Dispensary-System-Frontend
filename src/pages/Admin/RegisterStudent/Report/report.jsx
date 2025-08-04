import React, { useState, useEffect } from "react";
import "./report.css";
import SearchBox from "../../../../components/SearchBox/searchBox";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Report = (props) => {
  const [searchMedicineName, setSearchMedicineName] = useState("");
  const [data, setData] = useState([]);
  const [dropdown, setDropDown] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const onChange = (value) => {
    setSearchMedicineName(value);
  };
  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(
        `${BASE_URL}/api/medicine/search-by-name?name=${searchMedicineName}`
      )
      .then((response) => {
        setData(response.data.medicines);
        setDropDown(true);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
        setDropDown(false);
      });
    props.hideLoader();
  };
  useEffect(() => {
    fetchData();
  }, [searchMedicineName]);

  const addMedicine = (item) => {
    let exist = 0;
    selectedMedicine.map((it) => {
      if (item._id === it._id) {
        exist = 1;
      }
    });
    item = { ...item, requiredQuantity: "" };
    if (exist === 0) setSelectedMedicine([...selectedMedicine, item]);
    setSearchMedicineName("");
    setDropDown(false);
  };
  const onChangeHandle = (event, ind) => {
    const arr = selectedMedicine.map((item, index) => {
      if(index===ind){
        if(parseInt(item.quantity) < parseInt(event.target.value)){
          toast.error("You have donot that much medicine in store")
          return {...item}
        }
        return {...item,requiredQuantity:event.target.value}
      }
      return {...item}
    });
    
    setSelectedMedicine(arr);
  };
  const handleDelete = (item) => {
    let arr = selectedMedicine.filter((it) => item !== it._id);
    setSelectedMedicine(arr);
  };

  const checkInputInValid = () => {
    let invalid = false;
    selectedMedicine.map((item) => {
      if (item.requiredQuantity.trim().length === 0) {
        invalid = true;
      }
    });
    return invalid;
  };
  const handleOnSubmit = async () => {
    if (selectedMedicine.length === 0)
      return toast.error("Please select any medicine.");
    if (checkInputInValid()) return toast.error("Please enter all the fields.");
    await axios.post(`${BASE_URL}/api/history/add`,{roll:props.studentDetail.roll,student:props.studentDetail._id,medicines:selectedMedicine},{withCredentials:true}).then((response)=>{
      toast.success(response.data.message)
      setTimeout(()=>{
        props.handleCloseModal()
      },1000)
    }).catch((err) => {
            toast.error(err?.response?.data?.error);
          })
  };

  return (
    <div className="report-register">
      <div className="medicine-suggestion-block">
        <SearchBox
          value={searchMedicineName}
          onChange={onChange}
          placeholder="Search Medicine"
        />
        {dropdown && searchMedicineName.trim().length !== 0 && (
          <div className="report-dropdown">
            {data.map((item) => {
              return (
                <div
                  className="report-medicine-dropdown"
                  onClick={() => addMedicine(item)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="report-form-rows">
        <div className="report-form-header">
          <div className="col-1-rm">Medicine Name</div>
          <div className="col-2-rm">Quantity Left</div>
          <div className="col-3-rm">Required Quantity</div>
          <div className="col-4-rm">Delete</div>
        </div>
        <div className="report-form-row-block">
          {selectedMedicine.map((item, index) => {
            return (
              <div className="report-form-row">
                <div className="col-1-rm">{item.name}</div>
                <div className="col-2-rm">{item.quantity}</div>
                <div className="col-3-rm">
                  <input value={selectedMedicine[index].requiredQuantity} onChange={(event) =>onChangeHandle(event,index)} type="number" className="input-table" />
                </div>
                <div className="delete-icon col-4-rm" onClick={()=>handleDelete(item._id)}>
                  <DeleteIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="modal-submit" onClick={handleOnSubmit}>Submit</div>
      <ToastContainer />
    </div>
  );
};

export default Report;
