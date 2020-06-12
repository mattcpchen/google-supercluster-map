import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'
import { HotelCircle, Discount } from 'pcln-icons'
import { PointMarkerWrapper } from '../components/GSCMarkers'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GoogleSuperCluster', module).add(
  'customize callbackFn - advanced 2',
  () => {
    /** this will utilize the value / maxValue / minValue features */
    const lightColor = '#007aff'
    const darkColor = '#004499'
    const winnerColor = `#800`
    const cheapest = 100 // my original setting
    const hotels = multiMockHotels.slice(0, 7)
    const center = { lat: hotels[0].latitude, lng: hotels[0].longitude }
    const mapChildren = hotels.map(hotel => {
      const lat = hotel.latitude
      const lng = hotel.longitude
      const Marker = hotel.hotelPriceValue === cheapest ? Discount : HotelCircle
      const color =
        hotel.hotelPriceValue === cheapest ? winnerColor : lightColor
      return (
        <PointMarkerWrapper
          key={`PointMarker-${lat}-${lng}`}
          lat={lat}
          lng={lng}
          hotelId={hotel.hotelId}
          hotelName={hotel.hotelName}
          hotelPrice={hotel.hotelPrice}
          hotelPriceValue={hotel.hotelPriceValue}
          isCheapest={hotel.hotelPriceValue === 100}
        >
          <Marker
            size={48}
            color={color}
            style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
            onClick={action(`click on me`)}
          />
        </PointMarkerWrapper>
      )
    })

    const clusterCallback = ({ totalPointsCount, clusterPoints }) => {
      const clusterPointsCount = clusterPoints.length
      const clusterSize = 45 + (clusterPointsCount / totalPointsCount) * 55
      let isThisCheapest = false
      let thisCheapestVal = Number.MAX_VALUE
      clusterPoints.forEach(point => {
        isThisCheapest = isThisCheapest || point.isCheapest
        thisCheapestVal = Math.min(thisCheapestVal, point.hotelPriceValue)
      })
      let clusterTitle, clusterSubtitle, clusterColor
      if (isThisCheapest) {
        clusterTitle = `Cheapest + ${clusterPointsCount - 1} More`
        clusterSubtitle = `from $${thisCheapestVal}`
        clusterColor = winnerColor
      } else {
        clusterTitle = `${clusterPointsCount} Hotels`
        clusterSubtitle = `from $${thisCheapestVal}`
        clusterColor = darkColor
      }
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
