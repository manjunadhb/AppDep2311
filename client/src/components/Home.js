import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  let storeObj = useSelector((store) => {
    console.log(store);
    return store;
  });

  let deleteAccount = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", storeObj.userDetails.email);

    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };

    let JSONData = await fetch(
      "http://localhost:5678/deleteProfile",
      reqOptions
    );

    let JSOData = await JSONData.json();

    alert(JSOData.msg);
    if (JSOData.status == "success") {
      navigate("/");
    }

    console.log(JSOData);
  };

  return (
    <div>
      <TopNavigation />
      <h1>Home</h1>
      <h2>
        {`${storeObj.loginReducer.userDetails.firstName} 
        ${storeObj.loginReducer.userDetails.lastName}`}
      </h2>
      <img
        src={`http://localhost:5678/${storeObj.loginReducer.userDetails.profilePic}`}
      ></img>
      <button
        type="button"
        onClick={() => {
          deleteAccount();
        }}
      >
        Delete Account
      </button>
    </div>
  );
}

export default Home;
