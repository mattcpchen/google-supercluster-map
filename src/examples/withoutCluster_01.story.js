import React from 'react'
import { storiesOf } from '@storybook/react'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GSC without Clustering Markers', module).add('Map Only', () => {
  return (
    <div style={{ height: '500px' }}>
      <GoogleSuperCluster />
    </div>
  )
})
