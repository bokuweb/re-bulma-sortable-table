import React from 'react';
import Table from '../../src';

const data = [
  { id: 0, name: 'Robert Mikels', createdAt: '2016/1/2' },
  { id: 1, name: 'Karyn Holmberg', props: { className: 'custom-class' }, createdAt: '2015/10/21' },
  { id: 2, name: 'John Smith', createdAt: '2012/5/2' },
  { id: 3, name: 'Misty Abbott', createdAt: '2016/8/1' },
];

const columns = [
  {
    columnStyle: { width: '50px' },
    name: 'ID',
    key: 'id',
    props: { className: 'test' },
  }, {
    name: 'Name',
    key: 'name',
    props: { className: 'custom-head-class' },
  }, {
    name: 'Create at',
    key: 'createdAt',
  },
];


export default function Example() {
  return (
    <Table
      data={data}
      columns={columns}
      isStriped
      styles={{
        icon: { top: '3px' },
        table: { borderTop: '2px solid #ccc' },
      }}
      defaultSort={{ key: 'name', type: 'desc' }}
    />
  );
}
