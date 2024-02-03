/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { banner7 } from "../assets/banners";
import Banner from "./Banner";
import "./Rsvp.css";
import { Link } from "react-router-dom";

const Rsvp = () => {
  const [names, setNames] = useState([""]);
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState("");
  const [comment, setComment] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const banner1Config = {
    srcSet: `${banner7["320"]} 320w,
      ${banner7["480"]} 480w,
      ${banner7["768"]} 768w,
      ${banner7["1366"]} 1366w,`,
    classes: "img-banner img-banner--three",
    src: banner7["1366"], // Default image source
  };

  const handleAddName = () => {
    if (names.length < 4) {
      // Limit the number of names that can be added
      setNames([...names, ""]);
    }
  };

  const handleRemoveName = (index) => {
    const filteredNames = names.filter((_, i) => i !== index);
    setNames(filteredNames);
  };

  const handleNameChange = (index, event) => {
    const newNames = names.map((name, i) =>
      i === index ? event.target.value : name
    );
    setNames(newNames);
  };

  const validateForm = () => {
    if (names.some((name) => name.trim() === "") || !email || !attendance) {
      setSubmitStatus("Please fill in all fields correctly.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await addDoc(collection(db, "rsvps"), {
          names,
          email,
          attendance,
          comment,
        });
        setNames([""]);
        setEmail("");
        setAttendance("");
        setComment("");
        setSubmitStatus("RSVP submitted successfully!");
      } catch (error) {
        console.error("Error adding RSVP: ", error);
        setSubmitStatus("Failed to submit RSVP. Please try again.");
      }
    }
  };

  return (
    <>
      <Banner
        srcSet={banner1Config.srcSet}
        classes={banner1Config.classes}
        src={banner1Config.src}
      ></Banner>
      <div className="wrapper no-padding-bottom rsvp" id="rsvp">
        <section>
          <h2 className="section__header">RSVP</h2>
          <p>
            Once you receive your invitation in the post, we'd appreciate if you
            could RSVP by <b>Saturday, April 20th 2024</b> - to do so please fill
            out the RSVP form below, with the names from the invitation that are
            attending, your email, and your attendance preference.
          </p>
          {submitStatus && <p className="submit-status">{submitStatus}</p>}
          <form onSubmit={handleSubmit}>
            {names.map((name, index) => (
              <div key={index} className="name-field">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e)}
                  placeholder={`Name ${index + 1}`}
                  required
                />
                {names.length > 1 && (
                  <button type="button" onClick={() => handleRemoveName(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddName}>
              Add Name
            </button>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              required
            >
              <option value="">Select Attendance</option>
              <option value="joyfully accept">Joyfully Accept</option>
              <option value="regretfully decline">Regretfully Decline</option>
            </select>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Additional Comments"
            ></textarea>
            <button type="submit" className="button">
              Submit RSVP
            </button>
          </form>
          <p>
            If you have any questions about any of the above, please don't
            hesitate to pop an email to:{" "}
            <a href="mailto:hello@mtwedding24.com">hello@mtwedding24.com</a>
          </p>
          <p>
            If snail mail is your thing - our postal address is;
          </p>
          <p>
            9455 Big Gulch Drive
            <br />
            Bozeman, Montana
            <br />
            59715
          </p>
        </section>
      </div>
      <div className="navigation-links">
        <Link to="/questions">Also check the Q&A page!</Link>
      </div>
    </>
  );
};

export default Rsvp;
