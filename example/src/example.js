import React, { Component } from 'react';
import HelloWorld from '../../src';


const data = [
  { id: 3, name: 'Satoshi Yamamoto', class: 'B' },
  { id: '2012/1/2', name: 'Taro Tanaka', class: 'A', props: {className: 'hoge' }},
  { id: '2013/01/01', name: 'Ken Asada', class: 'A',  },
  { id: '2012/01/01', name: 'Masaru Tokunaga', class: 'C'  },
];

const columns = [
  {
    columnStyle: { width: '30px' },
    name: 'ID',
    key: 'id',
    props: { className: 'test' },
    // render: (id) => { return <a href={'user/'+id}>{id}</a>; }
  },
  {
    name: 'NAME',
    key: 'name',
    props: { className: 'align-left' },
  },
  {
    name: 'CLASS',
    key: 'class',
    sortable: false,
  }
];


export default class Example extends Component{
  render() {
    return (
      <HelloWorld
        data={data}
        columns={columns}
        isBordered
        isStriped
        defaultSort={{ key: 'name', type: 'desc' }}
      />
    );
  }
}
