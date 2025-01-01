import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/**
 * SearchBar Component
 * A Material-UI styled search bar for querying videos.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSearch - Function triggered when the user submits a search query.
 */
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        variant="standard"
        placeholder="Search YouTube..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button
        id="search-button"
        color="secondary"
        onClick={handleSearch}
      >
        <SearchIcon fontSize="medium"/>
      </Button>
    </Box>
  );
};

export default SearchBar;