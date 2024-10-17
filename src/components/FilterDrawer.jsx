import { Box, Button, TextField, Drawer } from '@mui/material';
import { useState } from 'react';

function FilterDrawer({ isDrawerOpen, toggleDrawer, onApplyFilter }) {
    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const applyFilter = () => {
        onApplyFilter(filterValue);
        toggleDrawer(false)(); // Close the drawer after applying the filter
    };

    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 300, padding: '20px' }}>
                <h2>Filter Data</h2>
                <TextField
                    fullWidth
                    label="Filter by Organization or Carrier"
                    variant="outlined"
                    value={filterValue}
                    onChange={handleFilterChange}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" onClick={applyFilter} fullWidth>Apply Filter</Button>
            </Box>
        </Drawer>
    )
}

export default FilterDrawer