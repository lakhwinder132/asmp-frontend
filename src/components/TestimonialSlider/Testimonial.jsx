import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper-custom.css";
import img1 from '/testimonials/image1.jpg'
import img2 from '/testimonials/image2.jpg'
import img3 from '/testimonials/image3.jpg'
import img4 from '/testimonials/image4.jpg'

const testimonials = [
  {
    name: "Preksha PC",
    image: img1,
    feedback:
      "When I signed up for ASMP, I had no idea what to expect—but it turned out to be incredible. My mentor not only shared his expertise but also his inspiring journey. Visiting the Pilgrim office and the insightful sessions he organized gave me a real glimpse into the industry. I've learned so much and feel like I've gained a mentor for life.",
  },
  {
    name: "Anuj Yadav",
    image: img2,
    feedback:
      "My ASMP mentorship was truly memorable. My mentor made the experience insightful and personal. He broke down complex ideas in finance and quant, tailored his advice to my interests, and constantly encouraged me to think deeper. His support felt more like a friendship than a formality, and it has left a lasting impact on my confidence.",
  },
  {
    name: "Kartik Padiya",
    image: img3,
    feedback:
      "Having an ASMP mentor has been one of the most meaningful parts of my journey. My mentor was always supportive, offering honest guidance, whether it was career advice, project doubts, or just when I felt stuck. Over time, our bond grew from scheduled calls to spontaneous conversations. ASMP helped me build a truly valuable and lasting connection.",
  },
  {
    name: "Aarya Gaikwad",
    image: img4,
    feedback:
      "ASMP program was a game-changer for me. The experience with my mentor was incredibly helpful. He was approachable, quick to respond, and always offered clear, practical advice. Even in brief interactions, he made an effort to support and guide me. His mentorship played a meaningful role in my learning, and I'm truly grateful for it."
  },
];

const TestimonialSlider = () => {
  const testimonialRef = useRef(null);

  useEffect(() => {
    const scrollToTestimonial = () => {
      testimonialRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("scrollToTestimonials", scrollToTestimonial);

    return () => {
      window.removeEventListener("scrollToTestimonials", scrollToTestimonial);
    };
  }, []);

  return (
    <div ref={testimonialRef} id="testimonials">
      <div
        className="testimonialHeading"
        style={{
          marginTop: "2%",
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          fontWeight: "700",
          lineHeight: "1.2",
          textAlign: "center",
          marginLeft: "5%",
          marginRight: "5%",
          color: "rgba(255, 255, 255, 1)",
        }}
      >
        TESTIMONIALS
      </div>
      <div className="slider-container">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          centeredSlides={true}
          onImagesReady={(swiper) => swiper.update()}
          breakpoints={{
            1300: { slidesPerView: 3, spaceBetween: 50 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
            768:  { slidesPerView: 2, spaceBetween: 30 },
            480:  { slidesPerView: 1, spaceBetween: 20 },
            0:    { slidesPerView: 1, spaceBetween: 15 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} >
              <div style={styles.testimonialItem} >
                <div style={styles.overContainer} >
                  <div
                    className="name-heading"
                    style={{
                      width: "100%",
                      color: "white",
                      fontFamily: "Fraunces, serif",
                    }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    className="pic-content"
                    style={{
                      height: "auto",
                      minHeight: "200px",
                      width: "100%",
                      display: "flex",
                      gap: "10px"
                    }}
                  >
                    <div
                      className="image"
                      style={{
                        height: "80px",
                        width: "80px",
                        minWidth: "80px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        style={{
                          width: "100%",
                          height: "200%",
                          objectFit: "cover",
                          borderRadius: "0%",
                          position: "relative",
                          bottom: "-80px"

                        }}
                      />
                    </div>
                    <div
                      className="testimonal-content"
                      style={{
                        color: "white",
                        fontFamily: "Fraunces, serif",
                        flex: 1,
                        minWidth: "0",
                        wordWrap: "break-word",
                        overflowWrap: "break-word"
                      }}
                    >
                      {testimonial.feedback}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const styles = {
  testimonialItem: {
    height: "auto",
    minHeight: "314px",
    width: "100%",
    maxWidth: "428px",
    margin: "0 auto",
    textAlign: "left",
    background: "linear-gradient(90deg, rgba(0, 0, 0, 0.58) 0%, rgba(89, 84, 84, 0.58) 43.5%, rgba(0, 0, 0, 0.58) 87.5%, rgba(0, 0, 0, 0.58) 100%)",
    backdropFilter: "blur(1px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "10px",
    border: "4px solid rgba(255, 255, 255, 1)",
    overflow: "hidden",
    padding: "20px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    boxSizing: "border-box",
  },

  overContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
};

export default TestimonialSlider;