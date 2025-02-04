import { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import islandMap from "../assets/island-map.jpg";

function MiniMap() {
  const mainMap = useMap();
  const miniMapRef = useRef(null);
  const miniMapInstance = useRef(null);
  const viewportRect = useRef(null);

  useEffect(() => {
    if (!miniMapRef.current || !mainMap) return;

    const bounds = [
      [0, 0],
      [2359, 3071],
    ];

    console.log("Initializing MiniMap...");

    if (!miniMapInstance.current) {
      miniMapInstance.current = L.map(miniMapRef.current, {
        crs: L.CRS.Simple,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        minZoom: -5, // Lower minimum zoom for better visibility
        maxZoom: -1, //  Prevent excessive zooming
      });

      L.imageOverlay(islandMap, bounds).addTo(miniMapInstance.current);
      miniMapInstance.current.fitBounds(bounds);

      // Explicitly set initial zoom after fitBounds
      miniMapInstance.current.setZoom(-4);

      viewportRect.current = L.rectangle(mainMap.getBounds(), {
        color: "red",
        weight: 2,
        fillOpacity: 0.3,
      }).addTo(miniMapInstance.current);
    }

    // Sync MiniMap Position & Zoom with Main Map
    const updateMiniMap = () => {
      if (!miniMapInstance.current || !viewportRect.current) return;

      const mainCenter = mainMap.getCenter();
      const mainBounds = mainMap.getBounds();
      const mainZoom = mainMap.getZoom();

      console.log(
        "Main Map Zoom:",
        mainZoom,
        "| MiniMap Zoom Before Update:",
        miniMapInstance.current.getZoom()
      );

      // Keep the MiniMap zoomed out relative to the main map
      const miniMapZoom = Math.max(mainZoom - 4, -4);

      // Only update zoom if it's actually changing
      if (miniMapInstance.current.getZoom() !== miniMapZoom) {
        miniMapInstance.current.setView(mainCenter, miniMapZoom, {
          animate: Math.abs(mainZoom - miniMapInstance.current.getZoom()) > 1, // Only animate large jumps
        });
      } else {
        miniMapInstance.current.panTo(mainCenter, { animate: false });
      }

      viewportRect.current.setBounds(mainBounds);
    };

    mainMap.on("move", updateMiniMap);
    mainMap.on("zoom", updateMiniMap);

    return () => {
      mainMap.off("move", updateMiniMap);
      mainMap.off("zoom", updateMiniMap);
    };
  }, [mainMap]);

  return (
    <div className="mini-map-container">
      <div ref={miniMapRef} className="mini-map"></div>
    </div>
  );
}

export default MiniMap;
