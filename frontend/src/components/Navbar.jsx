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
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-200 px-4 md:px-8">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          💻DevSync
        </Link>
      </div>

      {user && (
        <div className="flex items-center space-x-4">
          <p className="hidden sm:block text-sm md:text-base">
            Welcome, {user.firstName} :)
          </p>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              role="button"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.photoUrl}
                  className="object-cover"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow-md shadow-black w-48"
            >
              <li>
                <Link to="/user/feed">Feed</Link>
              </li>
              <li>
                <Link to="/user/connections">Connections</Link>
              </li>
              <li>
                <Link to="/user/requests">Requests</Link>
              </li>
              <li>
                <Link to="/user/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/user/profile/edit">Edit Profile</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
