import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'pcln-design-system'
import Header from './organisms/Header'
import sydneyHotels from '../data/hotels_sydney'
import nycHotels from "../data/hotels_nyc"
import taipeiHotels from "../data/hotels_taipei"
import parisHotels from "../data/hotels_paris"
import CityMapSydney from './organisms/CityMap/CityMapSydney'
import CityMapNYC from './organisms/CityMap/CityMapNYC'
import CityMapTaipei from './organisms/CityMap/CityMapTaipei'
import CityMapParis from './organisms/CityMap/CityMapParis'


const AppHolder = styled(Flex)`
  box-shadow:
    rgba(0, 0, 0, 0.08) 0px 0px 2px 0px,
    rgba(0, 0, 0, 0.16) 0px 8px 32px 0px;
  padding: 12px 34px 24px 34px;
  margin: 0 auto;
  height: 78vh;
  margin-top: 35px;
  max-width: 880px;
  padding: 0 30px 30px 30px;
  border-radius: 24px;
`

const StyledHeader = styled(Header)`
  height: 80px;
`

const CityMapHolder = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow:
    rgba(0,0,0,0.4) 0px 0px 20px 0px,
    rgba(0,0,0,0.4) 0px 0px 20px 0px;
`

const pickWithRandomTotal = (array, total)=> {
  const range = Math.floor(total/10)
  const finalTotal = total-range + Math.floor(Math.random()*2*range)
  return array.slice(0, finalTotal)
}

const pickRandomCity = () => {
  return Math.floor(Math.random()*4)
}

const App = () => {
  const [city, updateCity] = useState(pickRandomCity())

  const handleUpdateCity = (dir) => {
    const total = 4
    const newCity = city+dir;
    if (newCity === total) {
      updateCity(0)
    } else if (newCity === -1) {
      updateCity(total-1)
    } else {
      updateCity(newCity)
    }
  }

  const GoogleApiKey = 'AIzaSyD2Zt3b8xGZVVqu3751QhKlm93v3FasoL8'
  const allCityMaps = [CityMapSydney, CityMapNYC, CityMapTaipei, CityMapParis]
  const allCityHotels = [sydneyHotels, nycHotels, taipeiHotels, parisHotels]
  const allCityCounts = [50, 20, 20, 35, 35]
  const CityMap = allCityMaps[city]
  const cityHotels = pickWithRandomTotal(allCityHotels[city], allCityCounts[city])

  return (
    <AppHolder
      flexDirection='column'
      alignItems='center'
    >

      <StyledHeader
        city={city}
        handleUpdateCity={handleUpdateCity}
      />

      <CityMapHolder>
        <CityMap hotels={cityHotels} />
      </CityMapHolder>

    </AppHolder>
  )
}


App.propTypes = {}
App.defaultProps = {}

export default App
