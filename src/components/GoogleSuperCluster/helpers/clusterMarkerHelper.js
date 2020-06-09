import React from 'react'
import PropTypes from 'prop-types'
import { Text, Box } from 'pcln-design-system'
import styled from 'styled-components'
import PointMarkerWrapper from '../../GSCMarkers/PointMarkerWrapper'

const DefaultCluster = styled(Box)`
  position: relative;
  border-radius: 50%;
  color: #fff;
  border: 2px solid #fff;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: translate(-50%, -100%);
`

const Marker = ({ ClusterComponent, children, ...props }) => {
  return ClusterComponent ? (
    <ClusterComponent {...props}>{children}</ClusterComponent>
  ) : (
    <DefaultCluster {...props}>{children}</DefaultCluster>
  )
}

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

const generateClusterMarker = ({
  mapRef,
  supercluster,
  cluster,
  ClusterComponent,
  clusterStyle: resetStyle,
  clusterCallback,
  latitude,
  longitude,
  defaultZoom,
  totalPointsCount,
}) => {
  const clusterStyle = {
    bgSize: 45,
    bgColor: '#007aff',
    bgGlowing: '',
    titleSize: 12,
    subtitleSize: 8,
    ...resetStyle,
  }
  // get current cluster info, send to the user so they can customize how/what they wanna display
  const clusterPoints = flattenClusterData(supercluster, cluster)
  const clusterData = clusterCallback
    ? clusterCallback({ totalPointsCount, clusterPoints })
    : {}
  // get data from the user
  const clusterSize = clusterData.clusterSize ?? clusterStyle.bgSize
  const clusterColor = clusterData.clusterColor ?? clusterStyle.bgColor
  const clusterGlowing = clusterData.clusterGlowing ?? clusterStyle.bgGlowing
  const clusterTitle = clusterData.clusterTitle ?? clusterPoints.length
  const clusterSubtitle = clusterData.clusterSubtitle ?? ''
  const titleSize = clusterData.titleSize ?? clusterStyle.titleSize
  const subtitleSize = clusterData.subtitleSize ?? clusterStyle.subtitleSize
  return (
    <PointMarkerWrapper
      key={`ClusterMarker-${cluster.id}`}
      lat={latitude}
      lng={longitude}
    >
      <Marker
        ClusterComponent={ClusterComponent}
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
          mapRef && mapRef.current.panTo({ lat: latitude, lng: longitude })
        }}
      >
        <DescriptionContainer textAlign='center' width={1}>
          <Text bold fontSize={titleSize}>{clusterTitle}</Text>
          {clusterSubtitle && (
            <WrapText fontSize={`${subtitleSize}px`} mt={1}>{clusterSubtitle}</WrapText>
          )}
        </DescriptionContainer>
      </Marker>
    </PointMarkerWrapper>
  )
}

Marker.propTypes = {
  ClusterComponent: PropTypes.object,
}

generateClusterMarker.propTypes = {
  mapRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  supercluster: PropTypes.any,
  cluster: PropTypes.object,
  ClusterComponent: PropTypes.object,
  clusterStyle: PropTypes.shape({
    bgColor: PropTypes.string,
    bgSize: PropTypes.number,
    titleSize: PropTypes.number,
    subtitleSize: PropTypes.number,
  }),
  clusterCallback: PropTypes.func,
  defaultZoom: PropTypes.number,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  totalPointsCount: PropTypes.number,
}

export default generateClusterMarker
