import React from 'react';
import EditWineForm from './EditWineForm';

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

function WineCard({ wine, onDeleteWine, handleUpdateWine }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function deleteWine(id) {
    fetch(`/wines/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    }).then((r) => {
      if (r.ok) {
        onDeleteWine(id);
      }
    });
  }

  return (
    <>
      <Center py={6}>
        <Box
          maxW={'275px'}
          w={'full'}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
          bg={'groovy.teal'}
        >
          <Center>
            <Image h={'210px'} src={wine.image} mt={-6} mx={-6} mb={6} />
          </Center>
          <Stack>
            <Text
              color={'groovy.green'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              {wine.vintage}
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {wine.name}
            </Heading>
            <Heading fontSize={'sm'} color={'groovy.red'}>
              Rating: {wine.rating}
            </Heading>
          </Stack>
          <Tabs align='end' variant='enclosed' pt={8}>
            <TabList>
              <Tab>Wine Specs</Tab>
              <Tab>My Notes</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack direction={'column'} textAlign={'left}'} fontSize={'sm'}>
                  <Text>Grape Variety: {wine.grape}</Text>
                  <Text>Country of Origin: {wine.country}</Text>
                  <Text>Region: {wine.region}</Text>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack direction={'column'} textAlign={'left}'} fontSize={'sm'}>
                  <Text>Tasting Note: {wine.tasting}</Text>
                  <Text>Memory: {wine.memory}</Text>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Button color={'groovy.blue'} onClick={() => deleteWine(wine.id)}>
              {' '}
              Delete{' '}
            </Button>
            <Button color={'groovy.blue'} onClick={onOpen}>
              {' '}
              Edit{' '}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Wine Specs</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <EditWineForm
                    wine={wine}
                    handleUpdateWine={handleUpdateWine}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        </Box>
      </Center>
    </>
  );
}

export default WineCard;
