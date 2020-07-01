import React from 'react'
import { multiMockHotels } from './mockData'
import { Pin } from 'pcln-icons'
import { MapItemContainer } from '../../components/GoogleSuperCluster'

export const generateStoryData = (excludedHotels, withIndex) => {
  const hotels = multiMockHotels.map((hotel, index) => ({
    ...hotel,
    keyIndex: withIndex ? index : undefined,
    isExcluded: excludedHotels.indexOf(hotel.hotelId) > -1,
  }))
  const defaultCenter = {
    lat: hotels[0].latitude,
    lng: hotels[0].longitude,
  }
  const includedColor = '#007aff'
  const excludedColor = '#c00'
  const mapChildern = hotels.map(hotel => (
    <MapItemContainer
      key={`${hotel.latitude}-${hotel.longitude}`}
      lat={hotel.latitude}
      lng={hotel.longitude}
      keyIndex={hotel.keyIndex}
      isExcluded={hotel.isExcluded}
    >
      <Pin
        size={48}
        color={hotel.isExcluded ? excludedColor : includedColor}
        style={{ transform: 'translate(-50%, -100%)' }}
      />
    </MapItemContainer>
  ))
  return { defaultCenter, mapChildern }
}
