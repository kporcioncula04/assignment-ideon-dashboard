import { Box, TextField, FormGroup, FormControlLabel, Checkbox, Button, Typography, useTheme } from '@mui/material/';
import { tokens } from '../themes'
import { useState } from 'react';

function FilterSaved({ handleSaveFilterName, savedFilters, setSavedFilters }) {
  const [filterName, setFilterName] = useState('');
  const [defaultFilter, setDefaultFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const theme = useTheme();
  const colors = tokens.apply(theme.palette.mode);

  const handleSave = () => {
    const savedFilter = {
      name: filterName,
      default: defaultFilter
    }
    handleSaveFilterName(savedFilter)
    setFilterName('')
    setDefaultFilter(false)
  }

  const handleDeleteFilter = (currFilter) => {
    const updatedFilters = savedFilters.filter(filter => filter.name !== currFilter.name)
    setSavedFilters(updatedFilters);
    setSelectedFilter(null)
  }

  const handleSetAsDefault = (setFilter) => {
    const updatedFilters = savedFilters.map((filter) =>
      filter.name === setFilter.name ? { ...filter, default: true } : { ...filter, default: false }
    );
    setSavedFilters(updatedFilters);
    setSelectedFilter(setFilter);
  };

  return (
    <Box
      sx={{ width: 350, height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: colors.black[500] }}
    >
      <Box sx={{ p: 2, pb: 0 }}>
        <Typography variant='p'>Name</Typography>
        <TextField variant="outlined" value={filterName} onChange={(e) => setFilterName(e.target.value)} sx={{
          '.MuiInputBase-root': {
            height: '40px',
          },
          '.MuiInputBase-input': {
            padding: '5px',
          },
          width: '300px',
          border: '1px solid black',
          borderRadius: '5px'
        }} />

        <FormGroup>
          <FormControlLabel control={<Checkbox
            sx={{
              '& .MuiSvgIcon-root': {
                border: '2px solid lightgray',
                borderRadius: '4px',
              }
            }}
            checked={defaultFilter}
            onChange={(e) => setDefaultFilter(e.target.checked)} />} label={
              <div style={{ padding: '10px', paddingLeft: 0 }}>
                Set as default filter
                <span style={{ fontSize: '12px', color: 'gray', display: 'block', marginLeft: '0' }}>
                  This filter will be applied by default when you visit the page
                </span>
              </div>
            } />
        </FormGroup>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ height: '100%' }}>
          <Typography variant='h4' sx={{ p: 1, pl: 2, pt: 0, color: colors.black[500] }}>Saved Filters</Typography>
          <hr />

          <ul style={{ display: 'flex', flexDirection: 'column', padding: 0, listStyleType: 'none', height: '100%' }}>
            {savedFilters && savedFilters.map((filter, index) => (
              <li key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px',
                  paddingLeft: '10px',
                  backgroundColor: selectedFilter?.name === filter.name ? "#e0e0e0" : (filter.default ? '#ffe6ff' : 'transparent'),
                  marginBottom: '8px'
                }}
                onClick={() => setSelectedFilter(filter)}>
                <p>{filter.name}</p>
                {filter.default ? (<span
                  style={{
                    display: 'inline-block',
                    width: '70px',
                    height: '30px',
                    lineHeight: '30px',
                    borderRadius: '20px',
                    color: 'black',
                    textAlign: 'center',
                    border: '1px solid #660066'
                  }}>
                  Default </span>) : (
                  selectedFilter?.name == filter.name && (
                    <>
                      <Box>
                        <Button variant="outlined" onClick={() => handleSetAsDefault(filter)} sx={{ marginRight: '8px', border: '1px solid lightgray', backgroundColor: 'white' }}>
                          Make as default
                        </Button>
                        <Button variant="outlined" onClick={() => handleDeleteFilter(filter)} sx={{ color: 'red', border: '1px solid lightgray', backgroundColor: 'white' }}>
                          Delete
                        </Button>
                      </Box>

                    </>
                  )
                )
                }
              </li>
            ))}
          </ul>
        </Box>
      </Box>

      <Box sx={{ mt: 'auto', pt: 3 }} >
        <hr />
        <Box sx={{ p: 2 }}>
          <Button variant="contained" fullWidth onClick={handleSave} sx={{ backgroundColor: '#660066' }}>Save</Button>
        </Box>
      </Box>
    </Box >
  )
}

export default FilterSaved