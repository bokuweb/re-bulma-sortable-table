import React, { PropTypes } from 'react';

const defaultStyle = {
  border: '1px solid #1fc8db',
  borderRight: 0,
  borderTop: 0,
  display: 'block',
  height: '6px',
  width: '6px',
};

export default function Icon(props) {
  const deg = props.direction === 'top' ? 135 : -45;
  const style = {
    ...defaultStyle,
    WebkitTransform: `rotate(${deg}deg)`,
    transform: `rotate(${deg}deg)`,
  };
  return (
    <div style={{ padding: '5px', width: '8px', cursor: 'pointer', ...props.style }}>
      <div style={{ ...style, borderColor: props.color }} />
    </div>
  );
}

Icon.propTypes = {
  style: PropTypes.object,
  color: PropTypes.string,
  direction: PropTypes.oneOf(['top', 'bottom']),
};
