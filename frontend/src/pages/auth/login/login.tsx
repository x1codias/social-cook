import React, { KeyboardEvent, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { login } from '../../../actions/auth.actions';
import { useNavigate } from 'react-router';
import AuthCard from '../../../utils/components/auth-card';

type LoginProps = ConnectedProps<typeof connector>;

const Login: React.FC<LoginProps> = (props): JSX.Element => {
  const { login } = props;
  const [formData, setFormData] = useState<{
    identifier: string;
    password: string;
  }>({
    identifier: '',
    password: '',
  });
  const navigate = useNavigate();
  const loginInputs = [
    {
      placeholder: 'Username or Email',
      type: 'text',
      name: 'identifier',
      value: formData.identifier,
    },
    {
      placeholder: 'Password',
      type: 'password',
      name: 'password',
      value: formData.password,
    },
  ];

  const handleLogin = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    await login(formData);
    navigate('/');
  };

  return (
    <AuthCard
      inputs={loginInputs}
      handleSubmit={handleLogin}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

const mapStateToProps = () => ({});

const connector = connect(mapStateToProps, { login });

export default connector(Login);
