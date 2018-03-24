import React from 'react';
import PropTypes from 'prop-types';

const SliderDot = ({
  customDot,
  disableDot,
  position,
  dotSize,
  sliderSize,
  color,
  vertical,
 }) => {
  let defaultDot;
  const dotCentering = (sliderSize - dotSize) * 0.5;
  const dotWrapperStyles = {
    position: 'absolute',
    get left() { return !vertical ? `${position}%` : undefined; },
    get top() { return !vertical ? '0px' : undefined; },
    get bottom() { return !vertical ? undefined : `${position}%`; },
    get marginTop() { return !vertical ? `${dotCentering}px` : undefined; },
    get marginLeft() {
      return !vertical
      ? `-${dotSize * 0.5}px`
      : `${dotCentering}px`;
    },
    get marginBottom() {
      return !vertical
      ? undefined
      : `-${dotSize * 0.5}px`;
    },
  };
  if (!customDot) {
    const defaultDotStyles = {
      backgroundColor: `${color}`,
      borderRadius: '100%',
      height: `${dotSize}px`,
      width: `${dotSize}px`
    };
    defaultDot = <div className='dot' style={defaultDotStyles}></div>;
  }
  return (
    <div style={dotWrapperStyles}>
      {customDot}
      {defaultDot && defaultDot}
    </div>
  );
};
SliderDot.propTypes = {
  position: PropTypes.number,
  offsetTop: PropTypes.number,
  offsetLeft: PropTypes.number,
  sliderSize: PropTypes.number,
  dotSize: PropTypes.number,
  color: PropTypes.string,
  vertical: PropTypes.bool,
  disableDot: PropTypes.bool,
  customDot: PropTypes.node,
};
export default SliderDot;
