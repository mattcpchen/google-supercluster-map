import styled from 'styled-components'

/**
 * Note:
 * 1: color and size should be set thru clusterStyle
 * example:
 *    clusterStyle: {
 *      bgColor: '#c00',
 *      bgSize: '12,
 *    }
 */

const ClusterMarker = styled.div`
  position: relative;
  border-radius: 50%;
  color: #fff;
  border: 2px solid #fff;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
  text-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  text-shadow: 0px 0px 5px #000;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: translate(-50%, -100%);
`

export default ClusterMarker
