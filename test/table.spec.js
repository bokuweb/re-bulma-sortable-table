import React from 'react';
import { shallow } from 'enzyme';
import assert from 'power-assert';
import Table from '../src';

const data = [
  { id: 0, name: 'Robert Mikels', createdAt: '2016/1/2' },
  { id: 1, name: 'Karyn Holmberg', props: { className: 'custom-class' }, createdAt: '2015/10/21' },
  { id: 2, name: 'John Smith', createdAt: '2012/5/2' },
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

describe ('Table test', () => {
  describe ('render', () => {
    it ('should render expected table with dummy data', () => {
      const wrapper = shallow(<Table data={data} columns={columns} />);
      assert.equal(wrapper.type(), 'table');
    });
  });
});
