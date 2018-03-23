import React from 'react';
import PropTypes from 'prop-types';

const SliderTrack = ({ trackLength, color, vertical }) => {
  let trackStyles = {
    backgroundColor: color,
    borderRadius: '6px',
    webkitBorderRadius: '6px',
    get width() { return !vertical ? `${trackLength}%` : '100%'; },
    get height() { return !vertical ? '100%' : `${trackLength}%`; },
    get position() { return !vertical ? undefined : 'absolute'; },
    get bottom() { return !vertical ? undefined : '0'; },
  };
  return (
    <div style={trackStyles}></div>
  );
};
SliderTrack.propTypes = {
  trackLength: PropTypes.number,
  color: PropTypes.string,
  vertical: PropTypes.bool,
};
export default SliderTrack;