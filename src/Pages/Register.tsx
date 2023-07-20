import { useState } from "react";
import { InputHelper } from "../Helper";

const Register = () => {
  const [loading, isLoading] = useState(false);
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

    return (
        <div className="container text-center">
        <form method="post">
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
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
        </form>
      </div>
    )
}

export default Register;