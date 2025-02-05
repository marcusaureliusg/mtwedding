import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import islandMap from "../assets/island-map.jpg";
import "./Island.css";
import MiniMap from "./MiniMap";
import SmokeMonster from "./SmokeMonster";
import Modal from "./Modal";

function Island() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bounds = [
    [0, 0], // Top-left
    [2359, 3071], // Bottom-right (image dimensions)
  ];
  const mapRef = useRef(null);
  const backgroundRef = useRef(null);
  const smokeLairRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [smokeActive, setSmokeActive] = useState(false); // Track if it's active
  const [showSmoke, setShowSmoke] = useState(false); // Manage smoke state inside Island
  const [modalZIndex, setModalZIndex] = useState(5); // Start in the background

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalContentSrc, setModalContentSrc] = useState("");

  const handleZoom = () => {
    if (!mapRef.current || !backgroundRef.current) return;
    const zoomLevel = mapRef.current.getZoom();

    // Adjust scaling effect for the water background
    const scale = 1 + zoomLevel * 0.1;
    backgroundRef.current.style.transform = `scale(${scale})`;

    // Force Leaflet to refresh markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.setOpacity(1); // Re-render markers
      }
    });
  };

  const locations = [
    {
      name: "The Hatch (Swan)",
      key: "Dharma",
      description:
        "A Dharma Initiative research station designed to study electromagnetic fluctuations. Inside, a button must be pressed every 108 minutes to prevent an unknown catastrophe.",
      position: [593, 945],
    },
    {
      name: "The Flame",
      key: "Dharma",
      description:
        "A communications station for the Dharma Initiative. Once used to contact the outside world, it was later destroyed in an explosion.",
      position: [1564, 1267],
    },
    {
      name: "The Pearl",
      key: "Dharma",
      description:
        "A psychological experiment disguised as a monitoring station. Those stationed here believed they were observing other Dharma members—but were they the ones being observed?",
      position: [857, 1237],
    },
    {
      name: "The Hydra",
      key: "Dharma",
      description:
        "A research station used to study animals, specifically sharks and polar bears. The Others later used it to imprison Jack, Kate, and Sawyer.",
      position: [1476, 2749],
    },
    {
      name: "The Staff",
      key: "Dharma",
      description:
        "A medical facility once used by the Dharma Initiative, later repurposed by the Others. Claire was held here when Ethan took her.",
      position: [1477, 1121],
    },
    {
      name: "The Tempest",
      key: "Dharma",
      description:
        "A Dharma Initiative station designed to regulate and neutralize toxic gases on the Island. The Others later took control of it.",
      position: [1564, 537],
    },
    {
      name: "Black Rock",
      description:
        "A 19th-century slave ship that mysteriously crashed deep inland. It was later revealed to have transported dynamite and was the site of Rousseau’s team’s demise.",
      position: [1003, 1108],
    },
    {
      name: "The Temple",
      description:
        "A centuries-old structure used by the Others as a sanctuary. Protected by the Smoke Monster, it was a place of healing—until its tragic fall.",
      position: [1523, 1664],
    },
    {
      name: "The Orchid",
      key: "Dharma",
      description:
        "A Dharma station built over an underground energy source, used to manipulate space and time. The turn of a wheel within it once moved the entire Island.",
      position: [1065, 908],
    },
    {
      name: "The Looking Glass",
      key: "Dharma",
      description:
        "An underwater Dharma station used to block communications from the Island. Charlie Pace famously drowned here to allow the survivors to send a distress call.",
      position: [749, 2614],
    },
    {
      name: "The Barracks",
      key: "Dharma",
      description:
        "The living quarters of the Others, formerly a Dharma Initiative settlement. Ben Linus ruled from here before it was abandoned.",
      position: [1473, 1248],
    },
    {
      name: "The Arrow",
      key: "Dharma",
      description:
        "One of the lesser-known Dharma stations, originally designed for defense against the Hostiles.",
      position: [1774, 1453],
    },
    {
      name: "Jacob's Cabin",
      description:
        "A mystical moving cabin believed to house Jacob, the Island's guardian. Later, it was revealed that the Man in Black had been using it for deception.",
      position: [675, 1351],
    },
    {
      name: "The Lighthouse",
      description:
        "A hidden structure containing a large mirror used by Jacob to observe people from the outside world. It was destroyed by Jack in frustration.",
      position: [344.5, 1993.5],
    },
    {
      name: "The Caves",
      description:
        "A natural shelter where the survivors first found fresh water and the remains of 'Adam and Eve'.",
      position: [612, 1078],
    },
    {
      name: "The Beach Camp",
      description:
        "The survivors' main camp, located along the shore where Oceanic Flight 815 crashed.",
      position: [484, 1015],
    },
    {
      name: "The Radio Tower",
      description:
        "The location of Rousseau's distress signal, which played on a loop for 16 years before being replaced by Naomi’s rescue team.",
      position: [1213, 1580],
    },
    {
      name: "The Crash Site",
      description:
        "Where Oceanic Flight 815 first crashed. It was later abandoned when the survivors moved to the caves.",
      position: [517, 1373],
    },
    {
      name: "The Submarine Dock",
      description:
        "Used by the Dharma Initiative and the Others to transport people to and from the Island.",
      position: [1356, 1835],
    },
    {
      name: "The Heart of the Island",
      key: "Smoke",
      description:
        "A powerful and mysterious energy source deep within the island. It is the origin of the Smoke Monster and the place where the final battle for the Island's fate took place.",
      position: [352, 1508],
    },
    {
      name: "The Smoke Monster’s Lair",
      key: "SmokeLair",
      description:
        "A dark and ancient underground place. Those who enter rarely return unchanged.",
      position: [1535, 1664],
      onClick: () => {
        if (!smokeActive) {
          console.log("🌫️ Summoning the Smoke Monster...");

          setTimeout(() => {
            setShowSmoke(true);
            // Close the popup
            if (smokeLairRef.current) {
              smokeLairRef.current.closePopup();
            }
          }, 1000);
          setSmokeActive(true);
          setShowModal(true);
          setModalContentSrc(
            "https://www.youtube.com/embed/J2_OtSVEdfc?autoplay=1"
          );
          setModalZIndex(5); // Keep it in the background during the fight
        } else {
          console.log("❌ Smoke Monster already active!");
        }
      },
    },
  ];

  return (
    <>
      {/* Modal */}
      <Modal
        classes="modal-backdrop-eng"
        showModal={showModal}
        contentClass="modal-content-eng"
        onClose={() => setShowModal(false)}
        zIndex={modalZIndex}
      >
        <iframe
          width="560"
          height="315"
          src={modalContentSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Modal>

      <div className="island-container">
        {showSmoke && (
          <SmokeMonster
            onDefeat={() => {
              setSmokeActive(true);
              setShowSmoke(false);
              setShowModal(false); // Hide modal briefly
              setTimeout(() => {
                setModalContentSrc(
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1797689955&color=%23b442ca&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                );
                setShowModal(true); // Re-show with updated content
                setModalZIndex(100000); // Bring the modal to the foreground
              }, 10);
            }}
            onEnveloped={() => {
              setSmokeActive(false);
              setShowSmoke(false);
              setModalZIndex(100000); // Bring the modal to the foreground
            }}
          />
        )}

        {/* Ocean Background (Separate from Map) */}
        <div ref={backgroundRef} className="ocean-background"></div>

        {/* Leaflet Map */}
        <MapContainer
          center={[1179.5, 1535.5]} // Centered on the middle of the image
          zoom={-2}
          minZoom={-3}
          maxZoom={1}
          crs={L.CRS.Simple}
          className="island-map"
          whenCreated={(map) => {
            mapRef.current = map;
            setMapInstance(map);
            map.on("zoom", handleZoom); // Attach zoom event
          }}
        >
          {/* Add MiniMap */}
          <MiniMap />
          {/* Island Image as the Main Map */}
          <ImageOverlay url={islandMap} bounds={bounds} />

          {/* 📍 Invisible Interactive Markers */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location.position}
              ref={location.key === "SmokeLair" ? smokeLairRef : null}
              icon={L.divIcon({
                className: "",
                html: `<div class="custom-marker" style="background-color: ${
                  location.key === "Dharma"
                    ? "red"
                    : location.key === "Smoke"
                    ? "black"
                    : location.key === "SmokeLair"
                    ? "white"
                    : "blue"
                }"></div>`,
                iconSize: [12, 12], // Matches the CSS marker size
                iconAnchor: [6, 6], // Offsets the marker so it's centered at position
              })}
              eventHandlers={{
                click: () => {
                  console.log(`Clicked on: ${location.name}`);
                  if (location.onClick) location.onClick();
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                {location.name}
              </Tooltip>
              <Popup>
                <strong>{location.name}</strong>
                <p>{location.description}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default Island;
