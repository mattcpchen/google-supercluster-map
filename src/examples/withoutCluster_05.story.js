import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'
import { Pin } from 'pcln-icons'
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

const generatePointMarker = (latitude, longitude) => (
  <MarkerWrapper key={latitude} lat={latitude} lng={longitude}>
    <Pin
      size={48}
      color='#0071ff'
      style={{ transform: 'translate(-50%, -100%)', cursor: 'pointer' }}
      onClick={action(`click on me`)}
    />
  </MarkerWrapper>
)

storiesOf('GSC without Clustering Markers', module).add(
  'With several markers (thru childItems)',
  () => {
    const hotels = multiMockHotels

    const center = {
      lat: hotels[0].latitude,
      lng: hotels[0].longitude,
    }

    /**
     * pass the data needed for marker as childItems
     * it will be later by GoogleSuperCluster
     */
    const childItems = hotels.map(hotel => ({
      PointMarker: generatePointMarker(hotel.latitude, hotel.longitude),
    }))

    return (
      <div style={{ height: '500px' }}>
        <GoogleSuperCluster
          childItems={childItems}
          center={center}
          mapCallbackFn={action(`call mapCallbackFn`)}
          options={{ clickableIcons: false }}
        />
      </div>
    )
  }
)
