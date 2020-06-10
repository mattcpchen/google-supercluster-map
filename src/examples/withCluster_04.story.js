import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'
import { HotelCircle } from 'pcln-icons'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

// eslint-disable-next-line react/prop-types
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

const generatePointMarker = (lat, lng) => (
  <MarkerWrapper key={`PointMarker-${lat}-${lng}`} lat={lat} lng={lng}>
    <HotelCircle
      size={48}
      color='#007aff'
      style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
      onClick={action(`click on me`)}
    />
  </MarkerWrapper>
)

storiesOf('GoogleSuperCluster', module).add(
  'customize callbackFn - basic',
  () => {
    const hotels = multiMockHotels.slice(0, 7)
    const center = { lat: hotels[0].latitude, lng: hotels[0].longitude }
    const childrenItems = hotels.map(hotel => ({
      longitude: hotel.longitude,
      latitude: hotel.latitude,
      hotelId: hotel.hotelId,
      hotelName: hotel.hotelName,
      hotelPrice: hotel.hotelPrice,
      PointMarker: generatePointMarker(hotel.latitude, hotel.longitude),
    }))

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
          childrenItems={childrenItems}
          center={center}
          clusterCallback={clusterCallback}
          mapCallbackFn={action(`call mapCallbackFn`)}
          options={{ clickableIcons: false }}
        />
      </div>
    )
  }
)
