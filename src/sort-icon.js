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
  const onTopClick = () => props.onClick('asc');
  const onBottomClick = () => props.onClick('desc');
  return (
    <div style={props.style}>
      <Arrow
        direction="top"
        onClick={onTopClick}
        style={{ ...styles.top, display: props.isAscActive ? 'block' : 'none' }}
        color={props.enabledColor}
      />
      <Arrow
        direction="bottom"
        onClick={onBottomClick}
        style={{ ...styles.bottom, display: props.isDescActive ? 'block' : 'none' }}
        color={props.enabledColor}
      />
    </div>
  );
}

SortIcon.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  isAscActive: PropTypes.bool,
  isDescActive: PropTypes.bool,
  enabledColor: PropTypes.string,
};
