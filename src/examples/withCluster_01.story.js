import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'

import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GoogleSuperCluster', module).add('with Default setting', () => {
  const hotels = multiMockHotels.slice(0, 5)

  const center = {
    lat: hotels[0].latitude,
    lng: hotels[0].longitude,
  }

  const childItems = hotels.map(hotel => ({
    longitude: hotel.longitude,
    latitude: hotel.latitude,
  }))

  return (
    <div style={{ height: '500px' }}>
      <GoogleSuperCluster
        isClustering
        childItems={childItems}
        center={center}
        mapCallbackFn={action(`call mapCallbackFn`)}
        options={{ clickableIcons: false }}
      />
    </div>
  )
})
