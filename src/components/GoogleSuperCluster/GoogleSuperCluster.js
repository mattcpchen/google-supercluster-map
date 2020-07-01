import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import useSupercluster from 'use-supercluster'
import styled from 'styled-components'
import SuperclusterMarker from './helpers/SuperclusterMarker'
import { flattenClusterData } from './helpers/clusterHelpers'

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  .gm-style {
    font: inherit;
    font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`

export const getMapBounds = (maps, coordinatesArray) => {
  const bounds = new maps.LatLngBounds()
  for (const latLng of coordinatesArray) {
    bounds.extend(new maps.LatLng(latLng.lat, latLng.lng))
  }
  return bounds
}

export const splitClusterChildren = (isClustering, children) => {
  const pointChildren = []
  const clusterChildren = []
  if (!isClustering || !children?.length) {
    return { pointChildren, clusterChildren }
  }
  children.forEach(child => {
    if (child?.props?.isExcluded) {
      pointChildren.push(child)
    } else {
      clusterChildren.push(child)
    }
  })
  return { pointChildren, clusterChildren }
}

export const mergeClusterChildren = (
  isClustering,
  supercluster,
  clusters,
  pointChildren
) => {
  if (!isClustering) {
    return []
  }
  // update cluster with clusterPoints
  clusters.forEach(cluster => {
    const isCluster = cluster?.properties?.cluster
    if (isCluster) {
      cluster.points = flattenClusterData(supercluster, cluster)
    }
  })
  // return clusters ONLY
  if (pointChildren && pointChildren.length === 0) {
    return clusters
  }

  // mix clusters && pointChildren
  let isIndexMissing = false
  const mixChildren = []

  clusters.forEach(cluster => {
    let thisKeyIndex = -1
    if (cluster.points) {
      thisKeyIndex = cluster.points.reduce((acc, point) => {
        const keyIndex = point.keyIndex || -1
        return acc === null ? keyIndex : Math.max(acc, keyIndex)
      }, null)
    } else {
      thisKeyIndex = cluster?.properties?.keyIndex ?? -1
    }
    isIndexMissing = thisKeyIndex === -1 ? true : isIndexMissing
    if (thisKeyIndex !== -1) {
      mixChildren[thisKeyIndex] = cluster
    }
  })

  pointChildren.forEach(child => {
    const thisKeyIndex = child?.props?.keyIndex ?? -1
    isIndexMissing = thisKeyIndex === -1 ? true : isIndexMissing
    if (thisKeyIndex !== -1) {
      mixChildren[thisKeyIndex] = child
    }
  })

  if (isIndexMissing) {
    return [...clusters, ...pointChildren]
  } else {
    return mixChildren.filter(child => child !== undefined)
  }
}

export const generateClusterPoints = (isClustering, children) => {
  if (!isClustering || !children?.length) {
    return []
  }
  return children.map(child => {
    const { lat, lng, ...moreProps } = child.props
    return {
      type: 'Feature',
      properties: {
        cluster: false,
        PointMarker: child,
        ...moreProps,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
    }
  })
}

const GoogleSuperCluster = ({
  isClustering,
  className,
  children,
  center,
  defaultCenter,
  defaultZoom,
  zoom: initZoom,
  mapCallbackFn,
  options,
  params,
  refitOnCoordsChange,
  clusterComponent,
  clusterStyle: clusterResetStyle,
  clusterRadius,
  clusterSize,
  clusterColor,
  clusterGlowing,
  clusterTitleSize,
  clusterTitleBold,
  clusterSubtitleSize,
  clusterSubtitleBold,
  clusterCallback,
}) => {
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(initZoom)
  const initialItems = []
  const mapRef = useRef()
  let maps = null
  let map = null

  // componentDidUpdate
  const getPrevPropValue = value => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const prevParams = getPrevPropValue(params)
  useEffect(() => {
    if (refitOnCoordsChange && map && maps) {
      let coordsChanged = false
      const coords = params?.coordinatesArray ?? []
      const oldCoords = prevParams?.coordinatesArray ?? []
      if (coords.length !== oldCoords.length) {
        coordsChanged = true
      } else {
        for (let i = 0; i < coords.length; i++) {
          if (
            coords[i].lat !== oldCoords[i].lat ||
            coords[i].lng !== oldCoords[i].lng
          ) {
            coordsChanged = true
            break
          }
        }
      }
      if (coordsChanged) {
        const bounds = getMapBounds(maps, coords)
        map.fitBounds(bounds)
      }
    }
  }, [params, prevParams, refitOnCoordsChange, maps, map])

  // clusters && supercluster
  const { pointChildren, clusterChildren } = splitClusterChildren(
    isClustering,
    children
  )
  const points = generateClusterPoints(isClustering, clusterChildren)
  const { supercluster, clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: clusterRadius, maxZoom: defaultZoom },
  })
  // const clusterPoints = flattenClusterData(supercluster, cluster)
  const mixedChildren = mergeClusterChildren(
    isClustering,
    supercluster,
    clusters,
    pointChildren
  )

  // Google Map
  const handleApiLoaded = (inMap, inMaps, params) => {
    if (!inMap || !inMaps) {
      return
    }

    mapRef.current = inMap
    maps = inMaps
    map = inMap
    initialItems.forEach(item =>
      maps.OverlayView.preventMapHitsAndGesturesFrom(item)
    )

    if (mapCallbackFn) {
      mapCallbackFn(map, maps)
    }

    if (params?.coordinatesArray) {
      const bounds = getMapBounds(maps, params.coordinatesArray)
      map.fitBounds(bounds)
    }
  }

  const handleMapOption = () => {
    if (options) {
      return options
    } else {
      return {}
    }
  }

  const handleClusterMapChanged = (isClustering, inZoom, inBounds) => {
    if (!isClustering || !inZoom || !inBounds) {
      return
    }
    const isZoomUpdated = !zoom || zoom !== inZoom
    const inFlattenBounds = [
      inBounds.nw.lng,
      inBounds.se.lat,
      inBounds.se.lng,
      inBounds.nw.lat,
    ]
    const isBoundsUpdated =
      !bounds ||
      bounds.length !== inFlattenBounds.length ||
      bounds.reduce((acc, bound, index) => {
        return acc || bound !== inFlattenBounds[index]
      }, false)

    // avoid making any unnecessary setState calls
    isZoomUpdated && setZoom(inZoom)
    isBoundsUpdated &&
      setBounds([
        inBounds.nw.lng,
        inBounds.se.lat,
        inBounds.se.lng,
        inBounds.nw.lat,
      ])
  }

  const childRefCallback = (element, initialItems, maps) => {
    if (!element) {
      return
    }
    if (maps) {
      maps.OverlayView.preventMapHitsAndGesturesFrom(element)
    } else {
      initialItems.push(element)
    }
  }

  return (
    <MapWrapper className={className}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `AIzaSyD2Zt3b8xGZVVqu3751QhKlm93v3FasoL8`, // <YOUR-OWN-API-KEY> here
        }}
        center={center}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onGoogleApiLoaded={({ map, maps }) =>
          handleApiLoaded(map, maps, params)
        }
        options={handleMapOption}
        yesIWantToUseGoogleMapApiInternals
        zoom={initZoom}
        onChange={({ zoom, bounds }) =>
          handleClusterMapChanged(isClustering, zoom, bounds)
        }
      >
        {!isClustering && children
          ? React.Children.map(children, element => {
              return React.cloneElement(element, {
                testing: true,
                elementref: element => {
                  childRefCallback(element, initialItems, map)
                },
              })
            })
          : null}

        {isClustering &&
          mixedChildren &&
          mixedChildren.map(child => {
            const isClusterObject = child.type && child.type === 'Feature'
            // fixedMarker
            if (!isClusterObject) {
              return React.cloneElement(child, {
                testing: true,
                elementref: child => {
                  childRefCallback(child, initialItems, map)
                },
              })
            }
            // clusterMarker
            const cluster = child
            const [lng, lat] = cluster.geometry.coordinates
            const { PointMarker, cluster: isCluster } = cluster.properties
            const clusterStyle = {
              size: clusterSize,
              color: clusterColor,
              glowing: clusterGlowing,
              titleSize: clusterTitleSize,
              titleBold: clusterTitleBold,
              subtitleSize: clusterSubtitleSize,
              subtitleBold: clusterSubtitleBold,
              ...clusterResetStyle,
            }
            return isCluster
              ? SuperclusterMarker({
                  mapRef,
                  supercluster,
                  cluster,
                  clusterComponent,
                  clusterStyle,
                  clusterCallback,
                  defaultZoom,
                  lat,
                  lng,
                  totalPointsCount: children.length,
                })
              : PointMarker
          })}
      </GoogleMapReact>
    </MapWrapper>
  )
}

GoogleSuperCluster.propTypes = {
  GMApiKey: PropTypes.string,
  isClustering: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  defaultZoom: PropTypes.number,
  mapCallbackFn: PropTypes.func,
  options: PropTypes.object,
  params: PropTypes.object,
  refitOnCoordsChange: PropTypes.bool,
  clusterComponent: PropTypes.object,
  clusterStyle: PropTypes.shape({
    size: PropTypes.number,
    color: PropTypes.string,
    glowing: PropTypes.string,
    titleSize: PropTypes.number,
    subtitleSize: PropTypes.number,
  }),
  clusterRadius: PropTypes.number,
  clusterSize: PropTypes.number,
  clusterColor: PropTypes.string,
  clusterGlowing: PropTypes.string,
  clusterTitleSize: PropTypes.number,
  clusterTitleBold: PropTypes.bool,
  clusterSubtitleSize: PropTypes.number,
  clusterSubtitleBold: PropTypes.bool,
  clusterCallback: PropTypes.func,
}

GoogleSuperCluster.defaultProps = {
  isClustering: false,
  PclnGMApiKey: 'AIzaSyCBc99VuJdxwj5E9VQyo0dhD4YZRU_edOM',
  GMApiKey: 'AIzaSyD2Zt3b8xGZVVqu3751QhKlm93v3FasoL8',
  defaultCenter: {
    lat: 0,
    lng: 180,
  },
  defaultZoom: 14,
  params: {},
  refitOnCoordsChange: false,
  clusterRadius: 75,
  clusterSize: 38,
  clusterColor: '#007aff',
  clusterGlowing: '',
  clusterTitleSize: 12,
  clusterTitleBold: true,
  clusterSubtitleSize: 8,
  clusterSubtitleBold: false,
}

export default GoogleSuperCluster
