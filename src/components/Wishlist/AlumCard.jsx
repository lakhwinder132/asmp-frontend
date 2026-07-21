import React from "react";
import UnifiedMentorCard from "../UnifiedMentorCard";

export default function AlumCard({ mentor, mentors, setMentors }) {
  return (
    <UnifiedMentorCard
      mentor={mentor}
      mentors={mentors}
      setMentors={setMentors}
      mode="display"
      showAddButton={true}
    />
  );
}
