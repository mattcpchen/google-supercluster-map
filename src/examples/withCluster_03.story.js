import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { multiMockHotels } from './helpers/mockData'
import GoogleSuperCluster from '../components/GoogleSuperCluster'


storiesOf('GoogleSuperCluster', module)
  .add('customize ClusterMarker', () => {
    const hotels = multiMockHotels

    const center = {
      lat: hotels[0].latitude,
      lng: hotels[0].longitude,
    }

    const childrenItems = hotels.map((hotel, index) => ({
      longitude: hotel.longitude,
      latitude: hotel.latitude,
    }))

    const SquaredClusterMarker = styled.div`
      position: relative;
      color: #fff;
      border: 5px solid #fff;
      border-radius: 10px;
      box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transform: translate(-50%, -100%);
    `

    return (
      <div style={{ height: '500px' }}>
        <GoogleSuperCluster
          isClustering
          childrenItems={childrenItems}
          center={center}
          ClusterComponent={SquaredClusterMarker}
          clusterStyle={{
            bgSize: 20,
            bgColor: '#c00',
            titleSize: 30,
          }}
          mapCallbackFn={action(`call mapCallbackFn`)}
          options={{ clickableIcons: false }}
        />
      </div>
    )
  })
