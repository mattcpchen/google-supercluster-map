import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'pcln-design-system'
import styled from 'styled-components'
import { CircleClusterMarker as DefaultClusterComponent } from '../../clusterMarkers'
import MapItemContainer from '../MapItemContainer'

const DescriptionContainer = styled(Text)`
  width: 100%;
`
const WrapText = styled(Text)`
  overflow-wrap: break-word;
`

const flattenClusterData = (supercluster, cluster) => {
  const children = supercluster.getChildren(cluster.id)
  const result = []
  children.forEach(child => {
    if (child.id) {
      const properties = flattenClusterData(supercluster, child)
      result.push(...properties)
    } else {
      result.push(child.properties)
    }
  })
  return result
}

const SuperclusterMarker = ({
  mapRef,
  supercluster,
  cluster,
  clusterComponent,
  clusterStyle,
  clusterCallback,
  lat,
  lng,
  defaultZoom,
  totalPointsCount,
}) => {
  const Marker = clusterComponent || DefaultClusterComponent
  const clusterPoints = flattenClusterData(supercluster, cluster)
  const clusterData = clusterCallback
    ? clusterCallback({ totalPointsCount, clusterPoints })
    : {}
  const clusterSize = clusterData.clusterSize ?? clusterStyle.size
  const clusterColor = clusterData.clusterColor ?? clusterStyle.color
  const clusterGlowing = clusterData.clusterGlowing ?? clusterStyle.glowing
  const clusterTitle = clusterData.clusterTitle ?? clusterPoints.length
  const clusterSubtitle = clusterData.clusterSubtitle ?? ''
  const titleSize = clusterData.titleSize ?? clusterStyle.titleSize
  const subtitleSize = clusterData.subtitleSize ?? clusterStyle.subtitleSize
  return (
    <MapItemContainer key={`ClusterMarker-${cluster.id}`} lat={lat} lng={lng}>
      <Marker
        style={{
          width: `${clusterSize}px`,
          height: `${clusterSize}px`,
          background: `${clusterColor}`,
          boxShadow: `${clusterGlowing}`,
        }}
        onClick={() => {
          const expansionZoom = Math.min(
            supercluster.getClusterExpansionZoom(cluster.id),
            defaultZoom
          )
          mapRef && mapRef.current.setZoom(expansionZoom)
          mapRef && mapRef.current.panTo({ lat, lng })
        }}
      >
        <DescriptionContainer textAlign='center' width={1}>
          <Text bold fontSize={`${titleSize}px`}>
            {clusterTitle}
          </Text>
          {clusterSubtitle && (
            <WrapText fontSize={`${subtitleSize}px`} mt={1}>
              {clusterSubtitle}
            </WrapText>
          )}
        </DescriptionContainer>
      </Marker>
    </MapItemContainer>
  )
}

SuperclusterMarker.propTypes = {
  mapRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  supercluster: PropTypes.any,
  cluster: PropTypes.object,
  clusterComponent: PropTypes.object,
  clusterStyle: PropTypes.shape({
    size: PropTypes.number,
    color: PropTypes.string,
    glowing: PropTypes.string,
    titleSize: PropTypes.number,
    subtitleSize: PropTypes.number,
  }),
  clusterCallback: PropTypes.func,
  defaultZoom: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
  totalPointsCount: PropTypes.number,
}

export default SuperclusterMarker
