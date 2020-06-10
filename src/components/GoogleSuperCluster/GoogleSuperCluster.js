import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import useSupercluster from 'use-supercluster'
import styled from 'styled-components'
import generateClusterMarker from './helpers/clusterMarkerHelper'
import generatePointMarker from './helpers/pointMarkerHelper'

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

export const getClusters = ({
  isClustering,
  childrenItems,
  bounds,
  zoom,
  options,
}) => {
  if (!isClustering || !childrenItems?.length) {
    return {}
  }
  const points = childrenItems.map(props => {
    const { longitude, latitude, ...moreProps } = props
    return {
      type: 'Feature',
      properties: {
        cluster: false,
        ...moreProps,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    }
  })

  return useSupercluster({ points, bounds, zoom, options })
}

const GoogleSuperCluster = ({
  children,
  GoogleApiKey,
  className,
  center,
  defaultCenter,
  defaultZoom,
  mapCallbackFn,
  options,
  params,
  refitOnCoordsChange,
  isClustering,
  childrenItems,
  ClusterComponent,
  clusterStyle,
  clusterCallback,
}) => {
  const mapRef = useRef()
  let maps = null
  let map = null
  const initialItems = []
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(defaultZoom)

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
  }, [params])

  // clusters && supercluster
  const { clusters, supercluster } = getClusters({
    isClustering,
    childrenItems,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: defaultZoom,
    },
  })

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

  const handleClusterMapChanged = (zoom, bounds) => {
    setZoom(zoom)
    setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat])
  }

  const childRefCallback = element => {
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
          key: 'AIzaSyCBc99VuJdxwj5E9VQyo0dhD4YZRU_edOM',
          channel: 'pclnHtlDetailComp',
          // key: `${GoogleApiKey}`
        }}
        center={center}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onGoogleApiLoaded={({ map, maps }) =>
          handleApiLoaded(map, maps, params)
        }
        options={handleMapOption}
        yesIWantToUseGoogleMapApiInternals
        zoom={zoom}
        onChange={({ zoom, bounds }) => handleClusterMapChanged(zoom, bounds)}
      >
        {/**
          Google Map React without Supercluster
          this remains the same as how you implement googleMapRaact before
         */}
        {!isClustering && children
          ? React.Children.map(children, element => {
              return React.cloneElement(element, {
                elementref: childRefCallback,
              })
            })
          : null}

        {/** Google Map React with Supercluster */}
        {isClustering &&
          clusters &&
          clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates
            const { PointMarker, cluster: isCluster } = cluster.properties
            return isCluster
              ? generateClusterMarker({
                  mapRef,
                  supercluster,
                  cluster,
                  ClusterComponent,
                  clusterStyle,
                  clusterCallback,
                  defaultZoom,
                  longitude,
                  latitude,
                  totalPointsCount: childrenItems.length,
                })
              : generatePointMarker({
                  PointMarker,
                  longitude,
                  latitude,
                })
          })}
      </GoogleMapReact>
    </MapWrapper>
  )
}

GoogleSuperCluster.propTypes = {
  GoogleApiKey: PropTypes.string,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  children: PropTypes.any,
  className: PropTypes.string,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  defaultZoom: PropTypes.number,
  mapCallbackFn: PropTypes.func,
  options: PropTypes.object,
  params: PropTypes.object,
  refitOnCoordsChange: PropTypes.bool,
  zoom: PropTypes.number,

  isClustering: PropTypes.bool,
  childrenItems: PropTypes.arrayOf(
    PropTypes.shape({
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
    })
  ),
  ClusterComponent: PropTypes.object,
  clusterStyle: PropTypes.shape({
    bgColor: PropTypes.string,
    bgSize: PropTypes.number,
    titleSize: PropTypes.number,
    subtitleSize: PropTypes.number,
  }),
  clusterCallback: PropTypes.func,
}

GoogleSuperCluster.defaultProps = {
  isClustering: false,
  defaultCenter: {
    lat: 0,
    lng: 180,
  },
  defaultZoom: 14,
  params: {},
  refitOnCoordsChange: false,
  GoogleApiKey: 'AIzaSyD2Zt3b8xGZVVqu3751QhKlm93v3FasoL8',
}

export default GoogleSuperCluster
