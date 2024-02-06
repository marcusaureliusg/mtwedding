// PhotoWheel.jsx
import { useState, useRef, useEffect } from "react";
import "./PhotoWheel.css";

// Function to detect mobile device
function isMobileDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

const PhotoWheel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const isMobile = isMobileDevice();

  useEffect(() => {
    // Scroll to the bottom of the page whenever the currentImage changes
    window.scrollTo(0, document.body.scrollHeight);
  }, [currentImage]);

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  const handleKeyPress = (event) => {
    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrevious();
    }
  };

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
  };

  const startScrolling = (direction) => {
    stopScrolling(); // Stop any existing scrolling
    scrollIntervalRef.current = setInterval(() => {
      if (thumbnailContainerRef.current) {
        thumbnailContainerRef.current.scrollLeft += direction * 5;
      }
    }, 10);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => stopScrolling();
  }, []);

  return (
    <div className="photo-wheel" tabIndex="0" onKeyDown={handleKeyPress}>
      <img
        src={images[currentImage]}
        alt={`Engagement photo ${currentImage + 1}`}
        loading="lazy"
      />
      <div className="thumbnail-container-wrap">
        {(
          <div
            className="hover-area left"
            onMouseOver={!isMobile && () => startScrolling(-1)}
            onMouseOut={stopScrolling}
          />
        )}
        <div className="thumbnail-container" ref={thumbnailContainerRef}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(index)}
              className={`thumbnail ${index === currentImage ? "active" : ""}`}
              loading="lazy"
            />
          ))}
        </div>
        {(
          <div
            className="hover-area right"
            onMouseOver={!isMobile && () => startScrolling(1)}
            onMouseOut={stopScrolling}
          />
        )}
      </div>
    </div>
  );
};

export default PhotoWheel;
