
import React, { useCallback, useRef } from 'react';

import { Container, Content, Background } from './styles';

import { FiMail, FiLock, FiArrowLeft, FiUser } from 'react-icons/fi';

import { FormHandles } from '@unform/core'

import {  Form } from '@unform/web';

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';


import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
 const formRef = useRef<FormHandles>(null);
 console.log(formRef);

 const handleSubmit = useCallback(
   /*eslint no-undef: "error"*/
   async(data: Object) => {
    //console.log(data)
    try {

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      //console.log(data)



    } catch (error) {
      if (error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

          return;
      }
    }
  },[])

  return (

  <Container>

  <Background />
    <Content>
        <img src={logoImg} alt="Gobarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro </h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="Email" />
          <Input
          name="password"
          icon={FiLock} type="password"
          placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>

        </Form>

        <a href="#">
          <FiArrowLeft />
          Voltar para logon
          </a>
    </Content>

</Container>

  )
}



export default SignUp;
