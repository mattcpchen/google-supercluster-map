import React from 'react'
import { storiesOf } from '@storybook/react'
import { multiMockHotels } from './helpers/mockData'
import GoogleSuperCluster from '../components/GoogleSuperCluster'
import { Pin } from 'pcln-icons'

// eslint-disable-next-line react/prop-types
const MarkerWrapper = ({ children }) => (
  <div
    style={{
      left: '0',
      top: '0',
      width: '0',
      height: '0',
      position: 'absolute',
    }}
  >
    {children}
  </div>
)

storiesOf('GSC without Clustering Markers', module).add(
  'With several markers',
  () => {
    const hotels = multiMockHotels

    const defaultCenter = {
      lat: hotels[0].latitude,
      lng: hotels[0].longitude,
    }

    const mapChildern = hotels.map(hotel => {
      const lat = hotel.latitude
      const lng = hotel.longitude
      return (
        <MarkerWrapper key={`${lat}-${lng}`} lat={lat} lng={lng}>
          <Pin
            size={48}
            color='#0071ff'
            style={{ transform: 'translate(-50%, -100%)' }}
          />
        </MarkerWrapper>
      )
    })

    return (
      <div style={{ height: '500px' }}>
        <GoogleSuperCluster
          center={defaultCenter}
          defaultZoom={14}
          options={{ clickableIcons: false }}
        >
          {mapChildern}
        </GoogleSuperCluster>
      </div>
    )
  }
)
