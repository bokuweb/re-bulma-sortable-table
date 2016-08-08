import React, { PropTypes } from 'react';
import Arrow from './arrow-icon';

const styles = {
  wrapper: {
    height: '20px',
    position: 'relative',
  },
  top: {
    position: 'absolute',
    top: '-2px',
  },
  bottom: {
    position: 'absolute',
    top: '5px',
  },
};

export default function SortIcon(props) {
  const onTopClick = () => props.onClick('asc');
  const onBottomClick = () => props.onClick('desc');
  const topColor = props.disableAsc ? props.disabledColor : props.enabledColor;
  const bottomColor = props.disableDesc ? props.disabledColor : props.enabledColor;
  return (
    <div style={{ ...styles.wrapper, ...props.style }}>
      <Arrow
        direction="top"
        onClick={onTopClick}
        style={{ ...styles.top, cursor: props.disableAsc ? 'auto' : 'pointer' }}
        color={topColor}
      />
      <Arrow
        direction="bottom"
        onClick={onBottomClick}
        style={{ ...styles.bottom, cursor: props.disableDesc ? 'auto' : 'pointer' }}
        color={bottomColor}
      />
    </div>
  );
}

SortIcon.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  disableAsc: PropTypes.bool,
  disableDesc: PropTypes.bool,
  disabledColor: PropTypes.string,
  enabledColor: PropTypes.string,
};
