import React from 'react';
import WineCard from '../Components/WineCard';
import SearchBar from '../Components/SearchBar';
import { SimpleGrid, Box } from '@chakra-ui/react';

function WineListPage({
  wines,
  handleDeleteWine,
  searchTerm,
  onSearchChange,
  handleUpdateWine,
}) {
  const wineCards = wines.map((wine) => (
    <Box>
      <WineCard
        id={wine.id}
        wine={wine}
        onDeleteWine={handleDeleteWine}
        handleUpdateWine={handleUpdateWine}
      />
    </Box>
  ));

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <SimpleGrid columns={[2, 1, 3]} spacing='40px'>
        {wineCards}
      </SimpleGrid>
    </>
  );
}

export default WineListPage;
