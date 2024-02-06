import Banner from "./Banner";
import AccommodationOption from "./AccommodationOption";
import images from "../assets/images.jpeg";
import bzn from "../assets/bzn.jpg";
import { banner3 } from "../assets/banners";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Accomodations() {
  const banner3Config = {
    srcSet: `${banner3["320"]} 320w,
            ${banner3["480"]} 480w,
            ${banner3["768"]} 768w,
            ${banner3["1366"]} 1366w`,
    classes: "img-banner img-banner--three",
    src: banner3["1366"], // Default image source
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Banner
        srcSet={banner3Config.srcSet}
        classes={banner3Config.classes}
        src={banner3Config.src}
      />
      <div className="wrapper" id="accomodation">
        <section>
          <h2 className="section__header">Accomodations</h2>
          <p>
            As we celebrate our special day, we want to ensure that all our
            guests have a comfortable and convenient stay. Our wedding ceremony
            and reception are set in two charming towns, Bozeman and Livingston,
            each offering its unique allure and accommodations.
          </p>
          <div className="row">
            <AccommodationOption
              title="1. Bozeman, Montana"
              imageSrc={bzn}
              imageAlt="Bozeman, Montana"
              contactDetails={[
                "Our ceremony will be held in the town of Bozeman, known for its gorgeous landscapes and variety of outdoor activities. We invite you to explore and enjoy Bozeman's charm by choosing from a wide array of accommodations. Whether you prefer the unique experience of an Airbnb, the intimate setting of a bed and breakfast, or the luxury of a high-end hotel, Bozeman offers perfect options to suit every taste, ensuring your stay enriches your experience of our special day. Bozeman Airport is located approximately 20 minutes from town.",
              ]}
              contactLink={[
                { type: "phone", address: "+1 (406) 937 9466" },
                { type: "email", address: "placetostay@whatever.com" },
              ]}
            />
            <AccommodationOption
              title="2. Livingston, Montana"
              imageSrc={images}
              imageAlt="Livingston, Montana - Downtown Exterior Shot"
              contactDetails={[
                "As the night draws in, we'll move to the lively town of Livingston for our reception, which we expect to continue until the early hours of 2 AM. If your accommodations begin in Bozeman, we recommend considering a transition to lodging in Livingston for the night. A brief 30-minute drive from Bozeman, Livingston boasts a variety of lodging choices, including quaint Airbnbs, cozy inns, and convenient hotels. Staying in Livingston ensures you're right at the heart of the celebration and safely nestled in for the night after the party winds down.",
              ]}
              contactLink={[
                { type: "phone", address: "+1 (406) 222-1350" },
                { type: "email", address: "info@murrayhotel.com" },
                {
                  type: "web",
                  address: "https://www.murrayblock.com/murrayhotel",
                  text: "Murray Hotel Website",
                },
              ]}
            />
          </div>
        </section>
        <span className="link-leader link-leader--inverse">
          <div className="navigation-links">
            <Link to="/engagement">Oh, and what is your engagement story?</Link>
          </div>
        </span>
      </div>
    </>
  );
}

export default Accomodations;
