//import React, { ButtonHTMLAttributes } from 'react';

import React from 'react';

import { Container, Content, Background } from './styles';

import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

//import Input from '../../components/Input';
//import Button from '../../components/Button';


import logoImg from '../../assets/logo.svg';



const SignIn: React.FC = () =>

(
  <Container>
      <Content>
          <img src={logoImg} alt="Gobarber" />
          <form>
            <h1>Faça seu logon </h1>
            <input name="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Senha" />

            <button type="submit">Entrar</button>
            <a href="#">Esqueci minha senha</a>
          </form>

          <a href="#">
            <FiLogIn />
            Criar conta
            </a>
      </Content>

      <Background />

  </Container>
)

export default SignIn;
