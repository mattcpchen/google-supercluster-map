
export const trimHotels = (hotels) => {
  let maxCount = 50 // always get 50, decide how many to use in each city
  maxCount = Math.min(maxCount, hotels.length)
  const start = Math.floor(Math.random() * hotels.length)
  const trims = []
  for(let i=start; i< start + maxCount; i++) {
    const index = i%hotels.length
    trims.push(hotels[index])
  }
  return trims
}
