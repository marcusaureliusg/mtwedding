import Banner from "./Banner";
import LocationSection from "./LocationSection";
import { banner2 } from "../assets/banners";
import { useEffect } from "react";

function Location() {
  const banner2Config = {
    srcSet: `${banner2["320"]} 320w,
    ${banner2["480"]} 480w,
    ${banner2["768"]} 768w,
    ${banner2["1366"]} 1366w,`,
    classes: "img-banner img-banner--four",
    src: banner2["1366"], // Default image source
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Banner
        srcSet={banner2Config.srcSet}
        classes={banner2Config.classes}
        src={banner2Config.src}
      />
      <div className="wrapper" id="location">
        <LocationSection
          title="Ceremony"
          description="Our wedding ceremony will take place at the picturesque home of Kate and Monte Beck, situated in the heart of Bozeman's southern landscape. This scenic location features the tranquil Limestone Creek, a large pond, and a beautiful grove of aspen trees, with the Gallatin mountains as our backdrop. We are thrilled to celebrate this momentous day with you all!"
          address="Bozeman, Montana, 155 Cobble Creek Rd"
          satNav="N45° 37.552' W111° 1.618'"
          mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5731.977635969994!2d-111.02748812224594!3d45.62583185798472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53455ad01ed4b40b%3A0xecbb2c522ef1e00e!2s155%20Cobble%20Creek%20Rd%2C%20Bozeman%2C%20MT%2059715!5e1!3m2!1sen!2sus!4v1706843438391!5m2!1sen!2sus"
        />
      </div>
      <div className="wrapper" id="reception">
        <LocationSection
          title="Reception"
          description="The Attic is a purpose-built entertainment venue designed and constructed with the utmost attention to detail. Blending and preserving the 1800’s with contemporary design for the sole purpose of creating an environment that is pleasing to the eye and most importantly acoustically correct."
          address="Livingston, Montana, 110 N Main St"
          satNav="N45 45.6618' W110° 33.6139'"
          mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d937.8724614825162!2d-110.56057000662108!3d45.661888388173644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53457b99bab316b3%3A0xf46e24bb809f170c!2sThe%20Attic%20Montana!5e1!3m2!1sen!2sus!4v1705727233142!5m2!1sen!2sus"
          mapLink="#accomodation"
        />
      </div>
    </>
  );
}

export default Location;
