import { useState, useRef, useEffect } from "react";
import "./PhotoWheel.css";

// Global reference to track last active PhotoWheel
const lastActivePhotoWheel = { current: null };

const PhotoWheel = ({ images, id }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false); // Track loading state
  const thumbnailContainerRef = useRef(null);
  const isActiveWheel = lastActivePhotoWheel.current === id; // Track if this is the active wheel
  const scrollIntervalRef = useRef(null);

  // Dragging state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const movedDistance = useRef(0);

  useEffect(() => {
    if (isActiveWheel) {
      scrollToThumbnail(currentImage);
    }
  }, [currentImage]);

  // Reset loading state when switching images, but check if it's already cached
  useEffect(() => {
    if (!isActiveWheel) return;

    setImageLoaded(false);
    const img = new Image();
    img.src = images[currentImage];
    img.onload = () => setImageLoaded(true);
  }, [currentImage, isActiveWheel]);

  const handleThumbnailClick = (index) => {
    if (movedDistance.current > 5) {
      // Prevent accidental selection if user dragged
      return;
    }

    if (!isActiveWheel) {
      lastActivePhotoWheel.current = id; // Switch active wheel
      setImageLoaded(false);
    }

    setCurrentImage(index);
    scrollToThumbnail(index);
  };

  // Ensure only the last clicked PhotoWheel responds to arrow keys
  const handleKeyPress = (event) => {
    if (!isActiveWheel) return;

    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrevious();
    }
  };

  const handleNext = () => {
    setImageLoaded(false); // Reset blur before loading new image
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setImageLoaded(false); // Reset blur before loading new image
    setCurrentImage(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
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

    if (!isActiveWheel) return; // Ensure only active wheel scrolls

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
      {/* Blurred placeholder before loading */}
      <img
        src={images[currentImage]}
        alt={`Photo ${currentImage + 1}`}
        className={`main-photo ${imageLoaded ? "loaded" : ""}`} // Blur removed when loaded
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
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
