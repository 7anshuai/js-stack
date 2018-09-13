// @flow

import React from 'react'
import { Button } from 'react-toolbox/lib/button'

type Props = {
  label: string,
  handleClick: Function,
}

const HelloButton = ({ label, handleClick }: Props) =>
  <Button onClick={handleClick} label={label} raised primary />

export default HelloButton