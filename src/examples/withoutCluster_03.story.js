import React from 'react'
import { storiesOf } from '@storybook/react'
import { multiMockHotels } from './helpers/mockData'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

// legacy functions from old google-map, ideally not needed, but will still support
const greenPath =
  'M14,0 C21.8,0 28,6.2 28,14 C28,24.4 14,40 14,40 C14,40 0,24.4 0,14 C0,6.2 6.2,0 14,0 Z M14,16 C15.12,16 16,15.12 16,14 C16,12.88 15.12,12 14,12 C12.88,12 12,12.88 12,14 C12,15.12 12.88,16 14,16 Z'
const greenFillColor = '#006600'
const renderIcon = (maps, svgPath, fillColor) => {
  return {
    path: svgPath,
    fillColor,
    fillOpacity: 1,
    scale: 1,
    strokeColor: 'white',
    strokeWeight: 4,
    anchor: new maps.Point(12, 44),
  }
}
const renderMarker = (maps, markerIcon, map, lat, lon, hotelName) => {
  const marker = new maps.Marker({
    position: generateLatLong(maps, lat, lon),
    title: hotelName,
    icon: markerIcon,
    map: map,
  })
  return marker
}

const generateLatLong = (maps, lat, lon) => {
  return new maps.LatLng(lat, lon)
}

storiesOf('GSC without Clustering Markers', module)
  .add('With one (legacy) marker', () => {
    const hotels = multiMockHotels.slice(0, 1)
    const mapCallbackFn = (map, maps) => {
      const greenIcon = renderIcon(maps, greenPath, greenFillColor)
      hotels.forEach(hotel => {
        const { hotelName, latitude: lat, longitude: lon } = hotel
        renderMarker(maps, greenIcon, map, lat, lon, hotelName)
      })
    }
    const defaultCenter = { lat: hotels[0].latitude, lng: hotels[0].longitude }
    return (
      <div style={{ height: '500px' }}>
        <GoogleSuperCluster
          elementId={`google-maps-1`}
          mapCallbackFn={mapCallbackFn}
          defaultCenter={defaultCenter}
          defaultZoom={14}
        />
      </div>
    )
  })
  .add('With several (legacy) markers', () => {
    const hotels = multiMockHotels
    const mapCallbackFn = (map, maps) => {
      const greenIcon = renderIcon(maps, greenPath, greenFillColor)
      const bound = new maps.LatLngBounds()
      hotels.forEach(hotel => {
        bound.extend(new maps.LatLng(hotel.latitude, hotel.longitude))
        const { hotelName, latitude: lat, longitude: lon } = hotel
        renderMarker(maps, greenIcon, map, lat, lon, hotelName)
      })
      map.fitBounds(bound)
    }
    const defaultCenter = { lat: hotels[0].latitude, lng: hotels[0].longitude }
    return (
      <div style={{ height: '500px' }}>
        <GoogleSuperCluster
          elementId={`google-maps-multi`}
          mapCallbackFn={mapCallbackFn}
          defaultCenter={defaultCenter}
          defaultZoom={14}
        />
      </div>
    )
  })
