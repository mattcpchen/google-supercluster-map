import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'
import { Pin } from 'pcln-icons'
import ClusterMarker from '../components/clusterMarkers'
import { MapItemContainer } from '../components/GoogleSuperCluster'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GoogleSuperCluster', module).add('customize ClusterMarker', () => {
  const hotels = multiMockHotels

  const center = {
    lat: hotels[0].latitude,
    lng: hotels[0].longitude,
  }

  const StyledClusterMarker = styled(ClusterMarker)`
    border: 5px solid #fff;
    border-radius: 10px;
  `

  const mapChildern = hotels.map(hotel => (
    <MapItemContainer
      key={`${hotel.latitude}-${hotel.longitude}`}
      lat={hotel.latitude}
      lng={hotel.longitude}
    >
      <Pin
        size={48}
        color='#c00'
        style={{ transform: 'translate(-50%, -100%)' }}
      />
    </MapItemContainer>
  ))

  return (
    <div style={{ height: '500px' }}>
      <GoogleSuperCluster
        isClustering
        center={center}
        clusterComponent={StyledClusterMarker}
        clusterStyle={{
          size: 20,
          color: '#c00',
          titleSize: 30,
        }}
        mapCallbackFn={action(`call mapCallbackFn`)}
        options={{ clickableIcons: false }}
      >
        {mapChildern}
      </GoogleSuperCluster>
    </div>
  )
})
