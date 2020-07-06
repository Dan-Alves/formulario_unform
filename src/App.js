import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/input';

export default function App() {
  const [user, setUser] = useState({});
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({  
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigatória')
        })
      });
    
      await schema.validate(data, {
        abortEarly: false,
      })

    console.log(data);

    formRef.current.setErrors({});

    reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     formRef.current.setData({
  //       name: 'Daniel Alves',
  //       email: 'danielalves.ccomp@gmail.com',
  //       address: {
  //         city: 'Rio de Janeiro'
  //       }
  //     })
  //   }, 2000);
  // }, []);

  return (
    <div className="App">
      <img
        src="https://storage.googleapis.com/golden-wind/unform/unform.svg"
        height="150"
        width="175"
        alt="Unform"
      />
      
      <Form ref={formRef} onSubmit={handleSubmit}>
        <label for="nome">Nome</label>
        <Input name="name" />
        <label for="email">E-mail</label>
        <Input type="email" name="email" />

        <Scope path="address">
          <label for="street">Rua</label>
          <Input name="street" />
          <label for="number">Número</label>
          <Input name="number" label="Número"/>
        </Scope>

        <button type="submit"> Enviar </button>
      </Form>
    </div>
  );
}
