import styled from 'styled-components'

/**
 * Note:
 * 1: color and size should be set thru clusterStyle
 * example:
 *    clusterStyle: {
 *      size: 22,
 *      color: '#c00',
 *    }
 */

const ClusterMarker = styled.div`
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
  padding: 10px;
  cursor: pointer;
  transform: translate(-50%, -100%);
`

export default ClusterMarker
