import { useState, useCallback } from "react";

const UseSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signup = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Get CSRF token from cookies
      const csrfTokenMatch = document.cookie.match(/csrftoken=([^;]+)/);
      const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : "DUMMY_CSRF_TOKEN";

      console.log("Sending userData:", userData);
      const response = await fetch(
        "https://asmp.sarc-iitb.org/api/authentication/create-user/",
        // `http://127.0.0.1:8000/api/authentication/create-user/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          body: JSON.stringify(userData),
        }
      );

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (response.status === 201) {
        setSuccess(true);
        return { success: true };
      } else if (response.status === 400) {
        const message = responseData?.message || "User already exists. Please login.";
        setError(message);
        return { success: false, message };
      } else {
        const message = responseData?.detail || "Unknown error occurred.";
        setError(message);
        return { success: false, message };
      }

    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { signup, loading, error, success };
};

export default UseSignup;