import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'
import { Twitter } from 'pcln-icons'
import { PointMarkerWrapper } from '../components/GSCMarkers'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

const generatePointMarker = (color, lat, lng) => (
  <PointMarkerWrapper key={`PointMarker-${lat}-${lng}`} lat={lat} lng={lng}>
    <Twitter
      size={48}
      color={color}
      style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
      onClick={action(`click on me`)}
    />
  </PointMarkerWrapper>
)

storiesOf('GoogleSuperCluster', module).add(
  'customize callbackFn - advanced 1',
  () => {
    /** this will utilize the value for selected */
    const hotels = multiMockHotels
    const offColor = '#007aff'
    const onColor = '#800'
    const selectedPool = hotels.map(hotel => hotel.hotelId)
    const selectedId =
      selectedPool[Math.floor(Math.random() * selectedPool.length)]
    const center = { lat: hotels[0].latitude, lng: hotels[0].longitude }

    const mapChildren = hotels.map(hotel => (
      <PointMarkerWrapper
        key={`PointMarker-${hotel.latitude}-${hotel.longitude}`}
        lat={hotel.latitude}
        lng={hotel.longitude}
        hotelId={hotel.hotelId}
        hotelName={hotel.hotelName}
        hotelPrice={hotel.hotelPrice}
        isSelected={hotel.hotelId === selectedId}
      >
        <Twitter
          size={48}
          color={hotel.hotelId === selectedId ? onColor : offColor}
          style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
          onClick={action(`click on me`)}
        />
      </PointMarkerWrapper>
    ))

    const clusterCallback = ({ clusterPoints }) => {
      const clusterPointsCount = clusterPoints.length
      const clusterSize = 60
      const isClusterSelected = clusterPoints.reduce((acc, point) => {
        return acc || point.isSelected
      }, false)
      const clusterColor = isClusterSelected ? onColor : offColor
      const clusterTitle = isClusterSelected
        ? '1 Red'
        : `${clusterPointsCount} Birds`
      const clusterSubtitle = isClusterSelected
        ? `+ ${clusterPointsCount - 1} Birds`
        : ''
      return { clusterSize, clusterColor, clusterTitle, clusterSubtitle }
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
