import React, { useState, useEffect } from "react";
import "./Wishlist/Wishlist_MentorCards.css";
import Swal from "sweetalert2";
import UseAddToWishlist from "../hooks/useAddToWishlist";
import UseDeleteFromWishlist from "../hooks/useDeleteFromWishlist";
import UseFetchWishlist from "../hooks/useFetchWishlist";

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

  // For profile mode - show empty card or selected mentor
  if (mode === "profile") {
    if (!mentor) {
      // Empty preference card
      return (
        <div style={{ margin: "1rem", height: "fit-content", width: "100%" }}>
          <div 
            className="wishlist-card"
            data-mode={mode}
            style={{ cursor: isRegistered ? "default" : "pointer" }}
            onClick={() => !isRegistered && onSelect && onSelect()}
          >
            <div className="upper-card">
              <div className="card-header px-4 py-2" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                Please select your
              </div>
              <div className="card-header" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                Preference {preferenceIndex !== null ? preferenceIndex + 1 : ""}
              </div>
            </div>
            <div className="lower-card-body">
              <p className="card-text" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                Click to select a mentor from your wishlist
              </p>
            </div>
            {/* <p className="mentor-id-div" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
              No mentor selected yet
            </p> */}
            <div className="add-to-wishlist">
              <p style={{ fontSize: "medium", marginBottom: 0, color: "#ffffff", wordBreak: "break-word", overflowWrap: "break-word" }}>
                Select Mentor
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      // Selected mentor card
      return (
        <div style={{ margin: "1rem", height: "fit-content", width: "100%" }}>
          <div className="wishlist-card" data-mode={mode}>
            <div className="upper-card">
              <div className="card-header px-4 py-2" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                {mentor.designation}
              </div>
              <div className="card-header" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                {mentor.company_name}
              </div>
            </div>
            <div className="lower-card-body">
              <p className="card-text" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                Graduation year: {mentor.year}
              </p>
            </div>
            <p className="mentor-id-div" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
              Work Profile: {mentor.work_profile}
            </p>

            <div className="add-to-wishlist">
              {!isRegistered && (
                <p
                  style={{
                    fontSize: "medium",
                    marginBottom: 0,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    wordBreak: "break-word",
                    overflowWrap: "break-word"
                  }}
                  onClick={handleRemove}
                >
                  Remove from Preferences
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  // For selection mode (modal), use different styling
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
          <strong>{mentor.company_name || mentor.name}</strong>
          <br />
          {mentor.designation || mentor.work_profile || ""}
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

  // For display and wishlist modes, use the standard card styling
  return (
    <div style={{ margin: "1rem", height: "fit-content", width: "100%" }}>
      <div className="wishlist-card" data-mode={mode}>
        <div className="upper-card">
          <div className="card-header px-4 py-2" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
            {mentor.designation}
          </div>
          <div className="card-header" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
            {mentor.company_name}
          </div>
        </div>
        <div className="lower-card-body">
          <p className="card-text" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
          Graduation year: {mentor.year || "N/A"}
          </p>
        </div>
        <p className="mentor-id-div" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
          Work Profile: {mentor.work_profile}
        </p>

        <div className="add-to-wishlist">
          {mode === "wishlist" && showRemoveButton && (
            <p
              style={{
                fontSize: "medium",
                marginBottom: 0,
                transition: "all 0.3s ease",
                cursor: "pointer",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}
              onClick={handleDelete}
            >
              Remove from Wishlist {clicked ? "\u2690" : "\u2691"}
            </p>
          )}
          
          {mode === "display" && showAddButton && (
            <p
              style={{
                fontSize: "medium",
                marginBottom: 0,
                transition: "all 0.3s ease",
                color: isInWishlist ? "rgba(255, 0, 238, 0.88)" : "#ffffff",
                cursor: "pointer",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}
              onClick={handleAddToWishlist}
            >
              Add to Wishlist {isInWishlist ? "\u2691" : "\u2690"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnifiedMentorCard; 