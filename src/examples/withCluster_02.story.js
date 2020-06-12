import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'
import { FlightCircle } from 'pcln-icons'
import { PointMarkerWrapper } from '../components/GSCMarkers'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GoogleSuperCluster', module).add('customize PointMarker', () => {
  const hotels = multiMockHotels.slice(0, 5)
  const center = { lat: hotels[0].latitude, lng: hotels[0].longitude }
  const mapChildren = hotels.map(hotel => (
    <PointMarkerWrapper
      key={`PointMarker-${hotel.latitude}-${hotel.longitude}`}
      lat={hotel.latitude}
      lng={hotel.longitude}
    >
      <FlightCircle
        size={48}
        color='#007aff'
        style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
        onClick={action(`click on me`)}
      />
    </PointMarkerWrapper>
  ))

  return (
    <div style={{ height: '500px' }}>
      <GoogleSuperCluster
        isClustering
        center={center}
        mapCallbackFn={action(`call mapCallbackFn`)}
        options={{ clickableIcons: false }}
      >
        {mapChildren}
      </GoogleSuperCluster>
    </div>
  )
})
