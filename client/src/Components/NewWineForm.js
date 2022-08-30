import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import MemoryTextBox from './MemoryTextBox';
import TastingNoteTextBox from './TastingNoteTextBox';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Container,
  Image,
} from '@chakra-ui/react';

function NewWineForm({
  onAddWine,
  tastingNote,
  handleTastingNoteState,
  memoryNote,
  handleMemoryNoteState,
  user,
}) {
  const [formData, setFormData] = useState({
    name: '',
    vintage: '',
    country: '',
    region: '',
    grape: '',
    rating: '',
  });
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  function handleUpload() {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'corkscrew');

    Axios.post('https://api.cloudinary.com/v1_1/jenna1568/image/upload', data)
      .then((response) => {
        //console.dir(response.data.url);
        setUrl(response.data.url);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    //post to create a new wine object
    fetch('/wines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        vintage: formData.vintage,
        country: formData.country,
        region: formData.region,
        grape: formData.grape,
        rating: formData.rating,
        image: url,
        tasting: tastingNote,
        memory: memoryNote,
        user_id: user.id,
      }),
    })
      .then((r) => r.json())
      .then((newWine) => {
        setFormData({
          name: '',
          vintage: '',
          country: '',
          region: '',
          grape: '',
          rating: '',
          image: '',
        });
        handleTastingNoteState('');
        handleMemoryNoteState('');
        onAddWine(newWine);
      })
      .then(navigate('/my_wines'));
  }

  return (
    <Stack direction={{ base: 'column', md: 'row' }} py={'6'}>
      <Flex flex={1} align={'center'} justify={'center'}>
        <Box bg={'groovy.purple'} boxShadow={'lg'} rounded={'xl'} p={4}>
          <Stack spacing={3} mx={'auto'} minW={'xl'} maxW={'xl'}>
            <Stack>
              <Container fontFamily={'Chilanka'} fontWeight={'bold'}>
                Welcome to your wine journal! Let's document that wine you just
                had. Once you're finished, click 'add wine' to add this tasting
                to your shelf.
              </Container>
            </Stack>
            <form onSubmit={handleSubmit} className='NewWineForm'>
              {url !== '' ? (
                <Box align='center'>
                  <Image boxSize='200px' src={url} />
                </Box>
              ) : null}
              <FormControl>
                <FormLabel>Image Upload</FormLabel>
                <Input
                  name='image'
                  type='file'
                  id='NewWineForm-image_upload'
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </FormControl>
              <Button onClick={handleUpload}>Upload Photo</Button>
              <FormControl id='NewWineForm-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name='name'
                  type='text'
                  id='NewWineForm-name_input'
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id='NewWineForm-vintage' isRequired mt={4}>
                <FormLabel>Vintage</FormLabel>
                <Input
                  name='vintage'
                  type='integer'
                  id='NewWineForm-vintage_input'
                  value={formData.vintage}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id='NewWineForm-country' isRequired mt={4}>
                <FormLabel>Country of Origin</FormLabel>
                <Input
                  name='country'
                  type='text'
                  id='NewWineForm-country_input'
                  value={formData.country}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id='NewWineForm-region' isRequired mt={4}>
                <FormLabel>Region</FormLabel>
                <Input
                  name='region'
                  type='text'
                  id='NewWineForm-region_input'
                  value={formData.region}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id='NewWineForm-grape' isRequired mt={4}>
                <FormLabel>Grape Variety</FormLabel>
                <Input
                  name='grape'
                  type='text'
                  id='NewWineForm-grape_input'
                  value={formData.grape}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id='NewWineForm-rating' isRequired mt={4}>
                <FormLabel>Rating</FormLabel>
                <Input
                  name='rating'
                  type='integer'
                  id='NewWineForm-rating_input'
                  value={formData.rating}
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing={6} pt={8} pb={8}>
                <FormControl id='NewWineForm-TastingNoteBox'>
                  <FormLabel>Tasting Note</FormLabel>
                  <TastingNoteTextBox
                    handleTastingNoteState={handleTastingNoteState}
                  />
                </FormControl>
                <FormControl id='NewWineForm-MemoryTextBox'>
                  <FormLabel>Storytime</FormLabel>
                  <MemoryTextBox
                    handleMemoryNoteState={handleMemoryNoteState}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={10}>
                <Button
                  bg={'lightgreen'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                >
                  add wine
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
}

export default NewWineForm;
