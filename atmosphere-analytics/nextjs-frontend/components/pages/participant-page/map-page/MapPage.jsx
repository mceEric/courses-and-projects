import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";
import { Oval } from "react-loader-spinner";
import { mapStyles } from "../../../../utils/getMapStyles";
import GraphTop from "../../../shared/graphs/GraphTop";
import OverlayAnimationSlide from "../../../shared/overlays/animations/OverlayAnimationSlide";
import OverlayAnimationFade from "../../../shared/overlays/animations/OverlayAnimationFade";

function MapPage({ colors, darkMode, markers, sensors, open, setOpen }) {
  const center = {
    lat: 53.2734,
    lng: -7.77832031,
  };

  const styles = mapStyles(darkMode);

  // Changes map configurations if darkmode or sensors values change
  const map = useMemo(() => {
    return (
      <GoogleMap
        options={{
          styles,
          fullscreenControl: false,
          mapTypeControl: false,
          disableDoubleClickZoom: true,
          minZoom: 3,
        }}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={8}
        center={center}
      >
        {markers}
      </GoogleMap>
    );
  }, [darkMode, sensors]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY,
  });

  return (
    <div
      data-cy="google-map"
      className={`w-full relative h-full center-content bg-violet-300`}
    >
      {isLoaded && map}
      <OverlayAnimationSlide
        open={open}
        setOpen={setOpen}
        handleClick={() => null}
        direction={"down"}
        component={
          <div
            data-cy="item-study-enlarged"
            className="w-full h-full bg-violet-50 center-content"
          >
            <GraphTop
              colors={colors}
              locationPermission={"granted"}
              airSensorId={open && open.id}
              setData={setOpen}
              country={open && open.country}
              extraClasses={"h-full pb-4"}
            />
          </div>
        }
      />
      <OverlayAnimationFade
        open={!isLoaded}
        setOpen={() => null}
        handleClick={() => null}
        component={
          <Oval
            height={100}
            width={100}
            color={darkMode ? "#c4b5fd" : "#6d28d9"}
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor={darkMode ? "#2f2b30" : "#f5f3ff"}
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        }
      />
      {sensors === null && isLoaded && (
        <div className="absolute z-40 m-auto center-content">
          <Oval
            height={100}
            width={100}
            color={darkMode ? "#c4b5fd" : "#6d28d9"}
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor={darkMode ? "#2f2b30" : "#f5f3ff"}
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </div>
  );
}

export default MapPage;
