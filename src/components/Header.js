import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'


import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to='/' className="item" style={{fontSize: 30}}>
      <i class="fab fa-glide"></i> &nbsp; Glide 
      </Link>
      <div className="right menu">
        <Link to="/" className="item" style={{fontSize: 25}}>
        <FontAwesomeIcon icon={faHome}/>
        </Link>
        <div className="item">
          <GoogleAuth />
          
        </div>
        
      </div>
    </div>
  );
}
export default Header;