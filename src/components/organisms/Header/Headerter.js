import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Icon, Text} from "pcln-design-system";
import styled from "styled-components";

const IconAsButton = styled(Icon)`
  cursor: pointer;
`

const StyledText = styled(Text)`
  text-align: center;
  min-width: 450px;
  user-select: none;
`

const Header = ({ className, city, handleUpdateCity }) => {
  const allCityNames = [
    'Find Your People in Sydney',
    'Book a Great Deal in New York City',
    'Feed Red Birds @ Taipei Park',
    'What Color is Your Paris Soul?',
  ]
  return (
    <Flex className={className} justifyContent='center' alignItems='center'>
      <IconAsButton
        name='ArrowLeft'
        size={25}
        color='text'
        mr={2}
        onClick={ handleUpdateCity.bind(null, -1) }
      />

      <StyledText fontSize={4} bold>{allCityNames[city]}</StyledText>

      <IconAsButton
        name='ArrowRight'
        size={25}
        color='text'
        ml={2}
        onClick={ handleUpdateCity.bind(null, 1) }
      />
    </Flex>
  )
}

Header.propTypes = {
  className: PropTypes.string,
  city: PropTypes.number,
  handleUpdateCity: PropTypes.func,
};
Header.defaultProps = {
  city: 0,
}


export default Header;
