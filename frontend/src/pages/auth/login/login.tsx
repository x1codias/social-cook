import React, { useState } from 'react';
import styles from './styles';
import foodImage from '../../../assets/beautiful-colorful-vector-illustration-seamless-food-wallpaper-background_950558-4988.avif';
import { Divider } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { ConnectedProps, connect } from 'react-redux';
import { login } from '../../../actions/auth.actions';

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
  const {
    CardContainer,
    CardTitle,
    InputField,
    ButtonContained,
    ButtonText,
    ButtonIcon,
  } = styles;

  const handleLogin = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    login(formData);
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
        <CardTitle>{'Sign In'}</CardTitle>
        <form
          onSubmit={e => handleLogin(e)}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <InputField
            placeholder={'Username or Email'}
            value={formData.identifier}
            onChange={e =>
              setFormData({ ...formData, identifier: e.target.value })
            }
          />
          <InputField
            placeholder={'Password'}
            type={'password'}
            value={formData.password}
            onChange={e =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <ButtonContained onClick={e => handleLogin(e)}>
            {'Sign In'}
          </ButtonContained>
        </form>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12px',
            marginBottom: '20px',
          }}
        >
          <p>{"Don't have an account yet?"}</p>
          <ButtonText>{'Sign Up'}</ButtonText>
        </div>
        <Divider
          style={{ width: '100%', fontSize: '16px', marginBottom: '20px' }}
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
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>
            {'Sign In with:'}
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
      <img src={foodImage} style={{ display: 'block', maxWidth: '400px' }} />
    </CardContainer>
  );
};

const mapStateToProps = state => ({});

const connector = connect(mapStateToProps, { login });

export default connector(Login);
