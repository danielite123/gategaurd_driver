import PropTypes from 'prop-types'; // Import PropTypes for validation
import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';

const GEOAPIFY_API_KEY = import.meta.env.VITE_REACT_APP_GEOAPIFY_API_KEY;

function GeoapifyAutocomplete({ onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 2) {
      // Filter to limit results to Minna, Niger State
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          value
        )}&filter=place:3602777&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data.features);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setInputValue(place.properties.formatted);
    setSuggestions([]);
    if (onSelect) onSelect(place);
  };

  return (
    <div>
      <TextField
        value={inputValue}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        label="Search a place"
      />
      {suggestions.length > 0 && (
        <List>
          {suggestions.map((suggestion) => (
            <ListItem
              button
              key={suggestion.properties.place_id}
              onClick={() => handleSelect(suggestion)}
            >
              <ListItemText primary={suggestion.properties.formatted} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

GeoapifyAutocomplete.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default GeoapifyAutocomplete;
