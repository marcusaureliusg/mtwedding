/* eslint-disable react/no-unescaped-entities */

import { useEffect } from "react";

import LinkPreview from "./LinkPreview";

const WeddingPhotos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="wrapper no-padding-bottom" id="gallery">
        <section>
          <h2 className="section__header">Our Wedding Photos</h2>
          <p>
            What a celebration! We had such an incredible day with you all and
            feel truly lucky and taylor write this please
          </p>
          <p>Visit our gallery: </p>
        </section>
        {/* Navigation Links */}
        <LinkPreview
          url="https://malloryjeanphotos.pic-time.com/-taylormarcus/gallery"
          linkText="Wedding Gallery"
        />
      </div>
    </>
  );
};

export default WeddingPhotos;
