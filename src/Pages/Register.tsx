import React, { useState } from "react";
import { InputHelper, toastNotify } from "../Helper";
import { useRegisterUserMutation } from "../APIs/authAPI";
import { apiResponse } from "../Interfaces";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "customer",
    name: "",
  })

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempData = InputHelper(e, userInput);
    setUserInput(tempData);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLoading(true);
    const response : apiResponse = await registerUser({
      userName: userInput.userName,
      password: userInput.password,
      role: userInput.role,
      name: userInput.name,
    });
    if(response.data){
      toastNotify("Account created successfully! Please login to continue.")
      navigate("/Login");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }



    isLoading(false);
  }

    return (
        <div className="container text-center">
          {loading && <MainLoader />}
        <form method="post" onSubmit={handleSubmit}>
          <h1 className="mt-5">Register</h1>
          <div className="mt-5">
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                required
                value={userInput.userName}
                onChange={handleUserInput}
                name="userName"
              />
            </div>
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                required
                value={userInput.name}
                onChange={handleUserInput}
                name="name"
              />
            </div>
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                required
                value={userInput.password}
                onChange={handleUserInput}
                name="password"
              />
            </div>
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-success" disabled={loading}>
              Register
            </button>
          </div>
        </form>
      </div>
    )
}

export default Register;