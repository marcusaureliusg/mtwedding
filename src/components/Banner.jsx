import { useEffect, useRef, useState } from "react";

function Banner({ src, srcSet, classes }) {
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false); // Track loading state

  useEffect(() => {
    const bannerImg = imageRef.current;
    if (!bannerImg) return;

    //  Check if image is already loaded (cached images)
    if (bannerImg.complete) {
      setImageLoaded(true);
    } else {
      //  Proper event listener cleanup
      const handleLoad = () => setImageLoaded(true);
      bannerImg.addEventListener("load", handleLoad);

      return () => bannerImg.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div className={`${classes} banner-wrapper`}>
      <img
        sizes="(max-width: 1366px) 100vw, 1366px"
        srcSet={srcSet}
        src={src}
        alt="Marcus &amp; Taylor - Banner"
        className={`bannerimg ${imageLoaded ? "loaded" : ""}`} // 🔹 Add blur transition
        loading="lazy"
        ref={imageRef}
      />
    </div>
  );
}

export default Banner;
