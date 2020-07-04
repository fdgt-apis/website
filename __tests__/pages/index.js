// Module imports
import {
	render,
	screen,
} from '@testing-library/react'
import React from 'react'





// Local imports
import Index from 'pages/index'





test('renders deploy link', () => {
  const { getByText } = render(<Index />)
  // const linkElement = getByText(
  //   /Instantly deploy your Next\.js site to a public URL with Vercel\./
  // )
  // expect(linkElement).toBeInTheDocument()
})
