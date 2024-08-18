import React, { KeyboardEvent, useState } from 'react';
import { register } from '../../../actions/auth.actions';
import { useNavigate } from 'react-router';
import AuthCard from '../../../utils/components/auth-card';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

const Register: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
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
    await dispatch(register(registerData));
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

export default Register;
