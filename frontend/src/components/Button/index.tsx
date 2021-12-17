import React, { ButtonHTMLAttributes } from 'react';



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> // essa interface faz com que podemos utilizar elementos HTML dentro do nosso Button

import { Container } from './styles';

const Button: React.FC<ButtonProps> = ({children, ...rest}) => (

  <Container type="button" {...rest}>
    {children}
  </Container>

)

export default Button;
