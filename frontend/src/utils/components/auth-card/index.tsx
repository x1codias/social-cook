import React, { KeyboardEvent } from 'react';
import styles from './styles';
import foodImage from '../../../assets/beautiful-colorful-vector-illustration-seamless-food-wallpaper-background_950558-4988.avif';
import { Divider } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { useNavigate } from 'react-router';

type AuthCardProps = {
  handleSubmit: (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | KeyboardEvent<HTMLDivElement>
  ) => void;
  formData: {
    identifier?: string;
    password?: string;
    username?: string;
    email?: string;
    repeatPassword?: string;
  };
  setFormData: (formData: any) => void;
  inputs: {
    placeholder: string;
    type: string;
    value: string;
    name: string;
  }[];
};

const AuthCard: React.FC<AuthCardProps> = (props): JSX.Element => {
  const { inputs, formData, setFormData, handleSubmit } = props;
  const {
    CardContainer,
    CardTitle,
    InputField,
    ButtonContained,
    ButtonText,
    ButtonIcon,
  } = styles;
  const navigate = useNavigate();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <CardContainer>
      <div
        style={{
          padding: '22px 36px',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Comfortaa',
        }}
      >
        <CardTitle>{`Sign ${inputs.length > 2 ? 'Up' : 'In'}`}</CardTitle>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {inputs.map(input => (
            <InputField
              key={input.name}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              onKeyDown={handleKeyDown}
              onChange={handleFormDataChange}
            />
          ))}
          {inputs.length > 2 && <div></div>}
          <ButtonContained type="submit">{`Sign ${
            inputs.length > 2 ? 'Up' : 'In'
          }`}</ButtonContained>
        </form>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12px',
            marginBottom: '8px',
          }}
        >
          <p>
            {inputs.length > 2
              ? 'Already have an account?'
              : "Don't have an account yet?"}
          </p>
          <ButtonText
            onClick={() => navigate(inputs.length > 2 ? '/login' : '/register')}
          >{`Sign ${inputs.length === 2 ? 'Up' : 'In'}`}</ButtonText>
        </div>
        <Divider
          style={{ width: '100%', fontSize: '16px', marginBottom: '8px' }}
        >
          {'Or'}
        </Divider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}
        >
          <p style={{ fontSize: '12px', marginBottom: '6px' }}>
            {`Sign ${inputs.length > 2 ? 'Up' : 'In'} with:`}
          </p>
          <div>
            <ButtonIcon>
              <FcGoogle
                style={{
                  background: 'white',
                  borderRadius: '100%',
                  padding: '4px',
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
                size={40}
              />
            </ButtonIcon>
            <ButtonIcon>
              <BsFacebook
                size={40}
                style={{
                  fill: '#4267B2',
                  borderRadius: '100%',
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
              />
            </ButtonIcon>
          </div>
        </div>
      </div>
      <img
        src={foodImage}
        style={{
          display: 'block',
          maxWidth: inputs.length > 2 ? '480px' : '400px',
        }}
      />
    </CardContainer>
  );
};

export default AuthCard;
