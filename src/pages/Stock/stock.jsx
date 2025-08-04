import React, { useState, useEffect } from "react";
import "./stock.css";
import SearchBox from "../../components/SearchBox/searchBox";
import TableComp from "../../components/Table/tableComp";
import axios from "axios";
const Stock = (props) => {
  const [medicineName, setMedicineName] = useState("");
  const [stocks, setStocks] = useState([]);

  const getFormattedData = (data) => {
    let newarr = data.map((item, ind) => {
      return {
        srNo: ind + 1,
        name: item.name,
        quantity: item.quantity,
        usage: item.usage,
      };
    });
    setStocks(newarr);
  };
  const handleInputChange = (value) => {
    setMedicineName(value);
  };
  const headers = ["Sr No", "Name", "Quantity", "Usage"];

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/medicine/search-by-name?name=${medicineName}`
      )
      .then((response) => {
        if (response.data.medicines.length === 0) {
          setStocks([]);
        } else {
          getFormattedData(response.data.medicines);
        }
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
  }, [medicineName]);
  return (
    <div className="stock-page">
      <SearchBox
        placeholder="Search Medicine"
        value={medicineName}
        onChange={handleInputChange}
      />
      <div className="stock-page-card">
        <TableComp header={headers} data={stocks} />
      </div>
    </div>
  );
};

export default Stock;
