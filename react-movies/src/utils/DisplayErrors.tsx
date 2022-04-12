import { nanoid } from 'nanoid'
import React from 'react'

export default function DisplayErrors(props:displayErrorsProps) {
    const style={color:'red'}
  return (
      <>
        {props.errors?<ul style={style}>
            {props.errors.map(error=><li key={nanoid()}>{error}</li>)}
        </ul>:null}
      </>
  )
}
interface displayErrorsProps{
    errors?:string[]
}