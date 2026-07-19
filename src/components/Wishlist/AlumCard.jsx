import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Card.css";
import { ShoesDetails } from "./shoesDetails";
import UseFetchMentors from "../../hooks/useFetchMentors";
import UseAddToWishlist from "../../hooks/useAddToWishlist";
import UseDeleteFromWishlist from "../../hooks/useDeleteFromWishlist";
import Swal from "sweetalert2";

const cardData = [
  {
    name: "Mohit Yadav",
    company: "Amazon",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  // Add more objects for other cards
];

const CardWrapper = styled.div`
  margin: 20px auto;
`;

const CardContainer = styled(motion.div)`
  width: 285px;
  height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
  background-color: #1d1f21;
  color: #fff;
  position: relative;
  cursor: grab;
  left: -20px; /* Add margin for spacing */
`;

const CircleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 50%;
  overflow: hidden;
  border-top-right-radius: 25px;
`;

const Circle = styled.div`
  position: absolute;
  width: 490px;
  height: 250px;
  z-index: 5;
  background-color: aqua;
  border-radius: 50%;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  height: 200px;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  padding: 1em 15px;
`;

const BottomContainer = styled.div`
  display: flex;
  height: 300px;
`;

const NikeText = styled.h1`
  color: #fff;
  text-transform: uppercase;
  margin: 0;
  z-index: 10;
  font-size: 76px;
  font-weight: 900;
`;

const ShoesWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Shoes = styled(motion.div)`
  width: auto;
  height: 190px;
  z-index: 99;
  user-select: none;
  margin-right: 3em;
  margin-top: 2em;

  img {
    // width: auto;
    height: 25%;
    user-select: none;
    position: absolute; /* Set the position type to absolute */
    top: 10px; /* Adjust the top distance according to your needs */
    left: -90px;
  }
`;

export default function AlumCard(props) {
  const FIELDS = [
    ["analytics", "Analytics"],
    ["civil_services", "Civil Services/Govt. of India"],
    ["core_engineering", "Core engineering"],
    ["design", "Design"],
    ["finance", "Finance"],
    ["it", "IT"],
    ["management", "Management"],
    ["management_consulting", "Management consulting"],
    ["marketing", "Marketing"],
    ["product_management", "Product Management"],
    ["research", "Research"],
    ["strategy_consulting", "Strategy consulting"],
    ["entrepreneurship", "Entrepreneurship"],
    ["other", "Other"],
  ];

  const [currField, setCurrField] = useState(FIELDS[0][0]);

  const { fetchMentors, setError, loading, error, mentors, setMentors } =
    UseFetchMentors();
  const { addMentor, success } = UseAddToWishlist();
  const { deleteMentor } = UseDeleteFromWishlist();

  // useEffect(() => {
  //   const cards = document.querySelectorAll(".card");

  //   setTimeout(() => {
  //     cards.forEach(card => card.classList.add("show"));
  //   }, 200); // Adjust the delay based on your preference
  // }, []);

  function fetchMentorsByField(field) {
    setMentors(null);
    fetchMentors(field);
    setCurrField(field);
  }

  useEffect(() => {
    fetchMentors(FIELDS[0][0]);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function addToWishlist(id) {
    addMentor(id);
    const newMentors = [...mentors];
    let something = newMentors.filter((mentor) => mentor.id == id)[0];
    something.wishlisted = true;
    setMentors(newMentors);
    fetchMentors(currField);
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
        something.wishlisted = false;
        setMentors(newMentors);
        fetchMentors(currField);
        Swal.fire(
          "Removed!",
          "Mentor has been removed from wishlist.",
          "success"
        );
      }
    });
  }

  if (loading || !mentors) {
    return (
      <>
        <div className="mentorbtncontainer">
          {FIELDS.map((field, index) => {
            return (
              <button
                className="mentorbutton"
                style={{
                  backgroundColor: currField == field[0] ? "orange" : "#3498db",
                }}
                key={index}
                onClick={() => {
                  fetchMentorsByField(field[0]);
                }}
              >
                {field[1]}
              </button>
            );
          })}
        </div>
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="mentorbtncontainer">
        {FIELDS.map((field, index) => {
          return (
            <button
              className="mentorbutton"
              style={{
                backgroundColor: currField == field[0] ? "orange" : "#3498db",
              }}
              key={index}
              onClick={() => {
                fetchMentorsByField(field[0]);
              }}
            >
              {field[1]}
            </button>
          );
        })}
      </div>

      <div className="mentorsContainer">
        {mentors &&
          mentors.map((mentor, index) => {
            return (
              <CardWrapper
                id={index}
                key={index}
                style={{
                  opacity: !mentor.should_show && `0.4`,
                  animation: `animateDiv 0.5s ease-in-out`,
                  animationDelay: index < 20 ? `${index * 0.1}s` : "0s",
                }}
              >
                <CardContainer
                  style={{ x, y, rotateX, rotateY, z: 100 }}
                  whileHover={{ cursor: "auto" }}
                >
                  <TopContainer>
                    <CircleWrapper>
                      <Circle
                        style={{
                          backgroundColor: mentor.should_show
                            ? mentor.wishlisted
                              ? "orange"
                              : ""
                            : "gray",
                        }}
                      >
                        {
                          <span
                            style={{
                              position: "absolute",
                              fontSize: "20px",
                              top: "55px",
                              left: "140px",
                              color: "black",
                            }}
                          >
                            Mentor ID: {mentor.id}
                          </span>
                        }
                      </Circle>
                    </CircleWrapper>
                    <ShoesWrapper>
                      <Shoes
                        style={{
                          x: "0px",
                          y: "-28px",
                          rotateX,
                          rotateY,
                          rotate: "-30deg",
                          z: 100000,
                        }}
                        drag
                        dragElastic={0.12}
                        whileTap={{ cursor: "grabbing" }}
                      >
                        <img class={"myimg"} src={AirJordanImg} />
                      </Shoes>
                    </ShoesWrapper>
                    <NikeText></NikeText>
                  </TopContainer>
                  <ShoesDetails
                    data={mentor}
                    addToWishlist={addToWishlist}
                    deleteFromWishlist={deleteFromWishlist}
                  />{" "}
                </CardContainer>
              </CardWrapper>
            );
          })}
      </div>
    </div>
  );
}
