import React from 'react'
import { Link } from 'react-router-dom'
import {FaPlusSquare} from 'react-icons/fa';


const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-success">
            <div className="container">
                <a className="navbar-brand text-light" href="#">EVENT HUB</a>
                <div className="d-flex" role="search">
                    <button className="btn btn-dark"><Link className='nav-link' to="/createEvent"><FaPlusSquare size={25}/> Add Event</Link></button>

                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar