/* eslint-disable react/no-unescaped-entities */
// Engagement.jsx
import { Link } from "react-router-dom";
import Banner from "./Banner";
import { useEffect } from "react";
import PhotoWheel from "./PhotoWheel";
import { mwhlImages } from "../assets/hmoon/fest";
import { cwhlImages } from "../assets/hmoon/cph";
import { images } from "../assets/hmoon/alps";
import { banner10 } from "../assets/banners";

function Honeymoon() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const banner10Config = {
    srcSet: `${banner10["320"]} 320w,
            ${banner10["480"]} 480w,
            ${banner10["768"]} 768w,
            ${banner10["1366"]} 1366w,`,
    classes: "img-banner img-banner--ten",
    src: banner10["1366"],
  };

  return (
    <>
      <Banner
        srcSet={banner10Config.srcSet}
        classes={banner10Config.classes}
        src={banner10Config.src}
      />
      <div className="wrapper">
        <section>
          <h2 className="section__header">Copenhagen:</h2>
          <p>
            The first stop of our trip was Copenhagen, Denmark. This city is
            surrounded by ocean canals, beautiful architecture, cobblestone
            streets, and incredible food from all around the world. The first
            morning Marcus swam in the canal (which is filled with thousands of
            tiny harmless jellyfish), and then we explored the city and ate
            delicious street food. We found a place called the Kayak Bar that
            has floating docks where you can sit on the water and watch the
            boats pass by, and spent several evenings there during the trip. The
            following day we made our way to the old town of charming
            cobblestone streets and brick houses, where some structures date
            back to the 12th century. This day was quite rainy, and after a pint
            at the pub we made our way to Tivoli Gardens, the second oldest
            amusement park in the world. Walt Disney visited Tivoli and this was
            his inspiration for Disney World. Since it was cold and rainy, we
            practically had the park to ourselves. It has an almost
            eerie-carnival vibe, but was incredibly beautiful with its vintage
            feel and seasonal summer flower decorations.
          </p>
          <p>
            After a breakfast of cardamom croissants and other out of this world
            pastries, the next day was spent exploring Rosenborg Castle which
            houses the Danish crown jewels and royal crowns. From there we found
            a huge botanical garden, and then the royal grounds where the Queen
            of Denmark and the royal family reside. It was guarded by
            traditional Danish guards (fuzzy hats and all). The next day we did
            some more city exploring followed by a dinner at Ark, a vegan
            Michelin star restaurant that offered a 10 course meal and wine
            pairings. They had the most unique dishes, such as juniper ice cream
            with pine syrup- so good!
          </p>
          <p>
            Freetown Christiania was next on the list. This is a 19 acre commune
            founded in 1971 that is open to the public, and it is admittedly a
            little sketchy. You’re advised to not take photographs, run, or talk
            loudly in certain areas. It was very interesting with a ton of art,
            vendors, and fascinating homes that many of the residents built
            themselves. From there we walked to a year-round “ski hill” that
            sits on the back of an energy plant. We decided to hike to the top
            of it, where you can see Sweden across the ocean. However- we did
            NOT know that the energy plant was in fact a trash processing plant,
            and there were huge vats of steam rolling out along the way that
            smelled so bad Taylor was dry heaving. That adventure behind us, we
            went back into town and ended the night with some food along the
            canal.
          </p>
          <p>
            The next day Reid and Amy arrived! We spent a few days exploring the
            city and also attending a tournament called The International, the
            world’s largest Dota competition. A friend had offered all of us
            free VIP tickets to the event, so we were able to hang out in the
            VIP lounge with unlimited food and drinks! The following day before
            heading back to the International, we stopped at The Glyptotek, a
            massive art museum housing original Van Gogh and Picasso paintings,
            ancient Egyptian artifacts and mummies, original Greek statues, and
            so much more. That night we all went to an Irish Pub where we
            enjoyed live music. Each day in Copenhagen we averaged about 20k
            steps as the city is incredibly walkable, with separate pedestrian
            and biking paths everywhere you went. The final few days were spent
            eating great food and spending time with great friends.
          </p>
        </section>
      </div>
      {/* PhotoWheel with engagement images */}
      <PhotoWheel id="wheel1" images={cwhlImages} />

      <div className="wrapper">
        ↓ keep scrolling!! ↓
        <section>
          <h2 className="section__header">
            Alps (Oberstdorf Germany and Lermoos Austria):
          </h2>
          <p>
            We left a week free between Copenhagen and Munich, and sort of
            procrastinated on finalizing where to go until the day of (oops). We
            flew into Munich still having no plan on where we were going to
            stay, only knowing we were headed to the Alps. On the drive there we
            looked up some hiking towns that were on the lesser-known side, and
            decided on Oberstdorf. We luckily found an opening at a Gasthaus,
            which is essentially a bed and breakfast. The town was incredibly
            charming with traditional Bavarian architecture and food, and very
            welcoming people. It turns out Americans rarely visit this town and
            it’s more of a German vacation destination, and very few people
            spoke English. We did some beautiful hikes, with one having a paved
            road on the way down where you could rent scooters to take you down
            to the bottom which was very fun. We also found a trachten shop and
            were able to buy our Lederhosen and Dirndl.
          </p>
          <p>
            On our way to Lermoos we did a hike through the Breitachklamm gorge,
            the deepest in central Europe. Then we stopped in Füssen, a medieval
            village where we explored an old monastery and a castle as well -
            St. Mang's Abbey and The Gothic High Castle of the Bishops of
            Augsburg. Then finally we arrived at our next GastHaus (named Haus
            Montana) in Lermoos, a tiny Austrian village, where our host Erika
            enthusiastically recommended hikes in the area. The Austrian
            landscape is stunning, with lush green forests and massive
            mountains. We did a hike from one village to another that had two
            mountain huts along the way and some destruction from a recent
            avalanche on the trail. After the first hut, the trail was closed
            for maintenance so we wound up taking a special “Marcus detour” or
            "bangarang" (as Kevin would say) which was essentially straight up
            the steep mountainside with no trail. After some tears shed (by
            Taylor) we made it to the second hut which had the most stunning
            views imaginable and fuzzy cows hanging out near the deck. The owner
            of the hut greeted us with free Pear Schnapps shots, and after the
            other patrons learned it was our honeymoon, bought us a round as
            well. Everyone there was born and raised in the small village and
            spent their weekends hiking and hanging out at the huts together.
            Again, the language barrier was strong but we knew just enough
            German to get by without issue. After dinner in town that night, we
            saw a naughty little goat who escaped his pen, and spent quite a
            while getting him back in, only for him to immediately escape again
            once we turned our backs (we assumed this must be his normal routine
            so left him alone). The following day, we did another hike that
            started at the base of a ski hill and led to a lake. It looked like
            June in Montana, with flowers blooming and green grass, which was a
            treat for September.
          </p>
        </section>
      </div>
      {/* PhotoWheel with engagement images */}
      <PhotoWheel id="wheel2" images={images} />
      <div className="wrapper">
        ↓ keep scrolling!! ↓
        <section>
          <h2 className="section__header">Munich:</h2>
          <p>
            On the drive to Munich we took a pitstop at Linderhof Palace, which
            was located in the middle of a forest and had trails you could hike
            to visit different structures throughout the sprawling grounds.
            After settling into our AirBnB, we met up with Reid, Amy, Nate, and
            Harley and enjoyed a beer garden followed by dinner at our favorite
            Greek restaurant Taverna Paros. It was so fun to be back in Munich
            after spending a week there in 2022. We went to Oktoberfest thinking
            we were going to just walk around the carnival area for the first
            day, but one of Harley’s friends scored a table in the{" "}
            <a href="https://www.oktoberfest.de/en/bierzelte/grosse-zelte/schottenhamel-festhalle">
              Schottenhamel-Festhalle
            </a>
            , so we went in and wound up staying until closing. It was
            absolutely insane but so much fun. There was a live band and of
            course, Maßkrug Festbier! The following day we had a reservation at
            the{" "}
            <a href="https://www.oktoberfest.de/en/beer-tents/big-tents/kaefer-wiesn-schaenke">
              Käfer Wiesn-Schänke
            </a>
            , which is considered the posh tent and very hard to get into -
            thank you Harley! We were incredibly lucky to have been included in
            their reservation and are so grateful! It was a very different
            experience from the prior night, with very good food being served, a
            Bavarian ski hut type ambiance, and actual paparazzi swarming around
            (the band Tokio Hotel was at the table next to us, and the paparazzi
            were practically climbing our table to get to them, it was crazy!).
            We had so much fun dancing and singing and spending time with
            friends, some of the live band even came down next to our table and
            played. The rest of our time in Munich was spent eating Bavarian
            food and strolling around the city (Thank you Harley and Nate for
            planning such an amazing time!).
          </p>
        </section>
      </div>
      {/* PhotoWheel with engagement images */}
      <PhotoWheel id="wheel3" images={mwhlImages} />
      <div className="wrapper">
        <h4>
          Thank you so much to everyone who donated to our honeymoon fund- we
          couldn’t have done it without your generosity and support!
        </h4>
        <section>
          <h2 className="section__header">Whats next?</h2>
          <p>
            Whats next on our agenda? Well aside from our normal day to day we
            are actively looking to go back to Europe in the fall and also back
            to{" "}
            <Link to="/island" className="dp-icon">
              the Island
            </Link>{" "}
            where we got engaged next winter for some fun and adventure...
          </p>
        </section>
      </div>
      {/* Navigation Links */}
      <div className="navigation-links">
        <Link to="/wedding-photos">Back to wedding photos</Link>
      </div>
    </>
  );
}

export default Honeymoon;
