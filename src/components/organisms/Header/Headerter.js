import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Text} from "pcln-design-system";

const Header = ({className, city}) => {
  const allCityNames = ['SYdNEy', 'NyC', 'TaIPei', 'PaRIs']
  return (
    <Flex className={className} justifyContent='center' alignItems='center'>
      <Text>WELCOME to</Text>
      <Text ml={1} fontSize={4} bold>{allCityNames[city]}</Text>
    </Flex>
  )
}

Header.propTypes = {
  city: PropTypes.number
};
Header.defaultProps = {
  city: 0,
}


export default Header;
