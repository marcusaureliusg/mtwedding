import { useEffect, useRef } from "react";

function Banner(props) {
  const imageRef = useRef(null); // Create a ref for the image

  useEffect(() => {
    const bannerImg = imageRef.current;
    if (bannerImg.complete) {
      bannerImg.classList.add("loaded");
    } else {
      bannerImg.addEventListener("load", () => {
        bannerImg.classList.add("loaded");
      });

      // Cleanup function to remove event listener
      return () =>
        bannerImg.removeEventListener("load", () =>
          bannerImg.classList.add("loaded")
        );
    }
  }, []);

  return (
    <div className={props.classes}>
      <img
        sizes="(max-width: 1366px) 100vw, 1366px"
        srcSet={props.srcSet}
        src={props.src}
        alt="Marcus &amp; Taylor - Banner"
        className="bannerimg"
        loading="lazy"
        ref={imageRef} // Attach the ref to the img element
      />
    </div>
  );
}

export default Banner;
