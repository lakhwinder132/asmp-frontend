import React from "react";
import "./Team.css";
import instagramIcon from "/teampage/instagram.svg";
import linkedinIcon from "/teampage/linkedin.svg";

// Overall Coordinator
import image1 from "/teampage/Karthik Vaishnav.png";
// ASMP Team
import image9 from "/teampage/asmpctm1.png";
import image10 from "/teampage/asmpctm2.png";
import image15 from "/teampage/ac1.png";
import image16 from "/teampage/ac2.png";
import image5 from "/teampage/ac3.png";
import image14 from "/teampage/ac4.png";
import image3 from "/teampage/ac5.png";
// Web Team
import image13 from "/teampage/arush.png";
import image11 from "/teampage/khushi.png";
import image2 from "/teampage/kapil.png";
import image7 from "/teampage/vanshika.png";
import image20 from "/teampage/aditya.png";
import image21 from "/teampage/vaibhav.png";
import image22 from "/teampage/rutika.png";
import image23 from "/teampage/tarun.png";
// Design Team
import image17 from "/teampage/designctm1.png";
import image18 from "/teampage/designctm2.png";
import image25 from "/teampage/dc1.png";
import image26 from "/teampage/dc2.png";
import image27 from "/teampage/dc3.png";
import image28 from "/teampage/dc4.png";
import image29 from "/teampage/dc5.png";
import image30 from "/teampage/dc6.png";

import CursorAnimation from "../CursorAnimation";

const Team = () => {
  const teamData = {
    overallCoordinator: {
      name: "Karthik Vaishnav",
      image: image1,
      instagram: "https://www.instagram.com/kartik__vaishnav/",
      linkedin: "https://www.linkedin.com/in/kartik-vaishnav-12a758251/",
      phone: "+91 88157 26072",
    },

    webTeams: [
      {
        title: "ASMP TEAM 2025-26",
        coreMembers: [
          {
            name: "Aadit Sule",
            image: image9,
            instagram: "https://www.instagram.com/aaadit_s/",
            linkedin: "https://www.linkedin.com/in/aadit-sule/",
            phone: "+91 84595 39918",
          },
          {
            name: "Aastha Maliwal",
            image: image10,
            instagram: "https://www.instagram.com/aasthamaliwal/",
            linkedin: "https://www.linkedin.com/in/aastha-maliwal-2ba2b0287/",
            phone: "+91 94035 21022",
          },
        ],
        coordinators: [
          {
            name: "Manas Gupta",
            image: image15,
            instagram: "https://www.instagram.com/manasgupta1014/",
            linkedin: "https://www.linkedin.com/in/manas-gupta-bb487b317",
            phone: "+91 93511 02913",
          },
          {
            name: "Ridham Saxena",
            image: image16,
            instagram: "https://www.instagram.com/ridham.2006/",
            linkedin:
              "https://www.linkedin.com/in/ridham-saxena-5a1555318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            phone: "+91 94256 01681",
          },
          {
            name: "Srishti Poddar",
            image: image5,
            instagram: "https://www.instagram.com/srishtipodda.r/",
            linkedin: "https://www.linkedin.com/in/srishti-poddar-855944260/",
            phone: "+91 63592 63317",
          },
          {
            name: "Vaibhav Kumar",
            image: image14,
            instagram: "https://www.instagram.com/fr._.vaibhav/",
            linkedin: "https://www.linkedin.com/in/vaibhav-kumar-6a7b84330/",
            phone: "+91 93527 22250",
          },
          {
            name: "Jasnoor Kaur",
            image: image3,
            instagram: "https://www.instagram.com/_noor._.78/",
            linkedin: "https://www.linkedin.com/in/jasnoor-kaur-24b40734a/",
            phone: "+91 98149 72319",
          },
        ],
      },

      {
        title: "WEB TEAM 2025-26",
        coreMembers: [
          {
            name: "Arush Srivastava",
            image: image13,
            instagram: "https://www.instagram.com/itss.arushhh/",
            linkedin: "https://www.linkedin.com/in/arush-narayan-srivastav-001/",
            phone: "+91 90055 49919",
          },
          {
            name: "Khushi Yadav",
            image: image11,
            instagram: "https://www.instagram.com/yadavk_18/",
            linkedin: "https://www.linkedin.com/in/khushi-yadav-0275b6293/",
            phone: "+91 89300 97733",
          },
        ],
        coordinators: [
          {
            name: "Kapil Chhipa",
            image: image2,
            instagram: "https://www.instagram.com/kapi_lchhipa/",
            linkedin: "https://www.linkedin.com/in/kapil-chhipa-05a741330/",
            phone: "+91 99509 13954",
          },
          {
            name: "Aditya Chaurasiya",
            image: image20,
            instagram: "https://www.instagram.com/adityachaurasiya.8807/",
            linkedin: "https://www.linkedin.com/in/aditya-chaurasiya-70785531b/",
            phone: "+91 79919 56691",
          },
          {
            name: "Vaibhav Singh",
            image: image21,
            instagram: "https://www.instagram.com/cheekycaibhav/",
            linkedin: "https://www.linkedin.com/in/vaibhavsingh776/",
            phone: "+91 90820 00452",
          },
          {
            name: "Rutika Hake",
            image: image22,
            instagram: "https://www.instagram.com/rutikahake",
            linkedin: "https://www.linkedin.com/in/rutika-hake-990787322",
            phone: "+91 87671 53010",
          },
          {
            name: "Tarun Kadam",
            image: image23,
            instagram: "https://www.instagram.com/tarunkadam06",
            linkedin: "https://www.linkedin.com/in/tarun-kadam-657a44330",
            phone: "+91 77579 49693",
          },
          {
            name: "Vanshika Nalamasa",
            image: image7,
            instagram: "https://www.instagram.com/vanshikazz0405",
            linkedin: "https://www.linkedin.com/in/vanshika-nalamasa-04b6bb326",
            phone: "+91 99896 83662",
          },
        ],
      },

      {
        title: "DESIGN TEAM 2025-26",
        coreMembers: [
          {
            name: "Sarthak Hase",
            image: image17,
            instagram: "https://www.instagram.com/sarthak_hase",
            linkedin: "https://www.linkedin.com/in/sarthak-hase-9503aa241/",
            phone: "+91 93700 05696",
          },
          {
            name: "Gayatri Sahu",
            image: image18,
            instagram: "https://www.instagram.com/_gayu_02__/",
            linkedin: "https://www.linkedin.com/in/gayatri-sahu-948310295/",
            phone: "+91 77269 49650",
          },
        ],
        coordinators: [
          {
            name: "Ayushi Sahani",
            image: image25,
            instagram: "https://www.instagram.com/ay_ushi6556/",
            linkedin: "https://www.linkedin.com/in/ayushi-sahani-922bb5369",
            phone: "+91 90262 90894",
          },
          {
            name: "Manvi Sheth",
            image: image26,
            instagram: "https://www.instagram.com/ivnam_9/",
            linkedin: "https://www.linkedin.com/in/manvi-sheth-18725a379/",
            phone: "+91 93721 43959",
          },
          {
            name: "Rutuparn Ranade ",
            image: image27,
            instagram: "https://www.instagram.com/ingenious_rutu/",
            linkedin: "https://www.linkedin.com/in/rutuparn-ranade-95623b340/",
            phone: "+91 86691 83310",
          },
          {
            name: "Shravanee Kulkarni",
            image: image28,
            instagram: "https://www.instagram.com/shravanee_09",
            linkedin: "https://www.linkedin.com/in/shravanee-kulkarni-230989356/",
            phone: "+91 95791 65349",
          },
          {
            name: "Umesh Motiwale",
            image: image29,
            instagram: "https://www.instagram.com/umesh_motiwale",
            linkedin: "https://www.linkedin.com/in/umesh-motiwale-289132319",
            phone: "+91 95797 40114",
          },
          {
            name: "Viraj Jadhav",
            image: image30,
            instagram: "https://www.instagram.com/viraj_jadhav_0108",
            linkedin: "https://www.linkedin.com/in/viraj-jadhav-7b4933346",
            phone: "+91 70580 48152",
          },
        ],
      },
    ],
  };

  const renderMember = (member, isOverall = false) => (
    <div className="team-member">
      <div
        className={isOverall ? "image-circle-large" : "image-circle"}
        style={{ backgroundImage: `url(${member.image})` }}
      ></div>
      <div className="name">{member.name}</div>

      {(member.instagram || member.linkedin) && (
        <div className="social-links">
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" className="icon" />
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="icon" />
            </a>
          )}
        </div>
      )}

      {member.phone && (
        <div
          className="phone-number"
          style={{
            marginTop: "8px",
            color: "white",
            fontSize: "0.9rem",
            padding: "4px 8px",
            borderRadius: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.15)", // translucent white bg
            backdropFilter: "blur(5px)", // blurry glass effect
            WebkitBackdropFilter: "blur(5px)", // for Safari
            display: "inline-block",
            fontWeight: "600",
          }}
          title={`Call ${member.name}`}
        >
          📞 {member.phone}
        </div>
      )}
    </div>
);


  return (
    <>
      <CursorAnimation />
      <div className="team-members">
        <h1 className="headingg">SARC TEAM 2024-25</h1>

        <h2 className="head2">OVERALL COORDINATOR</h2>
        <div className="team-grid-single">
          {renderMember(teamData.overallCoordinator, true)}
        </div>

        {teamData.webTeams.map((webTeam, teamIndex) => (
          <div key={`web-team-${teamIndex}`}>
            <h1 className="headingg">{webTeam.title}</h1>

            <h2 className="head2">CORE TEAM MEMBERS</h2>
            <div className="team-grid-core">
              {webTeam.coreMembers.map((member, index) => (
                <React.Fragment key={`core-${teamIndex}-${index}`}>
                  {renderMember(member)}
                </React.Fragment>
              ))}
            </div>

            <h3 className="sub-head">COORDINATORS</h3>
            <div className="team-grid-core">
              {webTeam.coordinators
                .filter(
                  (member) =>
                    member.name !== "Jasnoor Kaur" &&
                    member.name !== "Vaibhav Kumar"
                )
                .map((member, index) => (
                  <React.Fragment key={`coord-${teamIndex}-${index}`}>
                    {renderMember(member)}
                  </React.Fragment>
                ))}
            </div>

            <div className="team-grid-core">
              {webTeam.coordinators
                .filter(
                  (member) =>
                    member.name === "Jasnoor Kaur" ||
                    member.name === "Vaibhav Kumar"
                )
                .map((member, index) => (
                  <React.Fragment key={`coord-extra-${teamIndex}-${index}`}>
                    {renderMember(member)}
                  </React.Fragment>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Team;