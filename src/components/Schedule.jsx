import { Link } from "react-router-dom";
import TimelineEvent from "./TimelineEvent";
import { useEffect } from "react";
import Banner from "./Banner";
import { banner1 } from "../assets/banners";
import {
  ceremony,
  dinner,
  drinks,
  music,
  sleep,
  speeches,
  supper,
} from "../assets/icons";

function Schedule() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const events = [
    {
      iconSrc: ceremony,
      iconAlt: "Ceremony icon",
      title: "Ceremony",
      time: "4.00pm",
      description:
        "Our wedding will be performed on the grounds of 155 Cobble Creek Rd",
    },
    {
      iconSrc: drinks,
      iconAlt: "Drinks icon",
      title: "Pre-dinner drinks",
      time: "6.00pm",
      description:
        "Wet your whistle in the Livingston or head to the Attic and have some charcuterie while we say cheese.",
    },
    {
      iconSrc: dinner,
      iconAlt: "Dinner icon",
      title: "Dinner",
      time: "7.30pm",
      description:
        "Dinner will be at the Attic. Please shout if you are violently allergic to anything.",
    },
    {
      iconSrc: speeches,
      iconAlt: "Speeches icon",
      title: "Speeches",
      time: "8.15pm",
      description:
        "Some people will say some words - we will try and keep them brief!",
    },
    {
      iconSrc: music,
      iconAlt: "Music icon",
      title: "Formal Dance",
      time: "9pm",
      description: "Some formal dance 🎶",
    },
    {
      iconSrc: music,
      iconAlt: "Music icon",
      title: "Tunes",
      time: "9.30pm",
      description: "To the dancefloor - lets see your shapes! 💃",
    },
    {
      iconSrc: supper,
      iconAlt: "Supper icon",
      title: "Supper",
      time: "11pm",
      description:
        "We hear dancing is hungry work so a timely refuel will be provided.",
    },
    {
      iconSrc: sleep,
      iconAlt: "Sleep icon",
      title: "Bedtime",
      time: "2.00am",
      description: "Make no fuss - have you no homes to go to? 😉",
    },
  ];

  const banner1Config = {
    srcSet: `${banner1["320"]} 320w,
    ${banner1["480"]} 480w,
    ${banner1["768"]} 768w,
    ${banner1["1366"]} 1366w,`,
    classes: "img-banner img-banner--three",
    src: banner1["1366"], // Default image source
  };

  return (
    <>
      <Banner
        srcSet={banner1Config.srcSet}
        classes={banner1Config.classes}
        src={banner1Config.src}
      />
      <div className="container">
        <div className="wrapper" id="schedule">
          <div className="cd-container">
            <section className="cd-timeline">
              {events.map((event, index) => (
                <TimelineEvent
                  key={index}
                  iconSrc={event.iconSrc}
                  iconAlt={event.iconAlt}
                  title={event.title}
                  time={event.time}
                  description={event.description}
                />
              ))}
            </section>
          </div>
          <span className="link-leader link-leader--inverse">
            <div className="navigation-links">
              <Link to="/location">...and where is it again?</Link>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}

export default Schedule;
