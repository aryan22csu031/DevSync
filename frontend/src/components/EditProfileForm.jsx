import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const EditProfileForm = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setSkills(user.skills || "");
      setPhotoUrl(user.photoUrl || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    const data = { firstName, lastName, age, gender, about, skills, photoUrl };

    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", data, {
        withCredentials: true,
      });

      setTimeout(() => {
        dispatch(addUser(res.data.user));
        toast.success("Profile updated successfully !");
        return navigate("/");
      }, 2000);
    } catch (err) {
      toast.error("something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-around p-4 w-full items-center">
      <div className="flex flex-col items-center m-10">
        <div className="card bg-base-300 w-[30rem] shadow-xl">
          <div className="flex flex-col card-body">
          <ToastContainer />
            <h2 className="card-title mb-12 text-4xl self-center">
              Edit Profile
            </h2>
            <img
              src={photoUrl || "default_image_url"}
              className=" rounded-full w-40 h-40 self-center p-4"
              alt="Display"
            />
            <h1>Display Photo</h1>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-primary w-full max-w-xs mb-4"
            />
            <h1>First Name</h1>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-primary w-full max-w-xs mb-4"
            />
            <h1>Last Name</h1>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <h1>Age</h1>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-primary w-full max-w-xs mb-4"
            />
            <h1>Gender</h1>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input input-primary w-full max-w-xs mb-4"
            />
            <h1>About</h1>
            <textarea
              className="w-full h-[10rem] bg-base-200 p-2"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
            <h1>Skills</h1>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="input input-primary w-full max-w-xs mb-4"
            />
            <div className="card-actions flex flex-col justify-end items-end">
              <button className="btn btn-success m-2" onClick={handleUpdate}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
