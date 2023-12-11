import React from 'react'
import { NavBar } from '../utils/NavBar'
import { Container } from 'react-bootstrap'

export const Espacios = () => {
  return (
    <>
      <NavBar />

      <Container className='mt-3'>
        <h1 className="text-center text-primary">
          Espacios de Trabajo
        </h1>
      </Container>
    </>
  )
}
