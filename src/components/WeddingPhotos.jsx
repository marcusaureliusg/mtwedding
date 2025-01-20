/* eslint-disable react/no-unescaped-entities */
import { banner9 } from "../assets/banners";
import Banner from "./Banner";
import { useEffect } from "react";

import LinkPreview from "./LinkPreview";

const WeddingPhotos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryUrl =
    "https://malloryjeanphotos.pic-time.com/-taylormarcus/gallery";

  const banner9Config = {
    srcSet: `${banner9["320"]} 320w, ${banner9["480"]} 480w, ${banner9["768"]} 768w, ${banner9["1366"]} 1366w,`,
    classes: "img-banner img-banner--eight",
    src: banner9["1366"], // Default image source
  };

  return (
    <>
      <Banner
        srcSet={banner9Config.srcSet}
        classes={banner9Config.classes}
        src={banner9Config.src}
      />
      <div className="wrapper no-padding-bottom" id="gallery">
        <section>
          <h2 className="section__header">Our Wedding Photos</h2>
          <p>
            What a celebration! We had such an incredible day with you all and
            feel truly lucky and taylor write this please
          </p>
          <p>
            Visit Our{" "}
            <a href={galleryUrl} target="_blank" rel="noopener noreferrer">
              Wedding Gallery
            </a>{" "}
          </p>
        </section>
        {/* Navigation Links */}
        <LinkPreview url={galleryUrl} />
      </div>
    </>
  );
};

export default WeddingPhotos;
