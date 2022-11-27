import React from 'react'

const Marker = ({ showInfo }) => {
  return (
    <img
      onClick={showInfo}
      src="https://img.icons8.com/dusk/64/000000/marker.png"
      alt=""
      style={{
        width: '40px',
        height: '40px',
        position: 'absolute',
        top: '-35px',
        left: '-20px',
      }}
    />
  )
}
export default Marker
