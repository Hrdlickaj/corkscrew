import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';

function LoginPage({ onLogin }) {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          pt={{ base: 5, md: 10 }}
          pb={{ base: 15, md: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Corkscrew <br />
            <Text
              fontFamily={'Chilanka'}
              as={'span'}
              color={'groovy.green'}
              fontSize={{ base: '1xl', sm: '3xl', md: '5xl' }}
            >
              pop open a bottle and let's start tasting!
            </Text>
          </Heading>
        </Stack>
      </Container>

      <Container>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
        >
          <LoginForm onLogin={onLogin} />
          <Text>
            Don't have an account?{' '}
            <Button
              as={NavLink}
              to='/signup'
              bg={'groovy.yellow'}
              _hover={{
                bg: 'groovy.green',
              }}
            >
              Sign Up
            </Button>
          </Text>
        </Stack>
      </Container>
    </>
  );
}

export default LoginPage;
