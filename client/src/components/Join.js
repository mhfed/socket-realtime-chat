import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Join() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="container">
      <h1 className="text-center">Join Room Chat</h1>
      <br/>
      <form>
        <div className="form-group">
          <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter Name"  onChange={event => setName(event.target.value)} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="room" aria-describedby="room" placeholder="Enter Room"  onChange={event => setRoom(event.target.value)} />
        </div>
        <div className="d-flex justify-content-end">
          <Link to={`/chat?name=${name}&room=${room}`} onClick={event => (!name || !room) ? event.preventDefault() : null}>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Join
