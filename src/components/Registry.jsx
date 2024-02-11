import { banner4 } from "../assets/banners";
import Banner from "./Banner";
import { useEffect } from "react";

const Registry = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const banner4Config = {
    srcSet: `${banner4["320"]} 320w, ${banner4["480"]} 480w, ${banner4["768"]} 768w, ${banner4["1366"]} 1366w,`,
    classes: "img-banner img-banner--four",
    src: banner4["1366"], // Default image source
  };

  return (
    <>
      <Banner
        srcSet={banner4Config.srcSet}
        classes={banner4Config.classes}
        src={banner4Config.src}
      />
      <div className="wrapper no-padding-bottom" id="registry">
        <section>
          <h2 className="section__header">Our Registry</h2>
          <p>
            We are so grateful for your support as we start this new chapter
            together. While your presence at our wedding is the greatest gift of
            all, if you wish to honor us with a gift, we have created a registry
            for our honeymoon fund and some items if physical gifts are more
            your thing. We hope it makes it easy for you to contribute in any
            way you feel comfortable.
          </p>
          <p>Visit our registry: </p>
        </section>
        {/* Navigation Links */}
        <div className="navigation-links">
          <a
            href="https://withjoy.com/marcus-and-taylor/registry"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marcus and Taylor's Registry
          </a>{" "}
        </div>
      </div>
    </>
  );
};

export default Registry;
