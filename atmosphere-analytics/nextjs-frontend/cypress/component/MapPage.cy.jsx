import { MarkerClustererF, MarkerF } from "@react-google-maps/api";
import MapPage from "../../components/pages/participant-page/map-page/MapPage";

context("<MapPage />", function () {
  beforeEach(() => {
    cy.mount(
      <MapPage
        colors={{
          primary: {
            bg: false ? "bg-[#212121]" : "bg-white",
            text: false ? "text-[#212121]" : "text-white",
            hover: false ? "hover:text-white" : "hover:text-[#212121]",
            violetBg: false ? "bg-violet-300" : "bg-violet-700",
            violetText: false ? "text-violet-700" : "text-violet-300",
            violetHover: false
              ? "group-hover:text-violet-300"
              : "group-hover:text-violet-700",
          },

          primaryRev: {
            bg: !false ? "bg-[#212121]" : "bg-white",
            text: !false ? "text-[#212121]" : "text-white",
            hover: !false ? "hover:text-white" : "hover:text-[#212121]",
            violetBg: !false ? "bg-violet-300" : "bg-violet-700",
            violetText: !false ? "text-violet-700" : "text-violet-300",
            violetHover: !false
              ? "group-hover:text-violet-300"
              : "group-hover:text-violet-700",
          },

          secondary: {
            bg: false ? "bg-[#2f2b30]" : "bg-violet-50",
            text: false ? "text-[#2f2b30]" : "text-violet-50",
            violetBg: false ? "bg-violet-200" : "bg-violet-500",
            violetText: false ? "text-violet-500" : "text-violet-200",
            violetHover: false
              ? "group-hover:text-violet-200"
              : "group-hover:text-violet-500",
          },

          gray: {
            bg: false ? "bg-gray-400" : "bg-gray-500",
            text: false ? "text-gray-400" : "text-gray-500",
          },

          masked: {
            bg: !false ? "bg-gray-100" : "bg-[#272429]",
            text: !false ? "text-gray-100" : "text-gray-600",
          },
        }}
        darkMode={false}
        markers={[
          <MarkerClustererF key={"56789"}>
            {(clusterer) => (
              <MarkerF
                key={"12345"}
                noClustererRedraw={true}
                clusterer={clusterer}
                position={{
                  lat: 53.2734,
                  lng: -7.7783,
                }}
                onClick={() => null}
              />
            )}
          </MarkerClustererF>,
        ]}
        sensors={true}
        open={false}
        setOpen={() => null}
      />
    );
  });

  it("", () => {
    cy.wait(4000);
    cy.get("[data-cy='google-map']");
  });
});
