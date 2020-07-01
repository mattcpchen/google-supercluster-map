import React from 'react'
import PropTypes from 'prop-types'

const MapItemContainer = ({ elementref, children }) => (
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

MapItemContainer.propTypes = {
  elementref: PropTypes.func,
  children: PropTypes.any,
}

export default MapItemContainer
