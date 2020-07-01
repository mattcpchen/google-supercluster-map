import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateStoryData } from './helpers/mixClusterHelper'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GSC with mix clustering', module).add('is not clustering', () => {
  const { defaultCenter, mapChildern } = generateStoryData(['33333'])
  return (
    <div style={{ height: '500px' }}>
      <GoogleSuperCluster
        center={defaultCenter}
        defaultZoom={14}
        options={{ clickableIcons: false }}
      >
        {mapChildern}
      </GoogleSuperCluster>
    </div>
  )
})
