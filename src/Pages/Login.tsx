import { useState } from "react";
import { InputHelper } from "../Helper";
import { apiResponse, userModel } from "../Interfaces";
import { useLoginUserMutation } from "../APIs/authAPI";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../Storage/Redux/authSlice";
import { MainLoader } from "../Components/Page/Common";

const Login = () => {
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const [loading, isLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(e, userInput);
    setUserInput(tempData);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLoading(true);
    const response : apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });
    if(response.data){

      const {token} = response.data.result;
      const {fullName, id, email, role} : userModel = jwt_decode(token);
      localStorage.setItem("token", token)
      dispatch(setLoggedInUser({
        fullName, 
        id, 
        email, 
        role,
      }))

      navigate("/");
    } else if (response.error) {
      isLoading(false);
      setError(response.error.data.errorMessages[0]);
    }
  }

    return (
        <div className="container text-center">
          {loading && <MainLoader />}
        <form method="post" onSubmit={handleSubmit}>
          <h1 className="mt-5">Login</h1>
          <div className="mt-5">
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                required
                name="userName"
                value={userInput.userName}
                onChange={handleUserInput}
              />
            </div>
  
            <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                required
                name="password"
                value={userInput.password}
                onChange={handleUserInput}
              />
            </div>
          </div>
  
          <div className="mt-2">
            {error && <p className="text-danger">{error}</p>}
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "200px" }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    )
}

export default Login;