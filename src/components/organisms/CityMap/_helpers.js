export const getCenterPoint = hotels => {
  const numberOfHotels = hotels.length
  let lats = 0
  let lngs = 0

  for (const hotel of hotels) {
    lats += hotel.location?.latitude ?? hotel.latitude
    lngs += hotel.location?.longitude ?? hotel.longitude
  }
  return { lat: lats / numberOfHotels, lng: lngs / numberOfHotels }
}

export const getRandomPoint = hotels => {
  const randHotel = hotels[Math.floor(Math.random() * hotels.length)]
  return getCenterPoint([randHotel])
}
