/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SliderThumb from './SliderThumb.jsx';
import SliderLabel from './SliderLabel.jsx';
import SliderTrack from './SliderTrack.jsx';

function noOp() {}

export default class Slider extends Component {
  static propTypes = {
    children: PropTypes.element,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func,
    vertical: PropTypes.bool,
    verticalSliderHeight: PropTypes.string,
    eventWrapperPadding: PropTypes.number,
    label: PropTypes.bool,
    disableTrack: PropTypes.bool,
    disableThumb: PropTypes.bool,
    sliderColor: PropTypes.string,
    trackColor: PropTypes.string,
    thumbColor: PropTypes.string,
    sliderSize: PropTypes.number,
    thumbSize: PropTypes.number,
    id: PropTypes.string,
  }
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    onChange: noOp,
    onChangeComplete: noOp,
    vertical: false,
    verticalSliderHeight: '200px',
    eventWrapperPadding: 8,
    label: false,
    disableTrack: false,
    disableThumb: false,
    sliderColor: '#B9B9B9',
    trackColor: '#5c72fd',
    thumbColor: '#5b94fe',
    sliderSize: 6,
    id: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      drag: false,
    };
    this.onInteractionStart = this.onInteractionStart.bind(this);
    this.onMouseOrTouchMove = this.onMouseOrTouchMove.bind(this);
    this.onInteractionEnd = this.onInteractionEnd.bind(this);
    this.computeSliderColor = this.computeSliderColor.bind(this);
    this.colorValPerc = this.colorValPerc.bind(this);
  }
  componentWillMount() {
    this.updateStateFromProps(this.props);
  }
  componentDidMount() {
    if (this.props.onChange.name === 'noOp') {
      console.warn(
        `A react-simple-range component was not provided an onChange prop.
        \nRecommend passing down a function as onChange else this component is purely cosmetic`);
    }
    this.computeSliderColor(this.props.value);
  }
  componentWillReceiveProps(nextProps) {
    this.updateStateFromProps(nextProps);
  }
  colorValPerc(percent, start, end) {
    var a = percent / 100,
        b = (end - start) * a,
        c = b + start;

    // Return a CSS HSL string
    return 'hsl('+c+', 100%, 50%)';
  }
  computeSliderColor(val) {
    const red = 0;
    const green = 120;
    let sliderColor = this.colorValPerc(val, red, green);
    this.setState({sliderColor: sliderColor});
  } 
  onInteractionStart(e) {
    const eventType = (e.touches !== undefined ? 'touch' : 'mouse');
    const leftMouseButton = 0;
    if ((eventType === 'mouse') && (e.button !== leftMouseButton)) return;
    this.updateSliderValue(e, eventType);
    this.setState({ drag: true, displayLabel: true });
    this.addEvents(eventType);
    e.preventDefault();
  }
  onInteractionEnd() {
    this.setState({
      drag: false,
      displayLabel: false,
    });
    this.props.onChangeComplete(this.state);
    this.removeEvents();
  }
  onMouseOrTouchMove(e) {
    const eventType = (e.touches !== undefined ? 'touch' : 'mouse');
    if (!this.state.drag) return;
    this.updateSliderValue(e, eventType);
    e.stopPropagation();
  }
  getSliderInfo() {
    const sl = this.refs.slider;
    const sliderInfo = {
      bounds: sl.getBoundingClientRect(),
      length: sl.clientWidth,
      height: sl.clientHeight,
    };
    return sliderInfo;
  }
  addEvents(type) {
    switch (type) {
      case 'mouse': {
        document.addEventListener('mousemove', this.onMouseOrTouchMove);
        document.addEventListener('mouseup', this.onInteractionEnd);
        break;
      }
      case 'touch': {
        document.addEventListener('touchmove', this.onMouseOrTouchMove);
        document.addEventListener('touchend', this.onInteractionEnd);
        break;
      }
      default: // nothing
    }
  }
  removeEvents() {
    document.removeEventListener('mousemove', this.onMouseOrTouchMove);
    document.removeEventListener('mouseup', this.onInteractionEnd);
    document.removeEventListener('touchmove', this.onMouseOrTouchMove);
    document.removeEventListener('touchend', this.onInteractionEnd);
  }
  //called on dragging slider
  updateSliderValue(e, eventType) {
    const { max, min } = this.state;
    const { vertical } = this.props;
    let { value } = this.state;
    const xCoords = (eventType !== 'touch' ? e.pageX : e.touches[0].pageX) - window.pageXOffset;
    const yCoords = (eventType !== 'touch' ? e.pageY : e.touches[0].pageY) - window.pageYOffset;
    // compare position to slider length to get percentage
    let position;
    let lengthOrHeight;
    if (!vertical) {
      position = xCoords - this.getSliderInfo().bounds.left;
      lengthOrHeight = this.getSliderInfo().length;
    } else {
      lengthOrHeight = this.getSliderInfo().height;
      position = lengthOrHeight - (yCoords - this.getSliderInfo().bounds.top);
    }
    const percent = this.clampValue(+(position / lengthOrHeight).toFixed(2), 0, 1);
    // convert perc -> value then match value to notch as per props/state.step
    const rawValue = this.valueFromPercent(percent);
    value = this.calculateMatchingNotch(rawValue);
    // avoid repeated updates of the same value
    if (value === this.state.value) return;
    // percentage of the range to render the track/thumb to
    const ratio = (value - min) * 100 / (max - min);
    this.computeSliderColor(value);
    console.log('value: ', value);
    this.setState({
      percent,
      value,
      ratio,
    }, this.handleChange);
  }
  handleChange() {
    this.props.onChange(this.state);
  }
  valueFromPercent(perc) {
    const { range, min } = this.state;
    const val = (range * perc) + min;
    return val;
  }
  calculateMatchingNotch(value) {
    const { step, max, min } = this.state;
    const values = [];
    for (let i = min; i <= max; i++) {
      values.push(i);
    }
    const notches = [];
    // find how many entries in values are divisible by step (+min,+max)
    for (const s of values) {
      if (s === min || s === max || s % step === 0) {
        notches.push(s);
      }
    }
    // reduce over the potential notches and find which is the closest
    const match = notches.reduce((prev, curr) => {
      if (Math.abs(curr - value) < Math.abs(prev - value)) {
        return curr;
      }
      return prev;
    });
    return match;
  }
  clampValue(val, min, max) {
    return Math.max(min, Math.min(val, max));
  }
  updateStateFromProps(props) {
    let { value, thumbSize } = props;
    if (value === undefined) {
      value = (props.defaultValue !== undefined ? props.defaultValue : 0);
    }
    if (props.thumbSize === undefined) {
      thumbSize = (this.props.disableThumb ? 0 : props.sliderSize * 3);
    }
    const { min, max, step, id } = props;
    const range = max - min;
    const ratio = Math.max((value - min), 0) * 100 / (max - min);
    this.setState({
      value,
      min,
      max,
      range,
      step,
      ratio,
      thumbSize,
      id,
    });
    this.computeSliderColor(value);
  }
  render() {
    const {
      vertical,
      sliderSize,
      disableThumb,
      disableTrack,
      children,
      label,
      trackColor,
      thumbColor,
      verticalSliderHeight,
      eventWrapperPadding,
    } = this.props;
    const eventWrapperStyle = {
      height: '100%',
      position: 'relative',
      cursor: 'pointer',
      margin: '0 auto',
      display: 'inline-block',
      get padding() {
        return !vertical
        ? `${eventWrapperPadding}px 0`
        : `0 ${eventWrapperPadding}px`;
      },
      get width() { return !vertical ? 'auto' : `${sliderSize}px`; },
    };
    const sliderStyle = {
      backgroundColor: this.state.sliderColor,
      position: 'relative',
      borderRadius: '6px',
      webkitBorderRadius: '6px',
      overflow: 'visible',
      get height() {
        return !vertical
        ? `${sliderSize}px`
        : verticalSliderHeight;
      },
      get width() { return !vertical ? '100%' : `${sliderSize}px`; },
    };
    return (
      <div
        style={eventWrapperStyle}
        onMouseDown={this.onInteractionStart}
        onTouchStart={this.onInteractionStart}
      >
        <div
          ref="slider"
          style={sliderStyle}
        >
          {!disableTrack
            ? <SliderTrack
              trackLength={this.state.ratio}
              color={trackColor}
              vertical={vertical}
            />
            : null
          }
          
          <SliderThumb
            position={this.state.ratio}
            vertical={vertical}
            customThumb={children}
            thumbSize={this.state.thumbSize}
            sliderSize={sliderSize}
            color={thumbColor}
            disableThumb={disableThumb}
            value={this.state.value}
          />

        </div>
      </div>
    );
  }
}
