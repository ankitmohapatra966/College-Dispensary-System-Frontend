import React,{useState,useEffect} from 'react'
import './nearByHospitals.css'
import TableComp from '../Table/tableComp'
import axios from 'axios'
const NearByHospitals = (props) => {
  const hospitalheaders = ["sn No.","Name","Address","Contact"]
  const [rowData,setRowData] = useState([]);

  const getFormattedData = (data) =>{
    let newarr = data.map((item,ind)=>{
      return {srNo:ind+1,name:item.name,address:item.address,contact:item.contact}
    })
    setRowData(newarr)
  }

   useEffect(()=>{
    const fetchData = async()=>{
      props.showLoader();
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/hospital/get`).then((response)=>{
        getFormattedData(response.data.hospitals)
      }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      props.hideLoader();
    })
    }
      fetchData();
    },[])
  return (
    <div>
      <TableComp header={hospitalheaders} data={rowData} />
    </div>
  )
}

export default NearByHospitals
