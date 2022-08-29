import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
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

function LoginForm({ onLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json()
          .then((user) => onLogin(user))
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
                Log in to your account
              </Heading>
            </Stack>
            <FormControl id='username' isRequired>
              <FormLabel name='username'>Username</FormLabel>
              <Input
                type='text'
                id='loginform_username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id='password' isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                id='loginform_password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Log in
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

export default LoginForm;
