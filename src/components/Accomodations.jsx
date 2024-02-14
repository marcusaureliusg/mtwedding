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
                {
                  type: "web",
                  address:
                    "https://www.vrbo.com/vacation-rentals/usa/montana/yellowstone/bozeman?locale=en_US&siteid=9001001&semcid=VRBO-US.UB.GOOGLE.DT-c-EN.VR&semdtl=a112239513951.b1118981147084.g1kwd-185321356.e1c.m1Cj0KCQiAw6yuBhDrARIsACf94RXWf-xIabKEbyXir35Qo6j9SoPT-c-s4Suf3H4bH0o52o1Tcl510_0aAt7uEALw_wcB.r1df07cce753a64fa90d2f43191f7e728dec7d16333a5b75989d4fb28a0ae50a8a.c1.j11020859.k1.d1618077463255.h1e.i1.l1.n1.o1.p1.q1.s1.t1.x1.f1.u1.v1.w1&gad_source=1&gclid=Cj0KCQiAw6yuBhDrARIsACf94RXWf-xIabKEbyXir35Qo6j9SoPT-c-s4Suf3H4bH0o52o1Tcl510_0aAt7uEALw_wcB",
                  text: "Bozeman VRBO's",
                },
                {
                  type: "web",
                  address:
                    "https://www.airbnb.com/s/Bozeman--Montana--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&monthly_start_date=2024-06-06&monthly_length=4&monthly_end_date=2024-06-01&price_filter_input_type=0&channel=EXPLORE&zoom_level=11&search_type=filter_change&price_filter_num_nights=4&gps_lat=46.7815672&gps_lng=-111.9205455&query=Bozeman%2C%20MT&place_id=ChIJE4i6T0xERVMRqmA792TQ9WM&date_picker_type=calendar&flexible_date_search_filter_type=0&flexible_trip_lengths%5B%5D=weekend_trip&checkin=2024-06-06&checkout=2024-06-10&source=structured_search_input_header&ne_lat=45.80266521946993&ne_lng=-110.94690970432617&sw_lat=45.57491799337808&sw_lng=-111.13030631111081&zoom=11.70684345504689&search_by_map=true",
                  text: "Bozeman Airbnb's",
                },
                {
                  type: "web",
                  address:
                    "https://www.tripadvisor.com/Hotels-g45095-Bozeman_Montana-Hotels.html",
                  text: "Some Bozeman Hotels",
                },
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
                {
                  type: "web",
                  address:
                    "https://www.vrbo.com/vacation-rentals/usa/montana/yellowstone/livingston?locale=en_US&siteid=9001001&semcid=VRBO-US.UB.GOOGLE.DT-c-EN.VR&semdtl=a112239513951.b1118981146364.g1kwd-186566956.e1c.m1Cj0KCQiAw6yuBhDrARIsACf94RVimQAFREVYwBv7gZabRgzI4QymY1Z6BbCg7GkUzf1peOUntAHo600aAuHHEALw_wcB.r19fb2fecd7a994c0b72d66a68c325b612e6bf561df88f45ca06d501f5c8f58218.c1.j11020859.k1.d1618076532139.h1e.i1.l1.n1.o1.p1.q1.s1.t1.x1.f1.u1.v1.w1&gad_source=1&gclid=Cj0KCQiAw6yuBhDrARIsACf94RVimQAFREVYwBv7gZabRgzI4QymY1Z6BbCg7GkUzf1peOUntAHo600aAuHHEALw_wcB",
                  text: "Livingston VRBO's",
                },
                {
                  type: "web",
                  address:
                    "https://www.airbnb.com/s/Bozeman--Montana--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&monthly_start_date=2024-06-06&monthly_length=4&monthly_end_date=2024-06-01&price_filter_input_type=0&channel=EXPLORE&zoom_level=12.70162924679827&search_type=user_map_move&price_filter_num_nights=4&gps_lat=46.7815672&gps_lng=-111.9205455&query=Bozeman%2C%20MT&place_id=ChIJE4i6T0xERVMRqmA792TQ9WM&date_picker_type=calendar&flexible_date_search_filter_type=0&flexible_trip_lengths%5B%5D=weekend_trip&checkin=2024-06-06&checkout=2024-06-10&source=structured_search_input_header&ne_lat=45.73801523402517&ne_lng=-110.3644861625445&sw_lat=45.57290264240561&sw_lng=-110.81603208299038&zoom=12.70162924679827&search_by_map=true",
                  text: "Livingston Airbnb's",
                },
                {
                  type: "web",
                  address:
                    "https://www.tripadvisor.com/SmartDeals-g45253-Livingston_Montana-Hotel-Deals.html",
                  text: "Some Livingston Hotels",
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
