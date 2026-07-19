import React, { useEffect } from "react";
import UseFetchWishlist from "../../hooks/useFetchWishlist";
import UseDeleteFromWishlist from "../../hooks/useDeleteFromWishlist";
import Swal from "sweetalert2";
import UnifiedMentorCard from "../UnifiedMentorCard";

export default function WishlistModalContent({ onSelect }) {
  const { fetchMentors, loading, error, mentors, setMentors } = UseFetchWishlist();
  const { deleteMentor } = UseDeleteFromWishlist();

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to remove this mentor from wishlist",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });
      if (result.isConfirmed) {
        await deleteMentor(id);
        setMentors((m) => m.filter((mnt) => mnt.id !== id));
        Swal.fire(
          "Removed!",
          "Mentor has been removed from wishlist.",
          "success"
        );
      }
    } catch {
      Swal.fire("Error!", "Failed to remove mentor from wishlist.", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error loading wishlist: {error}</div>
      </div>
    );
  if (!mentors || mentors.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600 text-center">
          <p className="text-lg">No mentors in your wishlist</p>
          <p className="text-sm mt-2">
            Add mentors to your wishlist to see them here.
          </p>
        </div>
      </div>
    );

  return (
    <div style={{ overflowY: "auto", padding: "0 0px" }}>
      <h2 style={{ color: "#A742A4", textAlign: "center", marginBottom: "8px" }}>My Wishlist</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {mentors.map((mentor) => (
          <UnifiedMentorCard
            key={mentor.id}
            mentor={mentor}
            mentors={mentors}
            setMentors={setMentors}
            mode="selection"
            onSelect={onSelect}
            onDelete={handleDelete}
            showAddButton={false}
            showRemoveButton={true}
          />
        ))}
      </div>
    </div>
  );
}