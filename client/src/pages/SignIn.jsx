import React, { useState } from "react";
import axios from "axios"; // Import axios
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SignIn({ onSignIn }) {
  const navigate = useNavigate(); // Initialize the navigate function
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      // Make a POST request to your server for authentication
      const response = await axios.post(
        "http://localhost:3100/login",
        formData
      );

      // Check if authentication was successful
      if (response.status === 200) {
        // Simulated successful sign-in (replace with actual logic)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem(
          "permissions",
          JSON.stringify(response.data.user.permissions)
        );

        // Call the onSignIn function to indicate successful sign-in
        onSignIn();

        // Use navigate function to navigate to the dashboard or another page
        navigate("/dashboard");

        // Reset the form 
        setFormData({
          username: "",
          password: "",
        });


      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };
  return (
    <div className="main p-2 py-3 p-xl-5 ">
      {/* Body: Body */}
      <div className="body d-flex p-0 p-xl-5">
        <div className="container-xxl">
          <div className="row g-0">
            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
              <div style={{ maxWidth: "25rem" }}>
                <div className="text-center mb-5">
                  <i
                    className="icofont-heart-beat secondary-color"
                    style={{ fontSize: "90px" }}
                  />
                </div>
                <div className="mb-5">
                  <h2 className="color-900 text-center">
                    Medisys, We aim to make your life better
                  </h2>
                </div>
                {/* Image block */}
                <div className>
                  <img src="../assets/images/login-img.svg" alt="login-img" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
              <div
                className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
                style={{ maxWidth: "32rem" }}
              >
                {/* Form */}
                <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit}>
                  <div className="col-12 text-center mb-5">
                    <h1>Sign in</h1>
                    <span>Welcome to Medisys</span>
                  </div>
                  <div className="col-12">
                    <div className="mb-2">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="admin"
                        onChange={handleInputChange}
                        name="username"
                        value={formData.username}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-2">
                      <div className="form-label">
                        <span className="d-flex justify-content-between align-items-center">
                          Password
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="***************"
                        onChange={handleInputChange}
                        name="password"
                        value={formData.password}
                      />
                    </div>
                  </div>
                  <div className="col-12 text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-lg btn-block btn-light lift text-uppercase"
                      atl="signin"
                    >
                      SIGN IN
                    </button>
                  </div>
                </form>
                {/* End Form */}
                <ToastContainer position="top-right" autoClose={3000} />
              </div>
            </div>
          </div>{" "}
          {/* End Row */}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
