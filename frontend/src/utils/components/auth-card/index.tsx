import React, { KeyboardEvent, useState } from 'react';
import styles from './styles';
import foodImage from '../../../assets/beautiful-colorful-vector-illustration-seamless-food-wallpaper-background_950558-4988.avif';
import {
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import {
  facebookAuthentication,
  googleAuthentication,
} from '../../../actions/auth.actions';
import { AppDispatch } from '../../../store';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import DefaultButton from '../button/button';
import DefaultInput from '../input/input';
import ImageInput from '../image-input';
import {
  validateInput,
  validateRequiredFieldsEmpty,
} from '../../functions/form-validation';
import InputErrors from './components/input-errors';

// eslint-disable-next-line react-refresh/only-export-components
export enum InputTypes {
  text = 'text',
  password = 'password',
  email = 'email',
}

interface ValidationErrors {
  [key: string]: string;
}

export interface ValidationResults {
  password: ValidationErrors;
  username: ValidationErrors;
  repeatPassword: ValidationErrors;
  email: ValidationErrors;
}

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
    photo?: File;
    biography?: string;
  };
  setFormData: (formData: any) => void;
  inputs: {
    placeholder: string;
    type: InputTypes;
    value: string;
    name:
      | 'username'
      | 'password'
      | 'repeatPassword'
      | 'email';
    required: boolean;
  }[];
};

const AuthCard: React.FC<AuthCardProps> = (
  props
): JSX.Element => {
  const { inputs, formData, setFormData, handleSubmit } =
    props;
  const {
    CardContainer,
    CardTitle,
    ButtonText,
    PasswordButton,
  } = styles;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] =
    useState<{
      [key: string]: boolean;
    }>({});
  const [validationResults, setValidationResults] =
    useState<ValidationResults>({
      password: {},
      username: {},
      repeatPassword: {},
      email: {},
    });

  const googleAuth = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        await dispatch(
          googleAuthentication(tokenResponse.access_token)
        );
        navigate('/');
      } catch (error) {
        console.error('Google Login Error:', error);
      }
    },
    onError: error => {
      console.error('Login Failed:', error);
    },
  });

  const dispatchFBAuth = async (accessToken: string) => {
    try {
      await dispatch(facebookAuthentication(accessToken));
      navigate('/');
    } catch (error) {
      console.error('Facebook Login Error:', error);
    }
  };

  const facebookAuth = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await FacebookLoginClient.loadSdk('en_US');
    FacebookLoginClient.init({
      appId: import.meta.env.VITE_FACEBOOK_APP_ID,
      version: 'v16.0',
    });
    FacebookLoginClient.login(
      res => {
        if (res.authResponse?.accessToken) {
          dispatchFBAuth(res.authResponse?.accessToken);
        }
      },
      {
        scope: 'public_profile, email',
      }
    );
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleFormDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, files } =
      e.target as HTMLInputElement;
    if (type === 'file' && files && files.length) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
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

  const handleBlurValidation = (input: {
    placeholder: string;
    type: InputTypes;
    value: string;
    name: string;
    required: boolean;
  }) => {
    if (inputs.length > 2) {
      const result = validateInput(
        input.name,
        input.value,
        input.name === 'repeatPassword'
          ? inputs.find(inp => inp.name === 'password')
              ?.value
          : undefined
      );

      setValidationResults({
        ...validationResults,
        [input.name]: result,
      });
    }
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
        <CardTitle>{`Sign ${
          inputs.length > 2 ? 'Up' : 'In'
        }`}</CardTitle>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {inputs.map(input => (
            <>
              <DefaultInput
                minWidth={'420px'}
                key={input.name}
                name={input.name}
                type={
                  input.name
                    .toLowerCase()
                    .includes('password') &&
                  passwordVisibility[input.name]
                    ? 'text'
                    : input.type
                }
                placeholder={input.placeholder}
                value={input.value}
                InputProps={{
                  endAdornment: input.name
                    .toLowerCase()
                    .includes('password') ? (
                    <InputAdornment position="end">
                      <PasswordButton
                        variant={'text'}
                        onClick={() =>
                          togglePasswordVisibility(
                            input.name
                          )
                        }
                      >
                        {passwordVisibility[input.name]
                          ? 'Hide'
                          : 'Show'}
                      </PasswordButton>
                    </InputAdornment>
                  ) : undefined,
                }}
                onKeyDown={handleKeyDown}
                onChange={handleFormDataChange}
                onBlur={() => handleBlurValidation(input)}
                hasError={
                  input.value.length > 0 &&
                  Object.values(
                    validationResults[input.name]
                  ).some(Boolean)
                }
              />
              <InputErrors
                validationResults={validationResults}
                inputName={input.name}
              />
            </>
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
              <ImageInput
                onDeleteImage={() => {}}
                onImageChanged={() => {}}
                customStyles={{
                  height: '100%',
                  maxWidth: '30%',
                }}
                customIconSize={30}
              />
              <DefaultInput
                minWidth={'290px'}
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
          <DefaultButton
            customStyles={{
              alignSelf: 'center',
              padding: '8px 26px',
            }}
            type={'submit'}
            label={`Sign ${
              inputs.length > 2 ? 'Up' : 'In'
            }`}
            disabled={
              validateRequiredFieldsEmpty(
                inputs.map(inp => inp.value)
              ) ||
              Object.values(validationResults).some(
                validation =>
                  Object.values(validation).some(Boolean) // Check if any validation error is truthy
              )
            }
          />
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
            onClick={() =>
              navigate(
                inputs.length > 2 ? '/login' : '/register'
              )
            }
          >{`Sign ${
            inputs.length === 2 ? 'Up' : 'In'
          }`}</ButtonText>
        </div>
        <Divider
          style={{
            width: '100%',
            fontSize: '16px',
            marginBottom: '8px',
          }}
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
          <p
            style={{
              fontSize: '12px',
              marginBottom: '6px',
            }}
          >
            {`Sign ${
              inputs.length > 2 ? 'Up' : 'In'
            } with:`}
          </p>
          <div>
            <IconButton onClick={() => googleAuth()}>
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
            </IconButton>
            <IconButton onClick={e => facebookAuth(e)}>
              <BsFacebook
                size={40}
                style={{
                  fill: '#4267B2',
                  borderRadius: '100%',
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
              />
            </IconButton>
          </div>
        </div>
      </div>
      <img
        src={foodImage}
        style={{
          display: 'block',
          maxWidth: inputs.length > 2 ? '500px' : '400px',
        }}
      />
    </CardContainer>
  );
};

export default AuthCard;
