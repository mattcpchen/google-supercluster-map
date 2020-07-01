import React from 'react'
import PropTypes from 'prop-types'
import { getRandomPoint } from './_helpers'
import { SingleOccupancy, MultiOccupancy } from 'pcln-icons'
import { MapItemContainer } from '../../GoogleSuperCluster'
import GoogleSuperCluster from '../../GoogleSuperCluster'

const CityMapSydney = ({ hotels, defaultZoom, isZoomOut }) => {
  const colors = []
    .concat(['#049', '#f06f20', '#c00', '#060'])
    .concat(['#007aff', '#f68013', '#fe3e81', '#0a0'])
    .concat(['#4f6f8f'])
  const color = colors[Math.floor(Math.random() * colors.length)]

  const mapChildern = hotels.map(hotel => {
    const latitude = hotel.location.latitude
    const longitude = hotel.location.longitude
    const Marker =
      Math.floor(Math.random() * 5) === 0 ? MultiOccupancy : SingleOccupancy
    return (
      <MapItemContainer key={latitude} lat={latitude} lng={longitude}>
        <Marker
          size={48}
          color={color}
          style={{ transform: 'translate(-50%, -100%)' }}
        />
      </MapItemContainer>
    )
  })

  const center = getRandomPoint(hotels)

  const coordinatesArray = isZoomOut
    ? hotels.map(hotel => ({
        lat: hotel.location.latitude,
        lng: hotel.location.longitude,
      }))
    : null

  const mapCallbackFn = () => {
    /** do something here if necessary */
  }

  return (
    /**
     * Sydney is working as regular Google-Map-React without clustering
     */
    <GoogleSuperCluster
      defaultZoom={defaultZoom}
      center={center}
      mapCallbackFn={mapCallbackFn}
      params={{ coordinatesArray }}
      options={{
        clickableIcons: false,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
      }}
    >
      {mapChildern}
    </GoogleSuperCluster>
  )
}

CityMapSydney.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.object,
  defaultZoom: PropTypes.number,
  isZoomOut: PropTypes.bool,
}

CityMapSydney.defaultProps = {
  defaultZoom: 13,
  isZoomOut: false,
}

export default CityMapSydney
