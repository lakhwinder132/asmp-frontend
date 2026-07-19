import React, { useState, useEffect } from "react";
import Wishlist_Mentor from "./Wishlist_Mentor";
import CursorAnimation from "../CursorAnimation";
import "./Wishlist.css";
import { gsap } from "gsap";
import Swal from "sweetalert2";
import UseFetchWishlist from "../../hooks/useFetchWishlist";
import UseRegisterMentors from "../../hooks/useRegisterMentors";
import UseDeleteFromWishlist from "../../hooks/useDeleteFromWishlist";
import styled from "styled-components";
import "./Card.css";
import Wishlist_MentorCard from "./Wishlist_MentorCards";
import { Link } from "react-router-dom";

export default function Wishlist(props) {
  const { fetchMentors, setError, loading, error, mentors, setMentors } = UseFetchWishlist();
  const { deleteMentor } = UseDeleteFromWishlist();
  const {
    registerMentors,
    error: registerError,
    success,
  } = UseRegisterMentors(props);


  const styles = {
    "@media (max-width: 768px)": {
      formContainer: {
        width: "90%",
        padding: "10px",
      },
      profilelabel: {
        flexBasis: "100%",
        marginBottom: "5px",
      },
      profileinput: {
        width: "100%",
      },
      textarea: {
        width: "100%",
      },
      submitButton: {
        width: "100%",
      },
    },

    profileformArea: {
      backgroundColor: "#000",
      color: "white",
      fontFamily: "'Source Sans Pro', 'Roboto', sans-serif",
      textAlign: "center",
      padding: "20px",
      width: "100vw",
    },
    formContainer: {
      margin: "0 7%",
      marginleft: "10px !important",
      padding: "20px",
      width: "80%",
      backgroundColor: "#000",
      borderRadius: "20px",
    },
    headingContainer: {
      textAlign: "center",
      marginBottom: "20px",
      backgroundColor: "#3D52D5",
      boxShadow: "0px 0px 3px 7px #FFF",
      borderRadius: "10vw",
      margin: "10vh 37vw",
      fontSize: "32px",
      padding: "10px",
      width: "300px",
    },
    profHead: {
      textDecoration: "none", // Remove underline from the text itself
    },
    constituents: {
      display: "flex", // Use flex to place label and input on the same line
      alignItems: "center", // Vertically center the content
      margin: "5px 0", // Add space between label and input field
      width: "100%",
    },
    profilelabel: {
      flexBasis: "30%", // Adjust the label width as needed
      marginRight: "10px",
      color: "#fff",
      fontSize: "20px",
    },
    input: {
      flexBasis: "70%", // Adjust the input width as needed
      border: "none",
      borderBottom: "1px solid #ccc",
      padding: "5px",
      borderRadius: "1rem",
      outline: "none",
      backgroundColor: "#BDD4E7",
      color: "#000",
      fontSize: "20px",
    },
    textarea: {
      width: "100%",
      border: "none",
      borderBottom: "1px solid #ccc",
      padding: "10px",
      borderRadius: "2rem",
      outline: "none",
      backgroundColor: "#BDD4E7",
      height: "150px",
    },
    textCenter: {
      textAlign: "center",
      marginBottom: "20px",
    },
    submitButton: {
      margin: "10px",
      width: "fit-content",
      textAlign: "center",
      padding: "1%",
      fontFamily: "Fraunces, serif",
      fontSize: "2vw",
      color: "white",
      background: "#A742A4",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.67)",
      backdropFilter: "blur(3px)",
      WebkitBackdropFilter: "blur(9px)",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "17px",
      lineHeight: "1.2",
    },
  };



  async function deleteFromWishlist(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this mentor from wishlist",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMentor(id);
        const newMentors = [...mentors];
        let something = newMentors.filter((mentor) => mentor.id == id)[0];
        newMentors.splice(newMentors.indexOf(something), 1);
        setMentors(newMentors);
        Swal.fire(
          "Removed!",
          "Mentor has been removed from wishlist, please refresh this page.",
          "success"
        );
      }
    });
  }

  useEffect(() => {
    const checkMentors = async () => {
      await fetchMentors();
    };
    checkMentors();
  }, [fetchMentors]);

  return (
    <>
      <CursorAnimation />
      <div className="wishlist-background-image">
        <div style={{ height: "10vh" }}></div>
        <div className="wishlist-headings-1">Wishlist</div>

        <div>
          {mentors && mentors.length > 0 ? (
            mentors.map((mentor, index) => (
              <div className="wishlist-mentor-cards-ka-div">
                <Wishlist_MentorCard key={mentor.id} mentor={mentor} />
              </div>
            ))
          ) : (
            <p
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                fontFamily: "Fraunces, serif",
                fontSize: "4vw",
                lineHeight: "1.2",
                color: "white",
              }}
            >
              No mentors in the wishlist
            </p>
          )}
        </div>
       
        <div style={styles.textCenter}>
          <Link to="/profile">
            <button className="submit-button" style={{...styles.submitButton, fontSize: "3vw"}}>
            Proceed to Register
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
