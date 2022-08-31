import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react';

function EditWineForm({ wine, handleUpdateWine }) {
  const [wineData, setWineData] = useState({
    name: wine.name,
    vintage: wine.vintage,
    country: wine.country,
    region: wine.region,
    grapeVariety: wine.grape,
    rating: wine.rating,
  });

  function handleWineChange(e) {
    setWineData((wineData) => ({
      ...wineData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handlePatchWine(e) {
    e.preventDefault();

    const res = await fetch(`/wines/${wine.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wineData),
    });

    if (res.ok) {
      res.json().then((updatedWine) => {
        handleUpdateWine(updatedWine);
      });
    }
  }

  return (
    <Stack direction={{ base: 'column', md: 'row' }} py={'6'}>
      <Flex flex={1} align={'center'} justify={'center'}>
        <Box bg={'groovy.teal'} boxShadow={'lg'} rounded={'xl'} p={4}>
          <Stack spacing={3} mx={'auto'} minW={'xl'} maxW={'xl'}>
            <Stack></Stack>
            <form onSubmit={handlePatchWine} className='EditWineForm'>
              <FormControl id='EditWineForm-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name='name'
                  type='text'
                  id='EditWineForm-name_input'
                  value={wineData.name}
                  onChange={handleWineChange}
                />
              </FormControl>
              <FormControl id='NewWineForm-vintage' isRequired mt={4}>
                <FormLabel>Vintage</FormLabel>
                <Input
                  name='vintage'
                  type='integer'
                  id='NewWineForm-vintage_input'
                  value={wineData.vintage}
                  onChange={handleWineChange}
                />
              </FormControl>
              <FormControl
                id='EditWineForm-country_of_origin'
                isRequired
                mt={4}
              >
                <FormLabel>Country of Origin</FormLabel>
                <Input
                  name='country'
                  type='text'
                  id='EditWineForm-country_input'
                  value={wineData.country}
                  onChange={handleWineChange}
                />
              </FormControl>
              <FormControl id='EditWineForm-region' isRequired mt={4}>
                <FormLabel>Region</FormLabel>
                <Input
                  name='region'
                  type='text'
                  id='EditWineForm-region_input'
                  value={wineData.region}
                  onChange={handleWineChange}
                />
              </FormControl>
              <FormControl id='EditWineForm-grape_variety' isRequired mt={4}>
                <FormLabel>Grape Variety</FormLabel>
                <Input
                  name='grapeVariety'
                  type='text'
                  id='EditWineForm-grape_input'
                  value={wineData.grapeVariety}
                  onChange={handleWineChange}
                />
              </FormControl>
              <FormControl id='EditWineForm-rating' isRequired mt={4}>
                <FormLabel>Rating</FormLabel>
                <Input
                  name='rating'
                  type='integer'
                  id='EditWineForm-rating_input'
                  value={wineData.rating}
                  onChange={handleWineChange}
                />
              </FormControl>
              <Stack mt={6} direction={'row'} spacing={8} align={'center'}>
                <Button color={'groovy.blue'} type='submit'>
                  save
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
}

export default EditWineForm;
