import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';

function SignupForm({ onSignup }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json()
          .then((user) => onSignup(user))
          .then(navigate('/my_wines'));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Flex flex={1}>
          <Stack spacing={3} mx={'auto'} maxW={'md'}>
            <Stack align={'4'}>
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Create an account
              </Heading>
            </Stack>
            <FormControl id='username' isRequired>
              <FormLabel name='username'>Username</FormLabel>
              <Input
                type='text'
                id='signupform_username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel name='email'>Email</FormLabel>
              <Input
                type='text'
                id='signupform_email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel name='password'>Password</FormLabel>
              <Input
                type='password'
                id='signupform_password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel name='password'>Password Confirmation</FormLabel>
              <Input
                type='password'
                id='password_confirmation'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'groovy.yellow'}
                _hover={{
                  bg: 'groovy.green',
                }}
                type='submit'
              >
                Sign up
              </Button>
              {errors.map((err) => (
                <Alert status='error' borderRadius={4}>
                  <AlertIcon />
                  <AlertDescription>
                    <p>{err}</p>
                  </AlertDescription>
                </Alert>
              ))}
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </form>
  );
}

export default SignupForm;
