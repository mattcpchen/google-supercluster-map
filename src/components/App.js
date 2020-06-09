import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'pcln-design-system'
import Header from "./organisms/Header"
import Footer from "./organisms/Footer"
import sydneyHotels from '../data/hotels_sydney'
import nycHotels from "../data/hotels_nyc"
import taipeiHotels from "../data/hotels_taipei"
import parisHotels from "../data/hotels_paris"
import CityMapSydney from './organisms/CityMap/CityMapSydney'
import CityMapNYC from './organisms/CityMap/CityMapNYC'
import CityMapTaipei from './organisms/CityMap/CityMapTaipei'
import CityMapParis from './organisms/CityMap/CityMapParis'


const AppContainer = styled.div`
  height: 87vh;
  margin-top: 3vh;
`

const AppPanel = styled(Flex)`
  box-shadow:
    rgba(0, 0, 0, 0.08) 0px 0px 2px 0px,
    rgba(0, 0, 0, 0.16) 0px 8px 32px 0px;
  padding: 12px 34px 24px 34px;
  margin: 0 auto;
  max-width: 880px;
  border-radius: 24px;
  height: 90%;
`

const AppController = styled(Footer)`
  margin-top: 20px;
`

const PanelHeader = styled(Header)`
  min-height: 35px;
  margin-bottom: 8px;
`

const PanelMap = styled(Box)`
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

const App = () => {
  const [city, updateCity] = useState(0)

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
    <AppContainer>
      <AppPanel flexDirection='column'>
        <PanelHeader city={city} />
        <PanelMap>
          <CityMap hotels={cityHotels} />
        </PanelMap>
      </AppPanel>
      <AppController
        city={city}
        handleUpdateCity={handleUpdateCity}
      />
    </AppContainer>
  )
}


App.propTypes = {}
App.defaultProps = {}

export default App
