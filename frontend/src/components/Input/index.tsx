//import React, { ButtonHTMLAttributes } from 'react';

import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { // essa interface faz com que podemos utilizar elementos HTML dentro do nosso input
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // permite pasar como parametro um componente.
}

const Input: React.FC<InputProps> = ({icon: Icon, ...rest}) => ( // passamos o InputProps como parametro dentro do React.FC, assim podemos utilizar todos elementos HTML do nosso input
  <Container>
    { Icon && <Icon size={20} /> }

    <input {...rest} />
  </Container>
) //  dentro do input passamos todos as propriedades utilizando o {...props} o famoso spread no React






export default Input;
