import React, { Component, PropTypes } from 'react';
import styles from './styles';
import shallowEqual from './shallow-equals';
import SortIcon from './sort-icon';

export default class RebulmaSortableTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    enabledIconColor: PropTypes.string,
    disabledIconColor: PropTypes.string,
    isBordered: PropTypes.bool,
    isStriped: PropTypes.bool,
    className: PropTypes.string,
    defaultSort: PropTypes.shape({
      key: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
    styles: PropTypes.object,
  };

  static defaultProps = {
    enabledIconColor: '#1fc8db',
    disabledIconColor: '#f5f7fa',
    defaultSort: {
      key: '',
      type: 'asc',
    },
    styles: {},
  }

  constructor(props) {
    super(props);
    const { key, type } = props.defaultSort;
    this.state = {
      data: this.sortData(props.data, key, type),
      sort: { key, type },
      hoverd: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { key, type } = this.state.sort;
    this.setState({ data: this.sortData(nextProps.data, key, type) });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
  }

  compare(a, b) {
    const ax = [];
    const bx = [];
    String(a)
      .replace(',', '')
      .replace(/(\d+)|(\D+)/g, (_, $1, $2) => ax.push([$1 || Infinity, $2 || '']));
    String(b)
      .replace(',', '')
      .replace(/(\d+)|(\D+)/g, (_, $1, $2) => bx.push([$1 || Infinity, $2 || '']));
    while (ax.length && bx.length) {
      const an = ax.shift();
      const bn = bx.shift();
      const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
      if (nn) return nn;
    }
    return ax.length - bx.length;
  }

  sortData(data, key, type = 'asc') {
    return data.sort((a, b) => {
      const column = this.props.columns.filter(c => c.key === key)[0];
      if (type === 'asc') {
        if (column && column.ascSorter) return column.ascSorter(a[key], b[key]);
        return this.compare(a[key], b[key]);
      }
      if (type === 'desc') {
        if (column && column.descSorter) return column.descSorter(a[key], b[key]);
        return this.compare(b[key], a[key]);
      }
      throw new Error('Unkown sort type [${type}], sort type is one of [\'desc\', \'asc\'].');
    });
  }

  sort(key, type) {
    if (key === this.state.sort.key && type === this.state.sort.type) return;
    this.setState({
      data: this.sortData(this.state.data, key, type),
      sort: { key, type },
    });
  }

  renderIcon(key) {
    const { sort } = this.state;
    const isDescActive = key === sort.key && sort.type === 'desc';
    const isAscActive = key === sort.key && sort.type === 'asc';
    return (
      <div style={{ ...styles.icon, ...this.props.styles.icon }}>
        <SortIcon
          isAscActive={isAscActive}
          isDescActive={isDescActive}
          enabledColor={this.props.enabledIconColor}
          disableColor={this.props.disabledIconColor}
        />
      </div>
    );
  }

  renderHeader() {
    const { key, type } = this.state.sort;
    return this.props.columns.map(c => {
      const onClick = () => {
        const nextType = key === c.key && type === 'desc'
                ? 'asc'
                : 'desc';
        this.sort(c.key, nextType);
      };
      const style = {
        ...styles.th,
        ...this.props.styles.th,
        ...c.columnStyle,
        ...(c.props && c.props.style),
        cursor: c.sortable === false ? 'auto' : 'pointer',
      };
      if (this.props.isBordered) style.borderWidth = '1px';
      return (
        <th
          {...c.props}
          style={style}
          key={c.key}
          onClick={onClick}
        >
          <div>
            {c.name}
            {c.sortable === false ? null : this.renderIcon(c.key)}
          </div>
        </th>
      );
    });
  }

  renderData(d) {
    return this.props.columns.map(c => {
      const style = {
        ...styles.td,
        ...this.props.styles.td,
        ...c.columnStyle,
        ...(d.props && d.props.style),
      };
      if (this.props.isBordered) style.borderWidth = '1px';
      return (
        <td
          {...d.props}
          style={style}
          key={c.key}
        >
          {c.render ? c.render(d[c.key]) : d[c.key]}
        </td>
      );
    });
  }

  renderRow() {
    return this.state.data.map((d, i) => {
      const style = {
        ...i % 2 === 0 ? styles.evenColor : styles.oddColor,
        ...this.state.hoverd === i ? styles.hoverColor : {},
      };
      const onEnter = () => this.setState({ hoverd: i });
      const onLeave = () => this.setState({ hoverd: null });
      return (
        <tr
          key={i}
          style={style}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {this.renderData(d)}
        </tr>
      );
    });
  }

  render() {
    return (
      <table
        style={{ ...styles.table, ...this.props.styles.table }}
        className={this.props.className}
      >
        <thead>
          <tr>
            {this.renderHeader()}
          </tr>
        </thead>
        <tbody>
          {this.renderRow()}
        </tbody>
      </table>
    );
  }
}
