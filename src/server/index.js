// @flow

import compression from 'compression'
import express from 'express'
import 'ignore-styles'

import { STATIC_PATH, WEB_PORT } from '../shared/config'
import { isProd } from '../shared/util'
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  helloEndpointRoute
} from '../shared/routes'
import renderApp from './render-app'

const app = express()

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

app.get(HOME_PAGE_ROUTE, (req, res) => {
  res.send(renderApp(req.url))
})

app.get(HELLO_PAGE_ROUTE, (req, res) => {
  res.send(renderApp(req.url, () => ({
    hello: {
      message: 'Server-side preloaded message'
    }
  })))
})

app.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
  res.send(renderApp(req.url, () => ({
    hello: {
      messageAsync: 'Server-side preloaded message for async page'
    }
  })))
})

app.get(helloEndpointRoute(), (req, res) => {
  res.json({ serverMessage: `Hello from the server! (received ${req.params.num})` })
})

app.get('/500', () => {
  throw Error('Internal Server Error')
})

app.get('*', (req, res) => {
  res.status(404).send(renderApp(req.url))
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:client" running in an other terminal'}.`)
})
