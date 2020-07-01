import React from 'react'
import PropTypes from 'prop-types'
import { Twitter as Marker } from 'pcln-icons'
import { getRandomPoint } from './_helpers'
import GoogleSuperCluster, { MapItemContainer } from '../GoogleSuperCluster'

const randomPickFromArray = (array, total) => {
  const result = []
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const pick = array[Math.floor(Math.random() * array.length)]
    if (result.indexOf(pick) === -1) {
      result.push(pick)
    }
    if (result.length === total) {
      return result
    }
  }
}

const CityMapTaipei = ({ hotels, isZoomOut }) => {
  const offColor = '#4CAF50'
  const onColor = '#c00'
  const pointMarkerSize = 48
  const clusterOnSize = 48
  const clusterOffSize = 28
  const selectedPool = hotels.map(hotel => hotel.hotelID)
  const selectedIds = randomPickFromArray(selectedPool, 2) // pick 2 red birds
  const noop = () => {}
  // basic setting
  const center = getRandomPoint(hotels)
  const coordinatesArray = isZoomOut
    ? hotels.map(hotel => ({
        lat: hotel.location.latitude,
        lng: hotel.location.longitude,
      }))
    : null

  // for children
  const maChildren = hotels.map(hotel => {
    const hotelId = hotel.hotelID
    const currencySymbol = hotel.ratesSummary.minCurrencyCodeSymbol
    const currPrice = Math.floor(hotel.ratesSummary.minPrice)
    const lat = hotel.location.latitude
    const lng = hotel.location.longitude
    const isRed = selectedIds.indexOf(hotelId) > -1
    return (
      <MapItemContainer
        key={hotelId}
        lat={lat}
        lng={lng}
        hotelId={hotelId}
        hotelName={hotel.name}
        currencySymbol={currencySymbol}
        currencyPrice={currPrice}
        isRed={isRed}
        value={isRed ? 1 : 0}
      >
        <Marker
          size={pointMarkerSize}
          color={isRed ? onColor : offColor}
          style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
          onClick={noop}
        />
      </MapItemContainer>
    )
  })

  // for callback
  const clusterCallback = ({ clusterPoints }) => {
    const clusterPointsCount = clusterPoints.length
    const totalRed = clusterPoints.reduce((acc, point) => {
      return acc + (point.isRed ? 1 : 0)
    }, 0)
    const clusterSize = totalRed > 0 ? clusterOnSize : clusterOffSize
    const clusterColor = totalRed > 0 ? onColor : offColor
    const clusterTitle =
      totalRed > 0 ? `${totalRed} Red` : `${clusterPointsCount} Birds`
    const clusterSubtitle =
      totalRed > 0 ? `+ ${clusterPointsCount - totalRed} more` : ''
    return { clusterSize, clusterColor, clusterTitle, clusterSubtitle }
  }

  return (
    <GoogleSuperCluster
      isClustering
      center={center}
      clusterCallback={clusterCallback}
      clusterStyle={{
        subtitleSize: 10,
      }}
      mapCallbackFn={noop}
      params={{ coordinatesArray }}
      options={{
        clickableIcons: false,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
      }}
    >
      {maChildren}
    </GoogleSuperCluster>
  )
}

CityMapTaipei.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.object,
  isZoomOut: PropTypes.bool,
}

CityMapTaipei.defaultProps = {
  defaultZoom: 13,
  isZoomOut: false,
}

export default CityMapTaipei
