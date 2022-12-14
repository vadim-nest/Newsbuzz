function randomCoordinates(lng, lat, index) {

  if (index === 0) return [lng, lat - 0.001];

  // Big thanks to Isaac with helping with the maths here
  let angle = Math.random() * 2 * Math.PI;
  // Was 0.005, decided to increase
  let radius = 0.008 * index;

  const newLat = lat + Math.sin(angle) * radius;
  const newLng = lng + Math.cos(angle) * radius;

  return [newLng, newLat];
}

module.exports = { randomCoordinates };
