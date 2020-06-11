import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GoogleSuperCluster from '../../GoogleSuperCluster'
import { PointMarkerWrapper, ClusterMarker } from '../../GSCMarkers'
import { getRandomPoint } from './_helpers'
import { User as Marker } from 'pcln-icons'

const getRandomRGBColor = () => {
  const rgb = Math.floor(Math.random() * 3)
  const rColor = rgb === 0 ? 255 : 0
  const gColor = rgb === 1 ? 255 : 0
  const bColor = rgb === 2 ? 255 : 0
  return [rColor, gColor, bColor]
}

const mixAllRBGColors = clusterPoints => {
  const totalPoints = clusterPoints.length
  const mixRGB = [0, 0, 0]
  for (let i = 0; i < clusterPoints.length; i++) {
    const thisRGB = clusterPoints[i].rgbColor
    mixRGB[0] += thisRGB[0]
    mixRGB[1] += thisRGB[1]
    mixRGB[2] += thisRGB[2]
  }
  return mixRGB.map(color => Math.floor(color / totalPoints))
}

const ColorBallMarker = styled(ClusterMarker)`
  border: 0;
`

const CityMapParis = ({ hotels, isZoomOut }) => {
  const pointMarkerSize = 52
  // basic setting
  const center = getRandomPoint(hotels)
  const coordinatesArray = isZoomOut
    ? hotels.map(hotel => ({
        lat: hotel.location.latitude,
        lng: hotel.location.longitude,
      }))
    : null

  // for childItems
  const childItems = hotels.map(hotel => {
    const latitude = hotel.location.latitude
    const longitude = hotel.location.longitude
    const rgbColor = getRandomRGBColor()
    const PointMarker = (
      <PointMarkerWrapper key={hotel.hotelID} lat={latitude} lng={longitude}>
        <Marker
          size={pointMarkerSize}
          color={`rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`}
          style={{ transform: 'translate(-50%, -100%)' }}
        />
      </PointMarkerWrapper>
    )
    return {
      hotelId: hotel.hotelID,
      hotelName: hotel.name,
      rgbColor,
      latitude,
      longitude,
      PointMarker,
    }
  })

  // for callback
  const clusterCallback = ({ totalPointsCount, clusterPoints }) => {
    const clusterPointsCount = clusterPoints.length
    const mixRGB = mixAllRBGColors(clusterPoints)
    const clusterSize = 45 + (clusterPointsCount / totalPointsCount) * 40
    const clusterColor = `rgb(${mixRGB[0]},${mixRGB[1]},${mixRGB[2]})`
    const clusterGlowing = `0 0 5px 5px rgb(${mixRGB[0]},${mixRGB[1]},${mixRGB[2]})`
    const clusterTitle = `${mixRGB[0]}|${mixRGB[1]}|${mixRGB[2]}`
    const clusterSubtitle = `${clusterPointsCount} Souls`
    return {
      clusterSize,
      clusterColor,
      clusterGlowing,
      clusterTitle,
      clusterSubtitle,
    }
  }

  return (
    <GoogleSuperCluster
      isClustering
      childItems={childItems}
      center={center}
      clusterCallback={clusterCallback}
      ClusterComponent={ColorBallMarker}
      clusterStyle={{
        titleSize: 12,
        subtitleSize: 12,
      }}
      params={{ coordinatesArray }}
      options={{
        clickableIcons: false,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
      }}
    />
  )
}

CityMapParis.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.object,
  isZoomOut: PropTypes.bool,
}

CityMapParis.defaultProps = {
  isZoomOut: true,
}

export default CityMapParis
