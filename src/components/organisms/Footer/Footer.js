import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Flex, Text } from "pcln-design-system";
import styled from "styled-components";


const IconAsButton = styled(Icon)`
  cursor: pointer;
`

const StyledText = styled(Text)`
  width: 400px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  box-shadow:
    rgba(0,0,0,0.4) 0px 0px 20px 0px,
    rgba(0,0,0,0.4) 0px 0px 20px 0px;
`

const Footer = ({className, handleUpdateCity, city}) => {
  const allProjectNames = [
    'Find your people around you',
    'Book a Great Deal in New York',
    'Find Red Birds @ Taipei Park',
    'What color is your city']
  return (
    <Flex className={className} justifyContent='center' alignItems='center'>
      <IconAsButton
        name='BoxMinus'
        size={50}
        color='text'
        mr={2}
        onClick={ handleUpdateCity.bind(null, -1) }
      />
      <StyledText align='center'>
        {allProjectNames[city].toUpperCase()}
      </StyledText>
      <IconAsButton
        name='BoxPlus'
        size={50}
        color='text'
        ml={2}
        onClick={ handleUpdateCity.bind(null, 1) }
      />
    </Flex>
  )
}

Footer.propTypes = {
  city: PropTypes.number,
  handleUpdateCity: PropTypes.func,
}
Footer.defaultProps = {
  city: 0,
}


export default Footer;
