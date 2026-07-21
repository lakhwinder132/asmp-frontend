import React, { useState, useEffect } from "react";
import "./Wishlist/Wishlist_MentorCards.css";
import Swal from "sweetalert2";
import UseAddToWishlist from "../hooks/useAddToWishlist";
import UseDeleteFromWishlist from "../hooks/useDeleteFromWishlist";
import UseFetchWishlist from "../hooks/useFetchWishlist";
import batmanLogoImg from "../Images/Batman.png";
import companyNameSvg from "../assets/images/Company Name.svg";
import subtractSvg from "../assets/images/Subtract.svg";
import rectangle47Svg from "../assets/images/Rectangle 47.svg";
import batmanLogoSvg from "../assets/images/Batman-Logo-2018 1.svg";

const UnifiedMentorCard = ({ 
  mentor, 
  mentors, 
  setMentors, 
  mode = "display", // "display", "wishlist", "selection", "profile"
  onSelect = null,
  onDelete = null,
  onRemove = null,
  showAddButton = true,
  showRemoveButton = false,
  isRegistered = false,
  preferenceIndex = null
}) => {
  const [clicked, setClicked] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addMentor } = UseAddToWishlist();
  const { deleteMentor } = UseDeleteFromWishlist();
  const { fetchMentors, mentors: wishlistMentors } = UseFetchWishlist();

  // Check if mentor is in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      await fetchMentors();
      const mentorInWishlist = wishlistMentors.some((item) => item.id === mentor.id);
      setIsInWishlist(mentorInWishlist);
    };
    if (mentor && mentor.id) {
      checkWishlist();
    }
  }, [mentor?.id, fetchMentors, wishlistMentors]);

  const handleAddToWishlist = async () => {
    if (!isInWishlist) {
      setClicked((prevState) => !prevState);
      await addToWishlist(mentor.id);
    }
  };

  const handleRemoveFromWishlist = async () => {
    console.log("Clicked!");
    setClicked((prevState) => !prevState);
    await deleteFromWishlist(mentor.id);
  };

  async function addToWishlist(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to add this mentor to the wishlist",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await addMentor(id);
        setIsInWishlist(true);
        Swal.fire("Added!", "Mentor has been added to wishlist.", "success");
      }
    });
  }

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
          "Mentor has been removed from wishlist.",
          "success"
        );
      }
    });
  }

  const handleSelect = () => {
    if (onSelect) {
      onSelect(mentor);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(mentor.id);
    } else {
      handleRemoveFromWishlist();
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };



  // For Selection / Modal mode
  if (mode === "selection") {
    return (
      <div
        className="wishlist-card"
        data-mode={mode}
        style={{
          width: "320px",
          height: "280px",
          background: "#932C92",
          border: "3px solid #fff",
          borderRadius: "18px",
          marginBottom: "18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0px 0px 3px 7px #FFFFFF",
          paddingBottom: "11px",
        }}
      >
        <div
          style={{
            background: "#A742A4",
            color: "#fff",
            textAlign: "center",
            fontSize: "17px",
            borderRadius: "0 0 32px 32px",
            padding: "28px 0 6px 0",
          }}
        >
          <strong>{mentor?.company_name || mentor?.name}</strong>
          <br />
          {mentor?.designation || mentor?.work_profile || ""}
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={handleSelect}
            style={{
              width: "90%",
              background: "#A742A4",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              borderRadius: "6px",
              padding: "7px 0 7px 0",
              border: "none",
              cursor: "pointer",
            }}
          >
            Select
          </button>

          <button
            onClick={handleDelete}
            style={{
              width: "90%",
              background: "#8B1E8B",
              color: "white",
              fontWeight: "bold",
              fontSize: "15px",
              borderRadius: "6px",
              padding: "7px 0 7px 0",
              border: "none",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  // For Profile Mode (Preference Cards)
  if (mode === "profile") {
    const prefNum = (preferenceIndex !== null && preferenceIndex !== undefined) ? preferenceIndex + 1 : 1;
    return (
      <div className="profile-preference-card-wrapper">
        <div className="preference-label">
          Preference {prefNum}
        </div>
        <div className="wishlist-figma-card profile-pref-card" onClick={!mentor ? onSelect : undefined}>
          {/* Top Bat Logo */}
          <img src={batmanLogoSvg} alt="Bat Logo" className="wishlist-batman-logo" />

          {/* Outer Wireframe */}
          <img src={subtractSvg} alt="Subtract" className="wishlist-subtract-bg" />

          {/* Inner Wireframe */}
          <div className="wishlist-inner-card-box">
            <img src={rectangle47Svg} alt="Rect47" className="wishlist-rect47-bg" />

            <div className="wishlist-card-content">
              {mentor ? (
                <>
                  <div className="wishlist-card-designation">
                    {(mentor.designation || mentor.work_profile || "Associate Product Manager").toUpperCase()}
                  </div>
                  <div className="wishlist-card-company">
                    <img src={companyNameSvg} alt={mentor.company_name || mentor.name} className="company-svg-graphic" />
                  </div>
                  <div className="wishlist-card-divider"></div>
                  <div className="wishlist-card-exp">
                    Experience: {mentor.experience || mentor.exp || "2 Yrs"}
                  </div>
                  <div className="wishlist-card-grad">
                    Graduation year: {mentor.year || mentor.graduation_year || "2023"}
                  </div>
                </>
              ) : (
                <div className="please-select-pref-text">
                  Please select your Preference {prefNum}
                </div>
              )}
            </div>
          </div>

          {/* Remove or Select Button */}
          {mentor ? (
            <button 
              className="wishlist-card-remove-btn pref-card-btn" 
              onClick={(e) => {
                e.stopPropagation();
                if (onRemove) onRemove();
              }}
            >
              Remove
            </button>
          ) : (
            <button 
              className="wishlist-card-remove-btn pref-card-btn select-btn" 
              onClick={(e) => {
                e.stopPropagation();
                if (onSelect) onSelect();
              }}
            >
              Select
            </button>
          )}
        </div>
      </div>
    );
  }

  // For Wishlist Mode, render exact Figma wireframe card layout using Subtract.svg & Rectangle 47.svg
  if (mode === "wishlist") {
    return (
      <div className="wishlist-figma-card">
        {/* 1. Top Batman Logo Emblem (Batman-Logo-2018 1.svg) */}
        <img 
          src={batmanLogoSvg} 
          alt="Batman Logo" 
          className="wishlist-batman-logo" 
        />

        {/* 2. Outer Wireframe Frame (Subtract.svg 240px x 258px) */}
        <img 
          src={subtractSvg} 
          alt="Outer Wireframe" 
          className="wishlist-subtract-bg" 
        />

        {/* 3. Inner Wireframe Box (Rectangle 47.svg 205px x 231px) */}
        <div className="wishlist-inner-card-box">
          <img 
            src={rectangle47Svg} 
            alt="Inner Wireframe" 
            className="wishlist-rect47-bg" 
          />

          {/* Content overlaid inside Rectangle 47 */}
          <div className="wishlist-card-content">
            <div className="wishlist-card-designation">
              {(mentor?.designation || mentor?.work_profile || "Associate Product Manager").toUpperCase()}
            </div>

            <div className="wishlist-card-company">
              <img src={companyNameSvg} alt={mentor?.company_name || mentor?.name || "Company Name"} className="company-svg-graphic" />
            </div>

            <div className="wishlist-card-divider"></div>

            <div className="wishlist-card-exp">
              Experience: {mentor?.experience || mentor?.exp || "2 Yrs"}
            </div>

            <div className="wishlist-card-grad">
              Graduation year: {mentor?.year || mentor?.graduation_year || "2023"}
            </div>
          </div>
        </div>

        {/* 4. Remove Button Pill (141px x 41px) */}
        <button className="wishlist-card-remove-btn" onClick={handleDelete}>
          Remove
        </button>
      </div>
    );
  }

  // For display mode, use standard capsule stadium card styling
  return (
    <div className="mentor-capsule-wrapper">
      <div className="mentor-capsule-card" data-mode={mode}>
        {/* Profile Circle */}
        <div className="mentor-circle-avatar">
          {mentor?.img ? (
            <img src={mentor.img} alt={mentor.company_name || mentor.name} className="mentor-img" />
          ) : (
            <div className="mentor-img-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}
        </div>

        {/* Designation / Work Profile */}
        <div className="mentor-designation">
          {mentor?.designation || mentor?.work_profile || "Associate Product Manager"}
        </div>

        {/* Company Name */}
        <div className="mentor-company">
          {mentor?.company_name || mentor?.name || "Company Name"}
        </div>

        {/* Graduation Year */}
        <div className="mentor-grad-year">
          Graduation Year: {mentor?.year || mentor?.graduation_year || "2023"}
        </div>

        {/* Experience */}
        <div className="mentor-experience">
          Experience: {mentor?.experience || mentor?.exp || "2 Yrs"}
        </div>

        {/* Add / Remove Wishlist Button */}
        <div 
          className={`mentor-wishlist-btn ${isInWishlist ? "active" : ""}`}
          onClick={mode === "wishlist" && showRemoveButton ? handleDelete : handleAddToWishlist}
        >
          {mode === "wishlist" && showRemoveButton ? (
            "Remove Wishlist"
          ) : isInWishlist ? (
            "In Wishlist ✓"
          ) : (
            "Add to Wishlist"
          )}
        </div>
      </div>
    </div>
  );
};

export default UnifiedMentorCard; 