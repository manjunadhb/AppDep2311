import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    //validateToken();
  }, []);

  let validateToken = async () => {
    if (localStorage.getItem("token")) {
      let dataToSend = new FormData();
      dataToSend.append("token", localStorage.getItem("token"));

      let reqOptions = {
        method: "POST",
        body: dataToSend,
      };

      let JSONData = await fetch(
        "http://localhost:5678/loginWithToken",
        reqOptions
      );

      let JSOData = await JSONData.json();

      if (JSOData.status == "success") {
        dispatch({ type: "login", data: JSOData.data });
        navigate("/home");
      } else {
        alert(JSOData.msg);
      }

      console.log(JSOData);
    }
  };

  let validateLogin2 = () => {
    return async () => {
      let dataToSend = new FormData();
      dataToSend.append("email", emailInputRef.current.value);

      dataToSend.append("password", passwordInputRef.current.value);

      let reqOptions = {
        method: "POST",
        body: dataToSend,
      };

      let JSONData = await fetch("http://localhost:5678/login", reqOptions);

      let JSOData = await JSONData.json();

      if (JSOData.status == "success") {
        localStorage.setItem("token", JSOData.data.token);

        dispatch({ type: "login", data: JSOData.data });
        navigate("/home");
      } else {
        alert(JSOData.msg);
      }

      console.log(JSOData);
    };
  };

  let validateLogin = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);

    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:5678/login", reqOptions);

    let JSOData = await JSONData.json();

    if (JSOData.status == "success") {
      localStorage.setItem("token", JSOData.data.token);

      dispatch({ type: "login", data: JSOData.data });
      navigate("/home");
    } else {
      alert(JSOData.msg);
    }

    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              //validateLogin();
              dispatch(validateLogin2());
            }}
          >
            Login
          </button>
        </div>
      </form>
      <br></br>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
