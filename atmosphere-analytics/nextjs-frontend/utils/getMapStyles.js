export function mapStyles(darkMode) {
  const mainColor = darkMode ? "#c4b5fd" : "#6d28d9";
  const shade = darkMode ? "#2f2b30" : "#f5f3ff";
  const textColor = !darkMode ? "#ffffff" : "#212121";
  const textStroke = darkMode ? "#ffffff" : "#212121";

  return [
    {
      elementType: "geometry",
      stylers: [
        {
          color: mainColor,
        },
      ],
    },
    {
      elementType: "geometry.fill",
      stylers: [
        {
          saturation: -5,
        },
        {
          lightness: -5,
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: textStroke,
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: shade,
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: textStroke,
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: textStroke,
        },
      ],
    },
    {
      featureType: "road",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: textColor,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: shade,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: textStroke,
        },
      ],
    },
  ];
}
