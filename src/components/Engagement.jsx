/* eslint-disable react/no-unescaped-entities */
// Engagement.jsx
import { Link } from "react-router-dom";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import PhotoWheel from "./PhotoWheel";
import { engagementImages } from "../assets/engagement";
import { banner5 } from "../assets/banners";
import engagementPhoto from "../assets/engagement/bluehole.jpg";
import Modal from "./Modal";

function Engagement() {
  const [showModal, setShowModal] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const text = `Marcus said they should take a photo together, so he propped his
  phone up and set a “timer” on it (he was actually recording a
  video). Taylor thought the photo was taken, but Marcus didn’t move.
  He looked at her, nervously and silently rubbing her arms. “I love
  you,” he said. Then after a moment, “Will you marry me?” It was an
  absolute surprise, and Taylor asked “Are you serious?! You’re not
  messing with me??”. Once he confirmed he was not joking, the Weeping
  Wall became a very fitting name for the situation. Eventually Taylor
  remembered to say yes and Marcus dug the ring box out of his
  backpack. Taylor could barely hold herself together she was so
  happy.`;
  const words = text.split(" ");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let intervalId;
    let startDelay = 5000; // Delay in milliseconds before starting highlighting

    if (showModal) {
      // Delay the start of the interval
      const startInterval = () => {
        intervalId = setInterval(() => {
          setHighlightIndex((prevIndex) => {
            if (prevIndex < words.length - 1) {
              return prevIndex + 1;
            } else {
              clearInterval(intervalId);
              return prevIndex;
            }
          });
        }, 300);
      };
      const delayTimeout = setTimeout(startInterval, startDelay);

      // Cleanup delayTimeout on unmount or when showModal changes
      return () => {
        clearTimeout(delayTimeout);
        clearInterval(intervalId);
      };
    } else {
      setHighlightIndex(-1); // Reset highlighting when modal is closed
    }
  }, [showModal, words.length]);

  const banner1Config = {
    srcSet: `${banner5["320"]} 320w,
            ${banner5["480"]} 480w,
            ${banner5["768"]} 768w,
            ${banner5["1366"]} 1366w,`,
    classes: "img-banner img-banner--five",
    src: banner5["1366"],
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setHighlightIndex(-1); // Reset highlighting when modal is closed
  };

  return (
    <>
      <Banner
        srcSet={banner1Config.srcSet}
        classes={banner1Config.classes}
        src={banner1Config.src}
      />
      <div className="wrapper">
        <section>
          <h2 className="section__header">Proposal Story</h2>
          <p>
            Marcus proposed on December 10th, 2022 at the Blue Hole along the
            Weeping Wall on the island of Kauai. This is one of the rainiest
            spots on earth nestled in a deep canyon below the highest point in
            Kauai on Mt. Waiʻaleʻale.
          </p>
          <img
            src={engagementPhoto}
            alt="Engagement Moment"
            className="engagement-photo"
            loading="lazy"
          />
          <p>
            Marcus and Taylor landed on Kauai around midnight on December 9th,
            rented a car, and went straight to Taco Bell to re-fuel. After
            fruitlessly searching the supermarket for celebratory vacation booze
            (Kauai doesn’t sell alcohol in stores after 11pm), they checked into
            their hotel and went to bed.
          </p>
          <p>
            The next morning, the local
            <span className="rooster-icon"> roosters </span>
            woke them up at the ungodly hour of 5am. Giving up on sleep, Marcus
            asked Taylor if she wanted to get up and do a really beautiful hike
            to a waterfall. She agreed and after a quick breakfast they were
            off.
          </p>
          <p>
            Taylor knew absolutely nothing about this hike, as is the case with
            most of their adventures. She didn’t know that it is one of the most
            dangerous hikes on Kauai, with multiple websites warning prospective
            hikers about flash floods, unforgiving terrain, "the hardest
            day-hike in the world", and the occasional need to have to spend the
            night on sloped hillsides due to impassable river or be rescued via
            helicopter. One even says “you have to suffer for the magic.” Flash
            floods are especially risky during the rainy season, and it just so
            happened that they were visiting during the rainiest month of the
            year. <span className="numbers-icon"> Luckily, </span>Marcus had
            been monitoring the stream gauges and knew that they had a small
            window.
          </p>
          <p>
            The drive to the base of the hike was an adventure in itself, with
            the road crossing two rivers that their little rental car was
            certainly not intended for. They even passed through what is left of
            the original gates of Jurassic park. Once the car couldn’t go
            further through the mud and rocks, they parked and started the hike
            early. Marcus warned Taylor that on the island there is a bacteria
            in the water and mud called Leptospira that can make you really sick
            if it’s ingested or gets in your eyes. So naturally, within about 20
            feet of starting the hike Taylor walked into a muddy stick that
            stabbed her in the eye. Lepto be damned, they kept going.
          </p>
          <p>
            The true start of the hike is located where the t-rex paddock was
            filmed in Jurassic park. No one else was there, and they didn’t see
            any cars coming down on the way up either. They also didn’t have
            cell phone service and did not tell anyone where they would be that
            day (oops). Thankfully the weather was beautiful and they were super
            excited to get to hike in Hawaii, something neither of them had done
            before.
          </p>
          <p>
            To say it’s a “hike” is a bit misleading- it’s more of a literal
            jungle gym obstacle course of wading through waist or chest deep
            water, climbing over boulders, getting in and out of sinking mud,
            hanging onto vines and roots, rock scrambling, using ropes to climb
            up and down cliff sides, and no true trail to follow. The entire
            hike is uneven and slippery with every step you take. It was super
            challenging but in the most fun way imaginable, and the beauty was
            breathtaking.
          </p>
          <p>
            Eventually they could see their destination- The Blue Hole/Weeping
            Wall, one of the wettest places on Earth. Though it’s been dormant
            for many years, the mountain was once an active volcano so it has a
            volcanic shield that captures all the moisture brought in on the
            trade winds. Steep cliffs also act as a trap, sending moisture back
            into its midst, creating even wetter conditions. The Blue Hole is
            also one of the most sacred places on Kauai, with myth saying that
            the highest Hawaiian god, creator Kane, was born on top of
            Waialeale. It is also the source of all fresh water on the island.
          </p>
          <p>
            They made their way into the cavern, the base of hundreds of small
            waterfalls. Mist filled the air and the view looked out through an
            amphitheater-like mountain that looked out into the canyon they just
            hiked.
          </p>
          <button className="eng" onClick={openModal}>
            Stop Reading and Click Here!
          </button>
          <p>
            {words.map((word, index) => (
              <span
                key={index}
                className={
                  index <= highlightIndex ? "highlighted" : "non-highlighted"
                }
                style={{
                  transition: "all 0.3s ease", // Smooth transition for any style changes
                }}
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <p>
            Marcus allowed a few moments of celebration and
            <span className="dp-icon"> photos </span> before saying “OK we need
            to get the f out of here”. He knew the water levels would be rising
            soon and wanted to make sure they got out safely (Taylor just
            thought it was because they were picking up Marcus’s brother and
            family from the airport). He made her put the ring safely back
            inside his pack for the hike down, and they made it back to the car
            after 7 hours total and with a few hours to spare before the canyon
            started flash flooding. See, totally safe.
          </p>
          <p>
            The rest of the trip was spent in post engagement bliss, drinking
            P.O.G. cocktails, swimming in the ocean, watching sunsets every
            night, time with family, whale watching, and a few more hikes around
            the Napali Coast.
          </p>
          <p></p>
        </section>
        ↓ Check out some photos of this adventure below!! ↓
      </div>

      {/* Navigation Links */}
      <div className="navigation-links">
        <Link to="/rsvp">Cuuute! I want to RSVP</Link>
      </div>

      {/* PhotoWheel with engagement images */}
      <PhotoWheel images={engagementImages} />
      <Modal
        showModal={showModal}
        onClose={closeModal}
        classes="modal-backdrop-eng"
        contentClass="modal-content-eng"
      >
        <iframe
          id="orientation"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Nu5h5v_6-Z8?si=eDLd11yU0vNrUw4Y&autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Modal>
    </>
  );
}

export default Engagement;
