import React, { PropTypes } from 'react';
import Arrow from './arrow-icon';

const styles = {
  top: {
    position: 'absolute',
    top: 'calc(50% - 6px)',
  },
  bottom: {
    position: 'absolute',
    top: 'calc(50% - 10px)',
  },
};

export default function SortIcon(props) {
  return (
    <div style={props.style}>
      <Arrow
        direction="top"
        style={{ ...styles.top, display: props.isAscActive ? 'block' : 'none' }}
        color={props.enabledColor}
      />
      <Arrow
        direction="bottom"
        style={{ ...styles.bottom, display: props.isDescActive ? 'block' : 'none' }}
        color={props.enabledColor}
      />
    </div>
  );
}

SortIcon.propTypes = {
  style: PropTypes.object,
  isAscActive: PropTypes.bool,
  isDescActive: PropTypes.bool,
  enabledColor: PropTypes.string,
};
