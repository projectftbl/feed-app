import React, { Component, PropTypes } from 'react';
import { reduxForm }  from 'redux-form';
import { Form, Select } from '@ftbl/form';
import { Menu } from '@ftbl/icons';

export class Filter extends Component {
  render() {
    const { fields, teams, players } = this.props;

    return (
      <Form name='filter-timeline'>
        <Select label='Select Team' field={fields.team} Icon={Menu} data={teams.data} displayProperty='name' />
        <Select label='Select Player' field={fields.player} Icon={Menu} readOnly={players.data.length===0} data={players.data} displayProperty='name' />
      </Form>
    );
  }
};

export default reduxForm({ form: 'filter-timeline', fields: [ 'team', 'player' ] })(Filter);
