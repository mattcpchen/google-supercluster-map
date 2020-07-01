import React from 'react'
import { storiesOf } from '@storybook/react'
import GoogleSuperCluster from '../components/GoogleSuperCluster'

storiesOf('GSC without clustering', module).add('Map Only', () => {
  return (
    <div style={{ height: '500px' }}>
      <GoogleSuperCluster />
    </div>
  )
})
