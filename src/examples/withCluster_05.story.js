import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'
import { Twitter } from 'pcln-icons'
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

const generatePointMarker = (color, lat, lng) => (
  <MarkerWrapper key={`PointMarker-${lat}-${lng}`} lat={lat} lng={lng}>
    <Twitter
      size={48}
      color={color}
      style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
      onClick={action(`click on me`)}
    />
  </MarkerWrapper>
)

storiesOf('GoogleSuperCluster', module)
.add('customize callbackFn - advanced 1', () => {
  /** this will utilize the value for selected */
  const hotels = multiMockHotels
  const offColor = '#007aff'
  const onColor= '#800'
  const selectedPool = hotels.map(hotel => hotel.hotelId)
  const selectedId = selectedPool[Math.floor(Math.random()*selectedPool.length)]
  const center = {lat: hotels[0].latitude, lng: hotels[0].longitude}
  const childrenItems = hotels.map(hotel => ({
    longitude: hotel.longitude,
    latitude: hotel.latitude,
    hotelId: hotel.hotelId,
    hotelName: hotel.hotelName,
    hotelPrice: hotel.hotelPrice,
    isSelected: hotel.hotelId === selectedId,
    PointMarker: generatePointMarker(
      hotel.hotelId === selectedId ? onColor : offColor,
      hotel.latitude,
      hotel.longitude
    )
  }))

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
        childrenItems={childrenItems}
        center={center}
        clusterCallback={clusterCallback}
        mapCallbackFn={action(`call mapCallbackFn`)}
        options={{ clickableIcons: false }}
      />
    </div>
  )
})
