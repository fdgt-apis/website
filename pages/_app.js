// Style imports
import '../scss/reset.scss'
import '../scss/lib.scss'
import '../scss/app.scss'





// Module imports
import {
  config as faConfig,
  library as faLibrary,
} from '@fortawesome/fontawesome-svg-core'
import LocalForage from 'localforage'
import NextHead from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import { Banner } from 'components/Banner'
import { Brand } from 'components/Brand'
import { ExampleModeContextProvider } from 'context/ExampleModeContext'
import { Simulator } from 'components/Simulator'
import { SimulatorContextProvider } from 'context/SimulatorContext'
import * as fasIcons from 'helpers/fasIconLibrary'
import * as fabIcons from 'helpers/fabIconLibrary'
import * as farIcons from 'helpers/farIconLibrary'





// Configure and populate FontAwesome library
faConfig.autoAddCss = false
faLibrary.add(fasIcons)
faLibrary.add(fabIcons)
faLibrary.add(farIcons)

const App = ({ Component, pageProps }) => {
	LocalForage.config({
		name: 'fdgt.dev',
		storeName: 'webStore',
	})

	return (
		<ExampleModeContextProvider>
			<SimulatorContextProvider>
				<NextHead>
					<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
					<link rel="icon" href="/favicon/favicon.svg" />
					<link rel="manifest" href="/site.webmanifest" />
					<link
						href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&amp;family=Source+Code+Pro:wght@400;700&amp;display=swap"
						rel="stylesheet" />
				</NextHead>

				<Brand />
				<Banner />
				<Component {...pageProps} />
				<Simulator />
			</SimulatorContextProvider>
		</ExampleModeContextProvider>
	)
}

App.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  pageProps: PropTypes.object.isRequired,
}





export default App
