import React from 'react'
import PropTypes from 'prop-types'
import { HotelCircle, Discount } from 'pcln-icons'
import { getRandomPoint } from './_helpers'
import { MapItemContainer } from '../../GoogleSuperCluster'
import GoogleSuperCluster from '../../GoogleSuperCluster'

const findTotalMinPrice = hotels => {
  let minPrice = Number.MAX_VALUE
  for (let i = 0; i < hotels.length; i++) {
    const hotelPrice = Math.floor(hotels[i].ratesSummary.minPrice)
    minPrice = Math.min(minPrice, hotelPrice)
  }
  return minPrice
}
const findClusterMinPrice = points => {
  let minPrice = Number.MAX_VALUE
  for (let i = 0; i < points.length; i++) {
    const hotelPrice = Math.floor(points[i].hotelPrice)
    minPrice = Math.min(minPrice, hotelPrice)
  }
  return minPrice
}

const CityMapNYC = ({ hotels, isZoomOut }) => {
  const normalColor = '#007aff'
  const normalGlowing = '0 0 1px 1px #ffffff'
  const cheapColor = '#c00'
  const cheapGlowing = `0 0 1px 2px #c00`
  const pointMarkerSize = 48
  const clusterOffSize = 48

  // basic setting
  const center = getRandomPoint(hotels)

  const coordinatesArray = isZoomOut
    ? hotels.map(hotel => ({
        lat: hotel.location.latitude,
        lng: hotel.location.longitude,
      }))
    : null

  // for children
  const totalMinPrice = findTotalMinPrice(hotels)
  const mapChildren = hotels.map(hotel => {
    const currencySymbol = hotel.ratesSummary.minCurrencyCodeSymbol
    const hotelPrice = Math.floor(hotel.ratesSummary.minPrice)
    const lat = hotel.location.latitude
    const lng = hotel.location.longitude
    const isCheapest = hotelPrice === totalMinPrice
    const Marker = isCheapest ? Discount : HotelCircle
    return (
      <MapItemContainer
        key={hotel.hotelID}
        lat={lat}
        lng={lng}
        hotelId={hotel.hotelID}
        hotelName={hotel.name}
        currencySymbol={currencySymbol}
        hotelPrice={hotelPrice}
      >
        <Marker
          size={pointMarkerSize}
          color={isCheapest ? cheapColor : normalColor}
          style={{ transform: 'translate(-50%, -100%)' }}
        />
      </MapItemContainer>
    )
  })

  // for clusterCallback
  const clusterCallback = ({ totalPointsCount, clusterPoints }) => {
    const clusterPointsCount = clusterPoints.length
    const clusterOnSize =
      clusterOffSize + (clusterPointsCount / totalPointsCount) * 45
    const currencySymbol = clusterPoints[0].currencySymbol
    const clusterMinPrice = findClusterMinPrice(clusterPoints)
    const minDisplayPrice = `${currencySymbol}${clusterMinPrice}`

    const isCheapest = clusterMinPrice === totalMinPrice
    const clusterSize = isCheapest ? clusterOnSize : clusterOffSize
    const clusterColor = normalColor
    const clusterGlowing = isCheapest ? cheapGlowing : normalGlowing
    let clusterTitle = isCheapest
      ? `Cheapest + ${clusterPointsCount - 1} more`
      : `${clusterPointsCount} Hotels`
    let clusterSubtitle = `from ${minDisplayPrice}`
    if (clusterPointsCount === totalPointsCount) {
      clusterTitle = 'Welcome to NYC'
      clusterSubtitle = `${clusterPointsCount} Hotels from ${minDisplayPrice}`
    }
    return {
      clusterSize,
      clusterColor,
      clusterGlowing,
      clusterTitle,
      clusterSubtitle,
    }
  }

  // for mapCallbackFn
  const mapCallbackFn = () => {
    /** do something here if necessary */
  }

  return (
    <GoogleSuperCluster
      isClustering
      center={center}
      clusterCallback={clusterCallback}
      clusterStyle={{
        size: clusterOffSize,
        subtitleSize: 10,
      }}
      mapCallbackFn={mapCallbackFn}
      params={{ coordinatesArray }}
      options={{
        clickableIcons: false,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
      }}
    >
      {mapChildren}
    </GoogleSuperCluster>
  )
}

CityMapNYC.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.object,
  isZoomOut: PropTypes.bool,
}

CityMapNYC.defaultProps = {
  isZoomOut: false,
}

export default CityMapNYC
