import React from 'react'
import { storiesOf } from '@storybook/react'
import { multiMockHotels } from './helpers/mockData'
import { Pin } from 'pcln-icons'
import { MapItemContainer } from '../components/GoogleSuperCluster'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GSC with clustering', module).add('default setting', () => {
  const hotels = multiMockHotels

  const defaultCenter = {
    lat: hotels[0].latitude,
    lng: hotels[0].longitude,
  }

  const mapChildern = hotels.map(hotel => (
    <MapItemContainer
      key={`${hotel.latitude}-${hotel.longitude}`}
      lat={hotel.latitude}
      lng={hotel.longitude}
    >
      <Pin
        size={48}
        color='#0071ff'
        style={{ transform: 'translate(-50%, -100%)' }}
      />
    </MapItemContainer>
  ))

  return (
    <div style={{ height: '500px' }}>
      <GoogleSuperCluster
        isClustering
        center={defaultCenter}
        defaultZoom={14}
        options={{ clickableIcons: false }}
      >
        {mapChildern}
      </GoogleSuperCluster>
    </div>
  )
})
