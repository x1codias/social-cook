import React, { KeyboardEvent, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { register } from '../../../actions/auth.actions';
import { useNavigate } from 'react-router';
import AuthCard from '../../../utils/components/auth-card';

type RegisterProps = ConnectedProps<typeof connector>;

const Register: React.FC<RegisterProps> = (props): JSX.Element => {
  const { register } = props;
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    photo?: string;
    biography?: string;
  }>({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const navigate = useNavigate();
  const loginInputs = [
    {
      placeholder: 'Username',
      type: 'text',
      name: 'username',
      value: formData.username,
    },
    {
      placeholder: 'Email',
      type: 'email',
      name: 'email',
      value: formData.email,
    },
    {
      placeholder: 'Password',
      type: 'password',
      name: 'password',
      value: formData.password,
    },
    {
      placeholder: 'Repeat Password',
      type: 'password',
      name: 'repeatPassword',
      value: formData.repeatPassword,
    },
  ];

  const handleRegister = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword, ...registerData } = formData;
    await register(registerData);
    navigate('/');
  };

  return (
    <AuthCard
      inputs={loginInputs}
      handleSubmit={handleRegister}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

const mapStateToProps = () => ({});

const connector = connect(mapStateToProps, { register });

export default connector(Register);
