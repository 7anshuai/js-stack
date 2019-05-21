// @flow

import React from 'react'

type Props = {
  label: string,
  handleClick: Function,
}

const HelloButton = ({ label, handleClick }: Props) =>
  <button className='input-reset' onClick={handleClick}>{label}</button>

export default HelloButton