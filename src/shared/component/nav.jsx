// @flow

import React from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'

import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  NOT_FOUND_PAGE_ROUTE,
} from '../routes'
import {APP_NAME} from '../config'
import style from './nav.css'

const Nav = () =>
  <AppBar title={APP_NAME}>
    <Navigation type='horizontal' className={style.nav}>
      {[
        { route: HOME_PAGE_ROUTE, label: 'Home' },
        { route: HELLO_PAGE_ROUTE, label: 'Say Hello' },
        { route: HELLO_ASYNC_PAGE_ROUTE, label: 'Say Hello Asynchronously' },
        { route: NOT_FOUND_PAGE_ROUTE, label: '404 Demo' },
      ].map(link => (
        <li key={link.route}>
          <NavLink to={link.route} exact>{link.label}</NavLink>
        </li>
      ))}
    </Navigation>
  </AppBar>

export default Nav