import React, { useEffect, useState } from "react";
import img1 from "../assets/images/img-1.png";
import img2 from "../assets/images/img-2.jpg";
import img3 from "../assets/images/img-3.jpg";
import img4 from "../assets/images/img-4.jpeg";

const Hero = () => {
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="position-relative w-100 hero-section overflow-hidden">
      {/* Background Image */}
      <img
        src={images[currentIndex]}
        alt="Hero"
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ objectFit: "cover" }}
      />

      {/* Overlay with Text */}
      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
        <h1 className="text-white display-4 fw-bold">Welcome to My Website</h1>
      </div>
    </div>
  );
};

export default Hero;
