import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'
import { HotelCircle } from 'pcln-icons'
import { PointMarkerWrapper } from '../components/GSCMarkers'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GoogleSuperCluster', module).add(
  'customize callbackFn - basic',
  () => {
    const hotels = multiMockHotels.slice(0, 7)
    const center = { lat: hotels[0].latitude, lng: hotels[0].longitude }
    const mapChildren = hotels.map(hotel => (
      <PointMarkerWrapper
        key={`PointMarker-${hotel.hotelId}`}
        lat={hotel.latitude}
        lng={hotel.longitude}
        hotelId={hotel.hotelId}
        hotelName={hotel.hotelName}
        hotelPrice={hotel.hotelPrice}
      >
        <HotelCircle
          size={48}
          color='#007aff'
          style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
          onClick={action(`click on me`)}
        />
      </PointMarkerWrapper>
    ))

    const clusterCallback = ({ totalPointsCount, clusterPoints }) => {
      const clusterPointsCount = clusterPoints.length
      const clusterSize = 45 + (clusterPointsCount / totalPointsCount) * 55
      const clusterTitle = `${clusterPointsCount} Hotels`
      const clusterSubtitle = clusterPoints
        .map(point => point.hotelPrice)
        .join(' | ')
      return { clusterSize, clusterTitle, clusterSubtitle }
    }

    return (
      <div style={{ height: '500px' }}>
        <GoogleSuperCluster
          isClustering
          center={center}
          clusterCallback={clusterCallback}
          mapCallbackFn={action(`call mapCallbackFn`)}
          options={{ clickableIcons: false }}
        >
          {mapChildren}
        </GoogleSuperCluster>
      </div>
    )
  }
)
