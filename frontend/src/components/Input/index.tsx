//import React, { ButtonHTMLAttributes } from 'react';

import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { // essa interface faz com que podemos utilizar elementos HTML dentro do nosso input
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // permite pasar como parametro um componente.
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {

  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
     registerField({
       name: fieldName,
       ref: inputRef.current,
       path: 'value'
     })
  }, [fieldName, registerField])

  return ( // passamos o InputProps como parametro dentro do React.FC, assim podemos utilizar todos elementos HTML do nosso input
    <Container>
      { Icon && <Icon size={20} /> }

      <input
      defaultValue={defaultValue}
      ref={inputRef}
      {...rest}
      />

    </Container>
  )
} //  dentro do input passamos todos as propriedades utilizando o {...props} o famoso spread no React






export default Input;
