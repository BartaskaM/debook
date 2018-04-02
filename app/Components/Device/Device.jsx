import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const device = (props) => {
  return (
    <div className="grid__item device-card"> 
      <div className="device-card__image">
        <img src={props.image} />
      </div> 
      
      {props.available ?
        <div className="device-card__tag availability-tag availability-tag--available">     
          <span>Available</span>
        </div>
        :
        <div className="device-card__tag availability-tag availability-tag--unavailable">
          <span>Unavailable</span>
        </div>
      }
      
      <div className="device-card__main-content">
        <h4 className="device-card__title">
          <a href="/device-details">{props.brand}, {props.model}</a>
        </h4>
        <dl>
          <dt>Identification number: </dt>
          <dd>{props.id}</dd>
        </dl>
        <dl>
          <dt>OS: </dt>
          <dd>{props.os}</dd>
        </dl> 
        <dl>
          <dt>Location: </dt>
          <dd><a href="#nolink">{props.location}</a></dd>
        </dl>
        {props.available ? <br></br> :
          <dl>
            <dt>Custody of: </dt>
            <dd><a href="#nolink">{props.custody}</a></dd>
          </dl> 
        }
      </div>
    </div>
  );
};
device.propTypes = {
  image: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  os: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  custody: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default device;