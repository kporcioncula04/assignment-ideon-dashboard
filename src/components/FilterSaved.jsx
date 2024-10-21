import { Box, TextField, FormGroup, FormControlLabel, Checkbox, Button, Typography } from '@mui/material/';
import { useState } from 'react';

function FilterSaved({ handleSaveFilterName, savedFilters }) {
  const [filterName, setFilterName] = useState('');
  const [defaultFilter, setDefaultFilter] = useState(false);

  const handleSave = () => {
    const savedFilter = {
      name: filterName,
      default: defaultFilter
    }
    handleSaveFilterName(savedFilter)
  }
  return (

    <Box
      sx={{ width: 350, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
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
      </Box>


      <Box sx={{ mt: 2 }}>
        <Box sx={{ height: '100%' }}>
          <Typography variant='h4' sx={{ p: 1, pl: 2, pt: 0 }}>Saved Filters</Typography>
          <hr style={{}} />

          <ul style={{ display: 'flex', flexDirection: 'column', padding: 0, listStyleType: 'none', height: '100%' }}>
            {savedFilters.map((filter, index) => (
              <li key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: filter.default ? 'pink' : 'transparent',
                // border: filter.default ? '1px solid #660066' : '1px solid transparent',
                // borderRadius: '4px',
                marginBottom: '8px'
              }}>
                <strong>{filter.name}</strong>{filter.default && <span
                  style={{
                    // padding: '5px',
                    display: 'inline-block',
                    width: '60px',
                    height: '30px',
                    lineHeight: '30px',
                    borderRadius: '20px',
                    backgroundColor: 'transparent',
                    color: 'black',
                    textAlign: 'center',
                    border: '1px solid purple'
                    // fontSize: '12px',
                  }}
                >
                  Default
                </span>}
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
    </Box>
  )
}

export default FilterSaved