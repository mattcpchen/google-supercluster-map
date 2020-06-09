import React from 'react'
import PropTypes from "prop-types";
import GoogleSuperCluster from '../../GoogleSuperCluster'
import {ClusterMarker, PointMarkerWrapper} from '../../GSCMarkers'
import { getRandomPoint } from "./_helpers"
import { HotelCircle, Discount } from 'pcln-icons'
import styled from "styled-components";

const findTotalMinPrice = (hotels) => {
  let minPrice = Number.MAX_VALUE
  for(let i=0; i<hotels.length; i++) {
    const hotelPrice = Math.floor(hotels[i].ratesSummary.minPrice)
    minPrice = Math.min(minPrice, hotelPrice)
  }
  return minPrice
}
const findClusterMinPrice = (points) => {
  let minPrice = Number.MAX_VALUE
  for(let i=0; i<points.length; i++) {
    const hotelPrice = Math.floor(points[i].hotelPrice)
    minPrice = Math.min(minPrice, hotelPrice)
  }
  return minPrice
}

const ColorBallMarker = styled(ClusterMarker)`
  border: 0;
`

const CityMapNYC = ({hotels, isZoomOut, params}) => {
  const normalColor = '#007aff'
  const cheapColor = '#007aff'
  const glowingColor = '#c00'
  const normalGlowing = '0 0 1px 1px #ffffff'
  const cheapGlowing = `0 0 5px 5px ${glowingColor}`
  const pointMarkerSize = 48
  const clusterOffSize = 48

  // basic setting
  const center = getRandomPoint(hotels)

  const coordinatesArray = isZoomOut
    ? hotels.map(hotel => ({
      lat: hotel.location.latitude,
      lng: hotel.location.longitude
    }))
    : null

  // for childrenItems
  const totalMinPrice = findTotalMinPrice(hotels)
  const childrenItems = hotels.map(hotel => {
    const currencySymbol = hotel.ratesSummary.minCurrencyCodeSymbol
    const hotelPrice = Math.floor(hotel.ratesSummary.minPrice)
    const latitude = hotel.location.latitude
    const longitude = hotel.location.longitude
    const isCheapest = hotelPrice === totalMinPrice
    const Marker = isCheapest ? Discount : HotelCircle
    const PointMarker = (
      <PointMarkerWrapper key={hotel.hotelID} lat={latitude} lng={longitude}>
        <Marker
          size={pointMarkerSize}
          color={isCheapest ? glowingColor : normalColor}
          style={{ transform: 'translate(-50%, -100%)' }}
        />
      </PointMarkerWrapper>
    )
    return ({
      hotelId: hotel.hotelID,
      hotelName: hotel.name,
      currencySymbol: currencySymbol,
      hotelPrice: hotelPrice,
      latitude,
      longitude,
      PointMarker
    })})

  // for clusterCallback
  const clusterCallback = ({ totalPointsCount, clusterPoints }) => {
    const clusterPointsCount = clusterPoints.length
    const clusterOnSize = clusterOffSize + (clusterPointsCount / totalPointsCount) * 45
    const currencySymbol = clusterPoints[0].currencySymbol
    const clusterMinPrice = findClusterMinPrice(clusterPoints)
    const minDisplayPrice = `${currencySymbol}${clusterMinPrice}`

    const isCheapest = clusterMinPrice === totalMinPrice
    const clusterSize = isCheapest ? clusterOnSize : clusterOffSize
    const clusterColor = isCheapest ? cheapColor : normalColor
    const clusterGlowing = isCheapest ? cheapGlowing : normalGlowing
    let clusterTitle = isCheapest
      ? `Cheapest + ${clusterPointsCount-1} more ${clusterPointsCount === 2 ? 'hotel' : 'hotels'}`
      : `${clusterPointsCount} Hotels`
    let clusterSubtitle = `from ${minDisplayPrice}`
    if (clusterPointsCount === totalPointsCount) {
      clusterTitle = 'Welcome to NYC'
      clusterSubtitle = `${clusterPointsCount} Hotels from ${minDisplayPrice}`
    }
    return { clusterSize, clusterColor, clusterGlowing, clusterTitle, clusterSubtitle }
  }

  // for mapCallbackFn
  const mapCallbackFn = () => { /** do something here if necessary */};

  return (
    <GoogleSuperCluster
      isClustering
      childrenItems={childrenItems}
      center={center}
      mapCallbackFn={mapCallbackFn}
      clusterCallback={clusterCallback}
      ClusterComponent={ColorBallMarker}
      clusterStyle={{
        bgSize: clusterOffSize,
        subtitleSize: 10,
      }}
      params={{coordinatesArray}}
      options={{
        clickableIcons: false,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
      }}
    />
  )
}

CityMapNYC.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.object,
  isZoomOut: PropTypes.bool,
};
CityMapNYC.defaultProps = {
  isZoomOut: false,
}

export default CityMapNYC
