import { useState, useRef, useEffect } from "react";
import "./PhotoWheel.css";

// Function to detect mobile device
function isMobileDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

// Global reference to track last active PhotoWheel
const lastActivePhotoWheel = { current: null };

const PhotoWheel = ({ images, id }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const isMobile = isMobileDevice();

  // Dragging state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const movedDistance = useRef(0);

  useEffect(() => {
    if (lastActivePhotoWheel.current === id) {
      scrollToThumbnail(currentImage);
    }
  }, [currentImage]);

  const handleThumbnailClick = (index) => {
    if (movedDistance.current > 5) {
      // Prevent accidental selection if user dragged
      return;
    }

    if (lastActivePhotoWheel.current !== id) {
      lastActivePhotoWheel.current = id; // Set this wheel as active
    }

    setCurrentImage(index);
    scrollToThumbnail(index);
  };

  // Ensure only the last clicked PhotoWheel responds to arrow keys
  const handleKeyPress = (event) => {
    if (lastActivePhotoWheel.current !== id) return;

    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrevious();
    }
  };

  const handleNext = () => {
    const newIndex = (currentImage + 1) % images.length;
    setCurrentImage(newIndex);
  };

  const handlePrevious = () => {
    const newIndex = (currentImage - 1 + images.length) % images.length;
    setCurrentImage(newIndex);
  };

  const startScrolling = (direction) => {
    stopScrolling();
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
    return () => stopScrolling();
  }, []);

  // ======= AUTO SCROLL TO KEEP SELECTED THUMBNAIL IN VIEW =======
  const scrollToThumbnail = (index) => {
    if (!thumbnailContainerRef.current) return;

    if (lastActivePhotoWheel.current !== id) return; // Ensure only active wheel scrolls

    const container = thumbnailContainerRef.current;
    const selectedThumbnail = container.children[index];

    if (!selectedThumbnail) return;

    const containerLeft = container.scrollLeft;
    const containerRight = containerLeft + container.clientWidth;
    const thumbnailLeft = selectedThumbnail.offsetLeft;
    const thumbnailRight = thumbnailLeft + selectedThumbnail.clientWidth;

    if (thumbnailLeft < containerLeft) {
      container.scrollLeft = thumbnailLeft - 20; // Add small padding
    } else if (thumbnailRight > containerRight) {
      container.scrollLeft = thumbnailRight - container.clientWidth + 20;
    }
  };

  // ======= DRAG TO SCROLL FUNCTIONALITY =======
  const handleMouseDown = (event) => {
    if (!thumbnailContainerRef.current) return;

    isDragging.current = true;
    startX.current = event.clientX;
    scrollLeft.current = thumbnailContainerRef.current.scrollLeft;
    movedDistance.current = 0;

    document.body.style.userSelect = "none"; // Prevents accidental text selection
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current || !thumbnailContainerRef.current) return;

    const deltaX = event.clientX - startX.current;
    movedDistance.current = Math.abs(deltaX);

    thumbnailContainerRef.current.scrollLeft = scrollLeft.current - deltaX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.userSelect = "auto"; // Restore text selection
  };

  // Touch Events for Mobile Support
  const handleTouchStart = (event) => {
    if (!thumbnailContainerRef.current) return;

    isDragging.current = true;
    startX.current = event.touches[0].clientX;
    scrollLeft.current = thumbnailContainerRef.current.scrollLeft;
    movedDistance.current = 0;
  };

  const handleTouchMove = (event) => {
    if (!isDragging.current || !thumbnailContainerRef.current) return;

    const deltaX = event.touches[0].clientX - startX.current;
    movedDistance.current = Math.abs(deltaX);

    thumbnailContainerRef.current.scrollLeft = scrollLeft.current - deltaX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Track last active PhotoWheel when clicked
  const handleClick = () => {
    lastActivePhotoWheel.current = id;
  };

  return (
    <div
      className="photo-wheel"
      tabIndex="0"
      onKeyDown={handleKeyPress}
      onClick={handleClick}
    >
      <img
        src={images[currentImage]}
        alt={`Engagement photo ${currentImage + 1}`}
        loading="lazy"
      />
      <div className="thumbnail-container-wrap">
        <div
          className="hover-area left"
          onMouseOver={() => startScrolling(-1)}
          onMouseOut={stopScrolling}
          onTouchStart={() => startScrolling(-1)}
          onTouchEnd={stopScrolling}
        />
        <div
          className="thumbnail-container"
          ref={thumbnailContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              draggable="false"
              onClick={() => handleThumbnailClick(index)}
              className={`thumbnail ${index === currentImage ? "active" : ""}`}
              loading="lazy"
            />
          ))}
        </div>
        <div
          className="hover-area right"
          onMouseOver={() => startScrolling(1)}
          onMouseOut={stopScrolling}
          onTouchStart={() => startScrolling(1)}
          onTouchEnd={stopScrolling}
        />
      </div>
    </div>
  );
};

export default PhotoWheel;
