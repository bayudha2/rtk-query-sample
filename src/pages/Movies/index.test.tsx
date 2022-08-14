import { waitFor } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'

import { store } from '../../app/store'

import Dashboard from '.'

test('Show App Component', () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  )

  expect(screen.getByText('Dashboard Page')).toBeInTheDocument()
})
