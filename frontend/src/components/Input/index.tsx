//import React, { ButtonHTMLAttributes } from 'react';

import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { // essa interface faz com que podemos utilizar elementos HTML dentro do nosso input
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // permite pasar como parametro um componente.
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {

    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)

  }, [])

  useEffect(() => {
     registerField({
       name: fieldName,
       ref: inputRef.current,
       path: 'value'
     })
  }, [fieldName, registerField])



  return ( // passamos o InputProps como parametro dentro do React.FC, assim podemos utilizar todos elementos HTML do nosso input
    <Container isFilled={isFilled} isFocused={isFocused}>
      { Icon && <Icon size={20} /> }

      <input
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      defaultValue={defaultValue}
      ref={inputRef}
      {...rest}
      />

    </Container>
  )
} //  dentro do input passamos todos as propriedades utilizando o {...props} o famoso spread no React






export default Input;
