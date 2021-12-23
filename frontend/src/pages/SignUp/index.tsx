
import React, { useCallback, useRef } from 'react';

import { Link, useHistory } from 'react-router-dom';


import { Container, Content, Background, AnimationContainer  } from './styles';

import { FiMail, FiLock, FiArrowLeft, FiUser } from 'react-icons/fi';

import { FormHandles } from '@unform/core'

import {  Form } from '@unform/web';

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast'


import logoImg from '../../assets/logo.svg';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
 const formRef = useRef<FormHandles>(null);
 const { addToast } = useToast();
 const history = useHistory();
 console.log(formRef);

 const handleSubmit = useCallback(
   /*eslint no-undef: "error"*/
   async(data: SignUpFormData) => {
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


      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'sucess',
        title: 'Cadastro concluído',
        description: 'Seu cadastro foi efetuado com sucesso!',
      });



    } catch (error) {
      if (error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

          return;
      }
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao cadastrar, tente novamente.',
      });
    }
  },[addToast, history])

  return (

  <Container>

  <Background />
    <Content>
       <AnimationContainer>
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

        <Link to="/">
          <FiArrowLeft />
          Voltar para logon
          </Link>
        </AnimationContainer>
    </Content>

</Container>

  )
}



export default SignUp;
