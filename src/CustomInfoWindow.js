import React from 'react'

const CustomInfoWindow = ({ position, close }) => {
  return (
    <section
      style={{
        position: 'relative',
        border: '1px solid',
        width: '200px',
        marginLeft: '5px',
        marginTop: '5px',
        background: '#fff',
        padding: '1em',
      }}
    >
      <p>{position.title}</p>
      <p>
        Location: {position.location}
        <br />
        Latitude: {position.lat}
        <br />
        Longitude: {position.lng}
        <br />
      </p>

      <button type="button" onClick={close}>
        Close
      </button>
    </section>
  )
}

export default CustomInfoWindow
