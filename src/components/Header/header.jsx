import React, { useState, useEffect } from "react";
import "./header.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [eventpopup, setEventpopup] = useState(false);
  const [helpline, setHelpline] = useState(false);
  const [events, setEvents] = useState([]);

  const handleOpenPopup = (popup) => {
    if (popup === "event") {
      setEventpopup(true);
    } else {
      setHelpline(true);
    }
  };

  const fetchEvents = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/notification/get`)
      .then((response) => {
        console.log(response);
        setEvents(response.data.notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (eventpopup) {
      fetchEvents();
    }
  }, [eventpopup]);

  const handleClosePopup = (popup) => {
    if (popup === "event") {
      setEventpopup(false);
    } else {
      setHelpline(false);
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = async () => {
    props.showLoader();
    await axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        props.handleLogin(false);
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      });
    props.hideLoader();
  };

  return (
    <div className="header">
      <div className="header-college-details">
        <div className="header-college-details-left">
          <img
            className="header-college-details-left-logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJtJ4D6w4wSAXxqwL73vKa4yPqs38Hp3K3CecpruwWlddPgLlppTzc2U&s"
            alt="collegeLogo"
          />
          <div>
            <div className="header-college-details-name">
              वीर सुरेंद्र साई प्रौद्योगिकी विश्वविद्यालय
            </div>
            <div className="header-college-details-place">
              ବୀର ସୁରେନ୍ଦ୍ର ସାଏ ବୈଷୟିକ ବିଶ୍ୱବିଦ୍ୟାଳୟ
            </div>
            <div className="header-college-details-name">
              Veer Surendra Sai University of Technology{" "}
            </div>
            <div className="header-college-details-place">
              Burla, Sambalpur{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="header-college-details-right">
        <div className="header-college-social-media">
          <a
            target="_blank"
            href="https://www.linkedin.com/company/tnpvssut/?originalSubdomain=in"
          >
            <img
              src="data:image/png;base64,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"
              className="header-social-media-image"
            />
          </a>
          <a target="_blank" href="https://www.facebook.com/VSSUTofficial/">
            <img
              src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
              className="header-social-media-image"
            />
          </a>
          <a target="_blank" href="https://x.com/VSSUT_official/">
            <img
              src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png"
              className="header-social-media-image"
            />
          </a>
          <a target="_blank" href="https://www.instagram.com/vssut_official/">
            <img
              src="https://th.bing.com/th/id/OIP.0wjhvLpjGf_-r-1lqG3QAQHaHw?rs=1&pid=ImgDetMain"
              className="header-social-media-image"
            />
          </a>
        </div>
        
      </div>
      <div className="navbar">
        <Link
          to={"/"}
          className={`navbar-links ${
            location.pathname === "/" ? "active-link" : null
          }`}
        >
          Home
        </Link>
        <div
          onClick={props.isLogin ? handleLogout : handleLogin}
          to={"/login"}
          className={`navbar-links ${
            location.pathname === "/login" ? "active-link" : null
          }`}
        >
          {props.isLogin ? "Logout" : "Login"}
        </div>
        <Link
          to={"/stock"}
          className={`navbar-links ${
            location.pathname === "/stock" ? "active-link" : null
          }`}
        >
          Stock View
        </Link>
        <div
          className="navbar-links event-link"
          onMouseEnter={() => {
            handleOpenPopup("event");
          }}
          onMouseLeave={() => {
            handleClosePopup("event");
          }}
        >
          <div className="navbar-link-opt">
            New Events <ArrowDropDownIcon />
          </div>
          {eventpopup && (
            <div className="navbar-dropdown-popup event-pop">
              {events.map((item, index) => {
                return <div className="popup-notification">.{item.title}</div>;
              })}
            </div>
          )}
        </div>
        <div
          className="navbar-links event-link"
          onMouseEnter={() => {
            handleOpenPopup("helpline");
          }}
          onMouseLeave={() => {
            handleClosePopup("helpline");
          }}
        >
          <div className="navbar-link-opt">
            Helpline <ArrowDropDownIcon />
          </div>
          {helpline && (
            <div className="navbar-dropdown-popup helpline-pop">
              <div className="popup-notification">
                .Disaster management : 1007
              </div>
              <div className="popup-notification">.Emergency Call : 101</div>
            </div>
          )}
        </div>
      </div>
      {location.pathname === "/" && (
        <div className="header-banner">
          <img
            src={
              "https://media.licdn.com/dms/image/v2/D4D1BAQF1HoTzYid_gQ/company-background_10000/company-background_10000/0/1654928606616/vssutburlaalumni_cover?e=2147483647&v=beta&t=_aKm2iZF0cqgluS_hhjEiyboLh7IpDTj30-ILVL1E9g"
            }
            className="header-banner-image"
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
export default Header;
