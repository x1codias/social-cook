import React, { KeyboardEvent, useState } from 'react';
import { login } from '../../../actions/auth.actions';
import { useNavigate } from 'react-router';
import AuthCard, {
  InputTypes,
} from '../../../utils/components/auth-card';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

const Login: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
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
      type: InputTypes.text,
      name: 'identifier',
      value: formData.identifier,
      required: true,
    },
    {
      placeholder: 'Password',
      type: InputTypes.password,
      name: 'password',
      value: formData.password,
      required: true,
    },
  ];

  const handleLogin = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    await dispatch(login(formData));
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

export default Login;
