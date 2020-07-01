import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateStoryData } from './helpers/mixClusterHelper'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GSC with mix clustering', module)
  .add('with single fixedMarker', () => {
    const { defaultCenter, mapChildern } = generateStoryData(['33333'], true)
    return (
      <div style={{ height: '500px' }}>
        <GoogleSuperCluster
          isClustering
          center={defaultCenter}
          defaultZoom={14}
          options={{ clickableIcons: false }}
        >
          {mapChildern}
        </GoogleSuperCluster>
      </div>
    )
  })
  .add('with multiple fixedMarkers', () => {
    const { defaultCenter, mapChildern } = generateStoryData(['33333', '99999'], true)
    return (
      <div style={{ height: '500px' }}>
        <GoogleSuperCluster
          isClustering
          center={defaultCenter}
          defaultZoom={14}
          options={{ clickableIcons: false }}
        >
          {mapChildern}
        </GoogleSuperCluster>
      </div>
    )
  })
