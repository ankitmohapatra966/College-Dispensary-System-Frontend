import { useState } from 'react'
import './App.css'
import Header from './components/Header/header'
import { Route, Routes ,Navigate } from 'react-router-dom'
import Home from './pages/Home/home';
import Footer from './components/Footer/footer';
import Login from './pages/Login/login';
import Stock from './pages/Stock/stock';
import AdminDashboard from './pages/Admin/Dashboard/adminDashboard';
import RegisterStudent from './pages/Admin/RegisterStudent/registerStudent';
import ManageMedicine from './pages/Admin/ManageMedicine/manageMedicine';
import Record from './pages/Admin/Records/record';
import Fascility from './pages/Admin/Fascility/fascility';
import NearByHospital from './pages/Admin/NearByHospital/nearByHospital';
import AdminGallary from './pages/Admin/Gallary/adminGallary';
import StudentDashboard from './pages/Student/studentDashboard';
import GlobalLoader from './components/GlobalLoader/globalLoader';

function App() {

   const [loader, setLoader] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  let role = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).role : null;
  let id = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo"))._id : null;

  const handleLogin = (value) => {
    setIsLogin(value)
  }

  const showLoader = () => {
    setLoader(true);
  }
  const hideLoader = () => {
    setLoader(false);
  }
  return (
    <div className='App'>
      <Header isLogin={isLogin} showLoader={showLoader} hideLoader={hideLoader} handleLogin={handleLogin}/>
      <Routes>
        <Route path='/' element={<Home showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path='/login' element={isLogin? role==="student"? <Navigate to={`/student/${id}`}/>:<Navigate to={'/admin/dashboard'}/> :<Login  handleLogin={handleLogin} showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path='/stock' element={<Stock showLoader={showLoader} hideLoader={hideLoader} />} />
        <Route path='/admin/dashboard' element={isLogin && role !== "student" ? <AdminDashboard showLoader={showLoader} hideLoader={hideLoader}/> :<Navigate to="/" />}  />
        <Route path='/admin/register-student' element={ isLogin && role !== "student" ? <RegisterStudent showLoader={showLoader} hideLoader={hideLoader}/> :<Navigate to="/" />}/>
        <Route path='/admin/manage-medicine' element={isLogin && role !== "student" ? <ManageMedicine showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/" />}/>
        <Route path='/admin/record' element={isLogin && role !== "student" ? <Record showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/" />}/>
        <Route path='/admin/fascility' element={isLogin && role !== "student" ? <Fascility showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/" />}/>
        <Route path='/admin/nearByHospital' element={isLogin && role !== "student" ? <NearByHospital showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/" />}/>
        <Route path='/admin/gallary' element={isLogin && role !== "student" ? <AdminGallary showLoader={showLoader} hideLoader={hideLoader}/>:<Navigate to="/" />}/>

        <Route path='/student/:id' element={isLogin && role==="student" ? <StudentDashboard showLoader={showLoader} hideLoader={hideLoader}/> :<Navigate to="/" />} />
      </Routes>
      <Footer />

     { loader && <GlobalLoader /> }
    </div>
  )
}

export default App
