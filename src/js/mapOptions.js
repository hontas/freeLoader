var google = window.google;
  
module.exports = {
  center: {
      lat: 59.32893000000001,
      lng: 18.06491
  },
  zoom: 12,
  disableDefaultUI: true,
  scrollWheel: false,
  dragable: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.SMALL
  },
  panControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
  }
};