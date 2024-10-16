import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });

      dispatch(addUser(user.data.user));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
