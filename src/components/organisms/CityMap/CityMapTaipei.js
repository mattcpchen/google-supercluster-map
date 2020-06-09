import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import GoogleSuperCluster from '../../GoogleSuperCluster'
import { PointMarkerWrapper } from '../../GSCMarkers'
import { getRandomPoint } from "./_helpers"
import { Twitter as Marker } from 'pcln-icons'


const randomPickFromArray = (array, total) => {
  const result = []
  while (true) {
    const pick = array[ Math.floor(Math.random()*array.length) ];
    if (result.indexOf(pick) === -1) {
      result.push(pick);
    }
    if (result.length === total) {
      return result;
    }
  }
}

const CityMapTaipei = ({hotels, isZoomOut, params}) => {
  const offColor = '#4CAF50'
  const onColor= '#c00'
  const pointMarkerSize = 48
  const clusterOnSize = 42
  const clusterOffSize = 26
  const selectedPool = hotels.map(hotel => hotel.hotelID)
  const selectedIds = randomPickFromArray(selectedPool, 2) // pick 2 red birds
  const noop = () => {}
  // basic setting
  const center = getRandomPoint(hotels)
  const coordinatesArray = isZoomOut
    ? hotels.map(hotel => ({
      lat: hotel.location.latitude,
      lng: hotel.location.longitude
    }))
    : null

  // for childrenItems
  const childrenItems = hotels.map(hotel => {
    const currencySymbol = hotel.ratesSummary.minCurrencyCodeSymbol
    const currPrice = Math.floor(hotel.ratesSummary.minPrice)
    const latitude = hotel.location.latitude
    const longitude = hotel.location.longitude
    const isRed = selectedIds.indexOf(hotel.hotelID) > -1
    const PointMarker = (
      <PointMarkerWrapper key={hotel.hotelID} lat={latitude} lng={longitude}>
        <Marker
          size={pointMarkerSize}
          color={isRed ? onColor : offColor}
          style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
          onClick={noop}
        />
      </PointMarkerWrapper>
    )
    return ({
      hotelId: hotel.hotelID,
      hotelName: hotel.name,
      currencySymbol: currencySymbol,
      currencyPrice: currPrice,
      isRed,
      value: isRed ? 1 : 0,
      latitude,
      longitude,
      PointMarker
    })})

  // for callback
  const clusterCallback = ({ clusterPoints }) => {
    const clusterPointsCount = clusterPoints.length
    const totalRed = clusterPoints.reduce((acc,point) => {
      return acc + (point.isRed ? 1 : 0)
    }, 0)
    const clusterSize = totalRed > 0 ? clusterOnSize : clusterOffSize
    const clusterColor = totalRed > 0 ? onColor : offColor
    const clusterTitle = totalRed > 0
      ? `${totalRed} Red`
      : `${clusterPointsCount} Birds`
    const clusterSubtitle = totalRed > 0
      ? `+ ${clusterPointsCount - totalRed} more`
      : ''
    return { clusterSize, clusterColor, clusterTitle, clusterSubtitle }
  }

  return (
    <GoogleSuperCluster
      isClustering
      childrenItems={childrenItems}
      center={center}
      clusterCallback={clusterCallback}
      clusterStyle={{
        subtitleSize: 10,
      }}
      mapCallbackFn={noop}
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

CityMapTaipei.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.object,
  isZoomOut: PropTypes.bool,
};
CityMapTaipei.defaultProps = {
  defaultZoom: 13,
  isZoomOut: false,
}

export default CityMapTaipei
