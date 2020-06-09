import React from 'react'
import { Pin } from 'pcln-icons'
import PropTypes from 'prop-types'
import PointMarkerWrapper from '../../GSCMarkers/PointMarkerWrapper'

const generatePointMarker = ({ PointMarker, latitude, longitude }) =>
  PointMarker || (
    <PointMarkerWrapper
      key={`PointMarker-${latitude}-${longitude}`}
      lat={latitude}
      lng={longitude}
    >
      <Pin
        size={48}
        color='#0071ff'
        style={{ transform: 'translate(-50%, -100%)' }}
      />
    </PointMarkerWrapper>
  )

generatePointMarker.propTypes = {
  PointMarker: PropTypes.node,
  longitude: PropTypes.number,
  latitude: PropTypes.number,
}

export default generatePointMarker
