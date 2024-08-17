import React, { KeyboardEvent, useState } from 'react';
import styles from './styles';
import foodImage from '../../../assets/beautiful-colorful-vector-illustration-seamless-food-wallpaper-background_950558-4988.avif';
import { Divider, InputAdornment } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { useGoogleLogin } from '@react-oauth/google';

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
    photo?: string;
    biography?: string;
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
    PasswordButton,
  } = styles;
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        console.log('User authenticated:', tokenResponse);

        // Handle success, e.g., store the token or redirect the user
      } catch (error) {
        console.error('Google Login Error:', error);
      }
    },
    onError: error => {
      console.error('Login Failed:', error);
    },
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement;
    if (type === 'file' && files) {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        setFormData({ ...formData, [name]: fileInput.files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const togglePasswordVisibility = (name: string) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
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
              width={420}
              key={input.name}
              name={input.name}
              type={
                input.name.toLowerCase().includes('password') &&
                passwordVisibility[input.name]
                  ? 'text'
                  : input.type
              }
              placeholder={input.placeholder}
              value={input.value}
              InputProps={{
                endAdornment: input.name.toLowerCase().includes('password') && (
                  <InputAdornment position="end">
                    <PasswordButton
                      variant={'text'}
                      onClick={() => togglePasswordVisibility(input.name)}
                    >
                      {passwordVisibility[input.name] ? 'Hide' : 'Show'}
                    </PasswordButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={handleKeyDown}
              onChange={handleFormDataChange}
            />
          ))}
          {inputs.length > 2 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                minHeight: '100px',
                justifyContent: 'space-between',
              }}
            >
              <InputField
                width={120}
                type={'file'}
                name={'photo'}
                height={'100px'}
                onKeyDown={handleKeyDown}
                onChange={handleFormDataChange}
                value={formData.photo}
                InputProps={{
                  inputProps: {
                    accept: 'image/*', // Optional: Limit to image files
                  },
                }}
              />
              <InputField
                width={290}
                type={'text'}
                name={'biography'}
                multiline
                height={'100px'}
                placeholder={'Biography'}
                onKeyDown={handleKeyDown}
                onChange={handleFormDataChange}
                value={formData.biography}
              />
            </div>
          )}
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
            <ButtonIcon
              onClick={() => (inputs.length > 2 ? '' : googleLogin())}
            >
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
