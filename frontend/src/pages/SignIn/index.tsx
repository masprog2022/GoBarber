//import React, { ButtonHTMLAttributes } from 'react';

import React, { useCallback, useRef } from 'react';

import { Container, Content, Background } from './styles';

import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import { FormHandles } from '@unform/core'

import {  Form } from '@unform/web';

import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';

import getValidationErrors from '../../utils/getValidationErrors';


import Input from '../../components/Input';
import Button from '../../components/Button';


import logoImg from '../../assets/logo.svg';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () =>{

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  //console.log(user);

  const handleSubmit = useCallback(
    /*eslint no-undef: "error"*/
    async(data: SignInFormData) => {
     //console.log(data)
     try {

       formRef.current?.setErrors({});
       const schema = Yup.object().shape({
         email: Yup.string()
           .required('Email obrigatório')
           .email('Digite um e-mail válido'),
         password: Yup.string().required('Senha obrigatório'),
       });

       await schema.validate(data, {
         abortEarly: false
       });

       signIn({
         email: data.email,
         password: data.password
       });

       //console.log(data)



     } catch (error) {
       if (error instanceof Yup.ValidationError){
         const errors = getValidationErrors(error);

         formRef.current?.setErrors(errors);

           return;
       }
     }
   },[signIn])


  return (
    <Container>
        <Content>
            <img src={logoImg} alt="Gobarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu logon </h1>
              <Input name="email" icon={FiMail} placeholder="Email" />
              <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

              <Button type="submit">Entrar</Button>
              <a href="#">Esqueci minha senha</a>
            </Form>

            <a href="#">
              <FiLogIn />
              Criar conta
              </a>
        </Content>

        <Background />

    </Container>)
}


export default SignIn;
