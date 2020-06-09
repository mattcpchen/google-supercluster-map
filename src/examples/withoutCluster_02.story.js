import React from 'react'
import { storiesOf } from '@storybook/react'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

const hotelData = {
  hotelName: 'Crowne Plaza Times Square Manhattan',
  address: '127 West 42th Street, New York, NY 10015',
  thumbnailUrl: 'http://aff.bstatic.com/images/hotel/max500/887/88780962.jpg',
  guestScore: 7.5,
  lat: 40.760769,
  lon: -73.984417,
  zoneCoords: [
    { lat: 40.75353661, lng: -73.985194 },
    { lat: 40.75206096, lng: -73.98622118 },
    { lat: 40.75564839, lng: -73.99396826 },
    { lat: 40.75657043, lng: -73.9931652 },
    { lat: 40.75752221, lng: -73.99301648 },
    { lat: 40.76207293, lng: -73.989596 },
    { lat: 40.76585343, lng: -73.98704268 },
    { lat: 40.76189447, lng: -73.97882894 },
    { lat: 40.75353661, lng: -73.985194 },
  ],
}

const renderZone = (maps, zoneCoords) => {
  return new maps.Polygon({
    paths: zoneCoords,
    strokeColor: '#0a84c1',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0a84c1',
    fillOpacity: 0.1,
  })
}

storiesOf('GoogleMapReact', module)
  .add('PolygonZone only', () => {
    const mapCallbackFn = (map, maps) => {
      const { zoneCoords } = hotelData
      const polygonZone = renderZone(maps, zoneCoords)
      polygonZone.setMap(map)
    }

    const props = {
      elementId: 'google-maps-2',
      mapCallbackFn,
      defaultCenter: {
        lat: 40.760769,
        lng: -73.984417,
      },
      defaultZoom: 14,
      options: {
        disableDefaultUI: true,
      },
    }

    return (
      <div style={{ height: '500px' }}>
        <GoogleSuperCluster {...props} />
      </div>
    )
  })
