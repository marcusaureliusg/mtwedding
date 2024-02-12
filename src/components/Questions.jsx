// Questions.jsx
import "./Questions.css";
import { banner4 } from "../assets/banners";
import Banner from "./Banner";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Questions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const banner4Config = {
    srcSet: `${banner4["320"]} 320w, ${banner4["480"]} 480w, ${banner4["768"]} 768w, ${banner4["1366"]} 1366w,`,
    classes: "img-banner img-banner--four",
    src: banner4["1366"], // Default image source
  };

  const faqs = [
    {
      question: "What is the dress code?",
      answer:
        "Dressy casual/semi formal (the ceremony will be on grass so we recommend avoiding pointed heels)",
    },
    {
      question: "What date should I RSVP by?",
      answer:
        "Please RSVP no later than April 20th, but the earlier the better!",
    },
    {
      question: "Are kids allowed?",
      answer:
        "While we love your kids, we are limiting children to those of immediate family (nieces and nephews of the bride and groom).",
    },
    {
      question: "Will the wedding be indoors or outdoors?",
      answer:
        "The ceremony will take place outdoors rain or shine (we recommend bringing an umbrella or rain jacket just in case!), but the reception will be fully indoors.",
    },
    {
      question: "Am I allowed to bring a plus one?",
      answer:
        "Due to space restrictions, we can only allow plus ones if it is clearly stated on your invitation.",
    },
    {
      question: "I got to Livingston before cocktail hour, what should I do?",
      answer:
        "Feel free to go to The Attic early, but if you are not ready yet take a stroll along the Yellowstone River at Sacajawea Park. Alternatively you could check out Whiskey Creek Saloon below The Attic, The Owl(owned by groomsman Pat McCutcheon), and numerous other breweries/bars/shops downtown! ",
    },
    {
      question: "I have allergies- can I eat the reception food?",
      answer:
        "We will be having a buffet style taco bar with gluten free, dairy free, and meat free options. If you have specific allergies, please let us know and we will pass the information to our caterer.",
    },
    {
      question: "Will there be an open bar?",
      answer: (
        <>
          "Yes! We will have bartenders, please bring cash for tips and don't
          forget your <span class="hg-icon"> ID!</span>
        </>
      ),
    },
    {
      question: "Where should we bring/send our wedding gift?",
      answer: (
        <>
          Your presence at our wedding is the greatest gift we could ask for! If
          you would like to honor us with a gift, we have a link to our
          honeymoon fund on the <Link to="/registry">registry tab</Link>.
        </>
      ),
    },
    {
      question: "What time should I arrive for the ceremony?",
      answer:
        "To have plenty of time to park and be situated, please plan to arrive no later than 3.00pm",
    },
    {
      question: "What is parking like at the ceremony?",
      answer: "There is a large field with ample parking",
    },
    {
      question: "What is parking like at the reception?",
      answer:
        "The Attic is in the heart of downtown, so there is not a dedicated parking lot. However, there is generally plenty of off-site parking nearby.",
    },
    {
      question:
        "What do I do if something changes and I can/can't make it after I have RSVPed?",
      answer: (
        <>
          We understand things come up, just email us as soon as possible at{" "}
          <a href="mailto:hello@mtwedding24.com">hello@mtwedding24.com</a>
        </>
      ),
    },
    {
      question:
        "Are credit and debit cards accepted at the venue, or do I need cash?",
      answer: "Both credit/debit cards and cash are accepted at the venue.",
    },
    {
      question: "What weather should I expect?",
      answer:
        "We wish we could tell you- Montana weather is pretty unpredictable! Typically though, June is fairly warm with chances of rain.",
    },
    {
      question: "What should I expect after the ceremony?",
      answer:
        "After the ceremony, the immediate family of the couple will be taking pictures for about 1 hour. Guests can drive over to the reception where snacks and drinks will be flowing. Dinner will be served around 7.30 pm, with dancing to follow.",
    },
    {
      question: "What is the accessibility like at the ceremony and reception?",
      answer:
        "The ceremony is wheelchair accessible, with the caveat of grass and uneven ground. However, the reception space is located atop a flight of stairs. Please let us know if we can help with assistance.",
    },
    {
      question:
        "I’m not feeling that well or was recently exposed to Covid, what should I do?",
      answer: (
        <>
          As much as we will miss celebrating with you, we ask that you please
          refrain from attending if you are{" "}
          <span class="sick-icon"> sick.</span>
        </>
      ),
    },
  ];

  return (
    <>
      <Banner
        srcSet={banner4Config.srcSet}
        classes={banner4Config.classes}
        src={banner4Config.src}
      />
      <div className="wrapper no-padding-bottom" id="questions">
        <section>
          <h2 className="section__header">Frequently Asked Questions</h2>
          <div className="questions-page">
            <div className="questions-container">
              {faqs.map((faq, index) => (
                <div className="question-answer" key={index}>
                  <h2>Q: {faq.question}</h2>
                  <p>A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Navigation Links */}
      <div className="navigation-links">
        <Link to="/registry">Registry</Link>
      </div>
    </>
  );
}

export default Questions;
