import React,{useState,useEffect} from 'react'
import './fascility.css'
import axios from 'axios'
function Fascility(props) {

  const [data,setData] = useState([]);

  const fetchData = async()=>{
    props.showLoader();
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/facility/get`).then((response)=>{

      setData(response.data.facility)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      props.hideLoader();
    })
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div className='fascility'>
    <div className="fascility-header">
    List of fascilities at VSSUT,Burla Health Center;
    </div>
    <div className="fascility-lists">

    {
      data.map((item,index)=>{
        return(
          <div className="fascility-list">
        <div className="fascility-list-header">{item.title}</div>
        <p className="fascility-list-value">{item.description}</p>
      </div>
        )
      })
    }

    </div>
    </div>
  )
}

export default Fascility
