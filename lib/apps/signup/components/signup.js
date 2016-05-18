import React, { Component, PropTypes } from 'react';
import { Link }  from 'react-router';
import { reduxForm }  from 'redux-form';
import { Form, Input, Select, Check, Button, Message } from '@ftbl/form';
import { Email, Question, User } from '@ftbl/icons';
import { Heading } from '@ftbl/component';
import validate from '../validate/user';

export class Signup extends Component {
  render() {
    const { fields, handleSubmit, signup: { error, signingUp }} = this.props;
  
    return (
      <Form onSubmit={handleSubmit} name='signup'>
        <Heading>Sign Up</Heading>

        <Input label='Your Name' field={fields.name} Icon={User} focus={true} />
        <Input label='Your Email' field={fields.email} Icon={Email} type='email' />
        <Input label='Password' field={fields.password} Icon={Question} type='password' />

        <Button label={signingUp ? 'Signing Up...' : 'Sign Up'}
                disabled={signingUp}
                onClick={handleSubmit} name='signup' />
        <Message>{error}</Message>
      </Form>
    );
  }
};

export default reduxForm({ 
  form: 'signup'
, fields: [ 'name', 'email', 'password' ]
, validate 
})(Signup);
