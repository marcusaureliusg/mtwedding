import { banner9 } from "../assets/banners";
import Banner from "./Banner";
import { useEffect } from "react";
import * as weddingImages from "../assets/weddingphotos";
import LinkPreview from "./LinkPreview";
import PhotoWheel from "./PhotoWheel";
import { Link } from "react-router-dom";
import { getSortedImageArray } from "../utils/images";

const WeddingPhotos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryUrl =
    "https://malloryjeanphotos.pic-time.com/-taylormarcus/gallery";

  const banner9Config = {
    srcSet: `${banner9["320"]} 320w, ${banner9["480"]} 480w, ${banner9["768"]} 768w, ${banner9["1366"]} 1366w,`,
    classes: "img-banner img-banner--nine",
    src: banner9["1366"], // Default image source
  };

  const sortedImagesArray = getSortedImageArray(weddingImages);

  return (
    <>
      <Banner
        srcSet={banner9Config.srcSet}
        classes={banner9Config.classes}
        src={banner9Config.src}
      />
      <div className="wrapper no-padding-bottom" id="gallery">
        <section>
          <h2 className="section__header">Our Wedding Gallery</h2>
          <p>
            Click below to visit our{" "}
            <a href={galleryUrl} target="_blank" rel="noopener noreferrer">
              wedding photo gallery
            </a>{" "}
            from the big day. Please feel free to take a look, download, or
            order any photos. Thank you again for making this day so special!
          </p>
          ↓ Also keep scrolling for some less professional photos from the
          wedding week and a recount of our honeymoon!! ↓
        </section>
        {/* Navigation Links */}
        <LinkPreview url={galleryUrl} />
        <h2 className="section__header">Random Wedding Photos</h2>
      </div>

      {/* PhotoWheel with engagement images */}
      <PhotoWheel images={sortedImagesArray} />

      {/* Navigation Links */}
      <div className="navigation-links">
        <Link to="/honeymoon">lastly... a recount of our honeymoon!</Link>
      </div>
    </>
  );
};

export default WeddingPhotos;
