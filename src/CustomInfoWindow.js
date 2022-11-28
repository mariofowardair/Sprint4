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
        Details: {position.details}
        <br />
        Host: {position.host_email}
        <br />
        Invite Only: {position.is_invite_only}
        <br />
        Guest Capacity: {position.max_attendees}
        <br />
        Start Time: {position.start_time}
        <br />
        End Time: {position.end_time}
        <br />
      </p>

      <button type="button" onClick={close}>
        Close
      </button>
    </section>
  )
}

export default CustomInfoWindow
