import React from 'react';
import { Input } from '@chakra-ui/react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <>
      <Input
        id='search'
        type='text'
        value={searchTerm}
        placeholder='Search for a wine'
        size='md'
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </>
  );
}

export default SearchBar;
