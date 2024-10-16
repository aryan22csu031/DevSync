import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  const user = useSelector((store) => store.user);
  return (
    <>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            💻DevSync
          </Link>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <div className="flex gap-3 items-center dropdown dropdown-end mr-4">
              <p>welcome, {user.firstName} !</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] top-14 w-[12rem] left-5 p-2 shadow-md shadow-black"
              >
                <li>
                  <Link to={"/user/feed"} className="justify-between">
                    Feed
                  </Link>
                </li>
                <li>
                  <Link to={"/user/connections"} className="justify-between">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to={"/user/requests"}>Requests</Link>
                </li>
                <li>
                  <Link to={"/user/profile"} className="justify-between">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/user/profile/edit"}>Edit Profile</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
