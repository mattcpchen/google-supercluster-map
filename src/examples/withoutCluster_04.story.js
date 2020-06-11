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
  'With several markers (thru children)',
  () => {
    const hotels = multiMockHotels

    const defaultCenter = {
      lat: hotels[0].latitude,
      lng: hotels[0].longitude,
    }

    /**
     * pre-generated marker and pass thru children
     */
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
        <GoogleSuperCluster center={defaultCenter} defaultZoom={14}>
          {mapChildern}
        </GoogleSuperCluster>
      </div>
    )
  }
)
