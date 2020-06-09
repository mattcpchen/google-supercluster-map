import React from 'react'
import { storiesOf } from '@storybook/react'
import { multiMockHotels } from './helpers/mockData'
import GoogleSuperCluster from '../components/GoogleSuperCluster'
import { Pin } from 'pcln-icons'

const MarkerWrapper = ({ elementref, children }) => (
  <div
    ref={elementref}
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

storiesOf('GoogleMapReact', module)
  .add('With several markers & markerWrapper', () => {
    const hotels = multiMockHotels

    const defaultCenter = {
      lat: hotels[0].latitude,
      lng: hotels[0].longitude
    }

    const mapChildern = hotels.map(hotel => {
      const latitude = hotel.latitude
      const longitude = hotel.longitude
      return (
        <MarkerWrapper key={latitude} lat={latitude} lng={longitude}>
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
        >
          {mapChildern}
        </GoogleSuperCluster>
      </div>
    )
  })
