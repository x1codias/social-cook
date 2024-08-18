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
    photo?: File;
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
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    formData.biography &&
      data.append('biography', formData.biography);
    formData.photo && data.append('photo', formData.photo);

    await dispatch(register(data));
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
