
/* eslint-disable react/prop-types */

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const FeedCard = ({ data }) => {
  const [cards, setCards] = useState(data);
  const handleInterested = async (id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/interested/${id}`,
        {},
        { withCredentials: true }
      );

      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleIgnore = async (id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/ignored/${id}`,
        {},
        { withCredentials: true }
      );

      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if(cards.length ===0) {
    return (
      <>
        <h1 className="text-center text-2xl">No more developers around <br />come again later :)</h1>
      </>
    )
  }

  return (
    <div className="w-[18rem]">
      {cards.map((d) => {
        
        return (
        
        <div key={d._id}>
          <div className="card bg-base-300 w-72 p-2 fixed self-center h-[32rem]">
            <figure>
              <img src={d.photoUrl} alt="avatar" className="w-full bg-contain" />
            </figure>
            <div className="card-body flex flex-col gap-4 items-center text-center">
              <h2 className="card-title">
                {d.firstName} {d.lastName}
              </h2>
              <p>
                {d.gender}, {d.age} years old
              </p>
              <p className="w-full">{d.about}</p>
              <p>Skills: {d.skills.join(", ")}</p>
              <div className="card-actions flex justify-evenly w-full">
                <button
                  className="btn bg-red-600 text-black hover:bg-red-700 hover:text-white"
                  onClick={() => handleIgnore(d._id)}
                >
                  Ignore
                </button>
                <button
                  className="btn bg-green-600 text-black hover:bg-green-700 hover:text-white"
                  onClick={() => handleInterested(d._id)}
                >
                  Interested
                </button>
              </div>
            </div>
          </div>
        </div>
      )})}
    </div>
  );
};

export default FeedCard;
