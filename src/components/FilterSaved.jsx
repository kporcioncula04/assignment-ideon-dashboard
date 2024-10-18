import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Checkbox';
import { useState } from 'react';


function FilterSaved({ onSave }) {
  const [filterName, setFilterName] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false); // Checkbox for default filter
  const [savedFilters, setSavedFilters] = useState([])

  const handleSave = () => {
    const savedFilter = {
      name: filterName,
      default: setAsDefault
    }
    onSave(savedFilter)
  }
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch', display: 'flex' } }}
      noValidate
      autoComplete="off"
    >
      <p>Name</p>
      <TextField id="outlined-basic" variant="outlined" />

      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked checked={setAsDefault} onChange={(e) => setAsDefault(e.target.value)} />} label="Set as default filter" />
      </FormGroup>

      <Button variant="contained" onClick={handleSave}>Save</Button>

    </Box>
  )
}

export default FilterSaved