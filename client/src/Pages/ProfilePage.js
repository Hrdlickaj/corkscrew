import React from 'react';
import { Heading, Box, Center, Text, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function ProfilePage({ user }) {
  const { username, email, bio, id } = user;

  return (
    <Center py={10}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={'groovy.lightgreen'}
        boxShadow={'base'}
        rounded={'xl'}
        p={6}
        textAlign={'left'}
      >
        <Heading fontSize={'2xl'} fontWeight={800} textAlign={'center'} py={4}>
          About Me
        </Heading>
        <Text fontWeight={600} mb={4}>
          username: {username}
        </Text>
        <Text fontWeight={600} mb={4}>
          email: {email}
        </Text>
        <Text fontWeight={600} mb={4}>
          about me: {bio}
        </Text>

        <Button
          as={NavLink}
          to='/edit_profile'
          flex={1}
          bg={'white'}
          boxShadow={
            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
          }
          _hover={{ bg: 'groovy.pink' }}
          _focus={{
            bg: 'groovy.pink',
          }}
        >
          edit
        </Button>
      </Box>
    </Center>
  );
}

export default ProfilePage;
