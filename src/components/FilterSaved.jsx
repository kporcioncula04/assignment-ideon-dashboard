import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
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
    <Box
      sx={{ '& > :not(style)': { m: 1, width: '25ch', display: 'flex' } }}
      noValidate
      autoComplete="off"
    >
      <p>Name</p>
      <TextField variant="outlined" value={filterName} onChange={(e) => setFilterName(e.target.value)} />

      <FormGroup>
        <FormControlLabel control={<Checkbox
          checked={defaultFilter}
          onChange={(e) => setDefaultFilter(e.target.checked)} />} label="Set as default filter" />
      </FormGroup>

      <Button variant="contained" onClick={handleSave}>Save</Button>
      <h2>Saved Filters</h2>
      <ul style={{ display: 'flex', flexDirection: 'column' }}>
        {savedFilters.map((filter, index) => (
          <li key={index}>
            <strong>{filter.name}</strong>{filter.default && "(default)"}
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default FilterSaved