import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Menu extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light justify-content-center">
          <Link to="/" className="navbar-brand text-center">
            MY AWESOME WORDPRESS.js
          </Link>
        </nav>
      </div>
    )
  }
}

export default Menu
