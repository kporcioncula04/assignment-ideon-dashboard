import { Box, TextField, FormGroup, FormControlLabel, Checkbox, Button, Typography } from '@mui/material/';
import { useState } from 'react';

function FilterSaved({ handleSaveFilterName, savedFilters }) {
  const [filterName, setFilterName] = useState('');
  const [defaultFilter, setDefaultFilter] = useState(false); // Checkbox for default filter

  const handleSave = () => {
    const savedFilter = {
      name: filterName,
      default: defaultFilter
    }
    handleSaveFilterName(savedFilter)
  }
  return (
    <>
      <Box
        sx={{ width: 350, p: 2 }}
      >
        <Typography variant='p'>Name</Typography>
        <TextField variant="outlined" value={filterName} onChange={(e) => setFilterName(e.target.value)} sx={{
          '.MuiInputBase-root': {
            height: '40px',
          },
          '.MuiInputBase-input': {
            padding: '5px',
          },
          width: '300px'
        }} />

        <FormGroup>
          <FormControlLabel control={<Checkbox
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
        <Button variant="contained" fullWidth onClick={handleSave} sx={{ backgroundColor: '#660066', padding: '5px' }}>Save</Button>
      </Box>

      <Box sx={{ width: 350 }}>
        <hr style={{ margin: '0px' }} />

        <Typography variant='h3'>Saved Filters</Typography>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          {savedFilters.map((filter, index) => (
            <li key={index}>
              <strong>{filter.name}</strong>{filter.default && "(default)"}
            </li>
          ))}
        </ul>
      </Box>
    </>
  )
}

export default FilterSaved