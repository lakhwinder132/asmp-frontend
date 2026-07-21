import React, { useState } from "react";
import "../styles/Login.css";
import { Navigate } from "react-router-dom";
import UseLogin from "../hooks/useLogin";
import logo from "../assets/images/mk.png";
import loginButtonBg from "../assets/images/loginbuttonbg.png";
import loginbutton from "../assets/images/loginbutton.png";
import CursorAnimation from "./CursorAnimation";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const customSwalStyles = `
  .swal2-popup {
    background: #1a1a1a !important;
    border: 2px solid #83267E !important;
    border-radius: 15px !important;
  }
  .swal2-title {
    color: #9a2e94 !important;
    font-family: 'Fraunces', serif !important;
    font-size: 1.5rem !important;
  }
  .swal2-html-container {
    color: #ffffff !important;
    font-family: 'Fraunces', serif !important;
  }
  .swal2-confirm {
    background: #83267E !important;
    border: none !important;
    border-radius: 8px !important;
    font-family: 'Fraunces', serif !important;
    font-weight: bold !important;
    padding: 12px 24px !important;
  }
  .swal2-confirm:hover {
    background: #9a2e94 !important;
    transform: translateY(-2px) !important;
    transition: all 0.3s ease !important;
  }
  .swal2-icon {
    border-color: #83267E !important;
  }
  .swal2-icon.swal2-error {
    border-color: #83267E !important;
  }
  .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {
    background-color: #83267E !important;
  }
`;

// Inject custom styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = customSwalStyles;
  document.head.appendChild(styleElement);
}

function Login() {
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const allFieldsFilled = () => {
    return password !== "" && emailId !== "";
  };

  const { Login, error, setError, success, loading } = UseLogin();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };
  const handleEmailIdChange = (event) => {
    setEmailId(event.target.value);
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Validate LDAP ID format
    const trimmedEmail = emailId.trim();
    
    if (!trimmedEmail) {
      Swal.fire({
        icon: "error",
        title: "LDAP ID Required",
        text: "Please enter your LDAP ID to proceed with login",
        confirmButtonColor: "#83267E",
        confirmButtonText: "Got it!",
      });
      return;
    }
    
    if (!trimmedEmail.includes("@iitb.ac.in")) {
      Swal.fire({
        icon: "error",
        title: "Invalid LDAP ID Format",
        html: `
          <div style="text-align: left; padding: 10px;">
            <p style="margin-top: 15px; color: #b366ad;">Please add "@iitb.ac.in" to your LDAP ID and try again.</p>
          </div>
        `,
        confirmButtonColor: "#83267E",
        confirmButtonText: "I understand",
        width: "500px",
      });
      return;
    }
    
    // Additional validation: check if it's just "@iitb.ac.in" without username
    if (trimmedEmail === "@iitb.ac.in" || trimmedEmail.startsWith("@")) {
      Swal.fire({
        icon: "error",
        title: "Invalid LDAP ID",
        text: "Please enter your complete LDAP ID including your username/roll number before @iitb.ac.in",
        confirmButtonColor: "#83267E",
        confirmButtonText: "Got it!",
      });
      return;
    }

    const userData = {
      ldap: trimmedEmail.toLowerCase(),
      password: password.trim(),
    };

    Login(userData);
  };

  const inputStyle = ["input2"];
  const buttonStyle = ["button"];
  const disabledButtonStyle = ["button", "button-disabled"];
  const [hover,sethover]=useState(false);

  return localStorage.getItem("accessToken") !== null ? (
    <Navigate to="/toggle" />
  ) : (
    <>
      <CursorAnimation />
      <div className="form-container">
        <div className="image-containerr">
          <img src={logo} alt="Logo" className="logoo" />
        </div>
        <input
          type="text"
          placeholder="LDAP ID (rollnumber@iitb.ac.in)"
          value={emailId}
          onChange={handleEmailIdChange}
          className={inputStyle.join(" ")}
        />
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={inputStyle.join(" ")}
          />
          <span
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        <div style={{ color: "white" }}>{error}</div>
        <button
          onMouseEnter={() => sethover(true)}
          onMouseLeave={() => sethover(false)}
          style={{ fontFamily: "Fraunces" ,backgroundImage: hover ?`url(${loginButtonBg})`:"none"}}
          onClick={handleLogin}
          className={
            allFieldsFilled()
              ? buttonStyle.join(" ")
              : disabledButtonStyle.join(" ")
          }
          disabled={!allFieldsFilled()}
        >
          {hover ? "":"login"}
        </button>
        <div
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "medium",
            fontFamily: "Fraunces",
          }}
        >
          New User?{" "}
          <a
            href="/register"
            style={{
              color: "white", // hot pink
              textDecoration: "underline"
            }}
          >
            Register here
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
