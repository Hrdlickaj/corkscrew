import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Center,
  Box,
} from '@chakra-ui/react';

function EditProfilePage({ user, setUser }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
    user_id: user.id,
  });

  function handleFormChange(e) {
    setProfileData((profileData) => ({
      ...profileData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handlePatchProfile(e) {
    e.preventDefault();

    const res = await fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (res.ok) {
      res
        .json()
        .then((updatedUser) => {
          setUser(updatedUser);
        })
        .then(navigate('/profile'));
    }
  }

  return (
    <Center py={10}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={'groovy.lightgreen'}
        boxShadow={'base'}
        rounded={'xl'}
        p={6}
        textAlign={'center'}
      >
        <Heading fontSize={'2xl'} fontWeight={800} textAlign={'center'} py={4}>
          Edit Profile Information
        </Heading>
        <form onSubmit={handlePatchProfile}>
          <FormControl isRequired mt={3}>
            <FormLabel>username</FormLabel>
            <Input
              type='text'
              name='username'
              value={profileData.username}
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl isRequired mt={3}>
            <FormLabel>email address</FormLabel>
            <Input
              type='text'
              name='email'
              value={profileData.email}
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>bio</FormLabel>
            <Input
              type='text'
              name='bio'
              value={profileData.bio}
              onChange={handleFormChange}
            />
          </FormControl>
          <Stack mt={4} spacing={6} direction={['column', 'row']}>
            <Button
              as={Link}
              to='/profile'
              bg={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{ bg: 'groovy.pink' }}
              _focus={{
                bg: 'groovy.pink',
              }}
            >
              cancel
            </Button>
            <Button
              type='submit'
              bg={'white'}
              flex={1}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{ bg: 'groovy.pink' }}
              _focus={{
                bg: 'groovy.pink',
              }}
            >
              save
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

export default EditProfilePage;
