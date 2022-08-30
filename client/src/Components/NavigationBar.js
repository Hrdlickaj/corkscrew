import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Flex, HStack, Button } from '@chakra-ui/react';

function NavigationBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch('/logout', { method: 'DELETE' })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })
      .then(navigate('/'));
  }

  return (
    <Box bg={'groovy.mustard'} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box>Corkscrew</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'flex', md: 'flex' }}>
            <Link to='/wine_list'>My Wines</Link>
          </HStack>
          <HStack as={'nav'} spacing={4} display={{ base: 'flex', md: 'flex' }}>
            <Link to='/new_wine'>Add a Wine</Link>
          </HStack>
          <HStack as={'nav'} spacing={4} display={{ base: 'flex', md: 'flex' }}>
            <Link to='/map'>Map</Link>
          </HStack>
          <HStack as={'nav'} spacing={4} display={{ base: 'flex', md: 'flex' }}>
            <Link to='/profile'>My Profile</Link>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Button
            as={Button}
            rounded={'full'}
            cursor={'pointer'}
            minW={0}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavigationBar;
