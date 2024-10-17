import {
    Box, Button, TextField, Drawer, Select,
    MenuItem, Checkbox, ListItemText, FormControl
} from '@mui/material';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { mockData } from '../data/mockData';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function FilterDrawer({ isDrawerOpen, toggleDrawer, onApplyFilter }) {
    const [selectedOrg, setSelectedOrg] = useState([]);
    const [selectedCarriers, setSelectedCarriers] = useState([]);
    const [distributionFormat, setDistributionFormat] = useState('');

    const handleOrganizationSelectChange = (event) => {
        const { value } = event.target;
        setSelectedOrg(typeof value === 'string' ? value.split(',') : value)
    };

    const handleCarrierSelectChange = (event) => {
        const { value } = event.target;
        setSelectedCarriers(typeof value === 'string' ? value.split(',') : value)
    };

    const handleDistributionChange = (event) => {
        const { value } = event.target;
        setDistributionFormat(typeof value === 'string' ? value.split(',') : value)
    };

    const applyFilter = () => {
        const filters = {
            selectedOrg,
            selectedCarriers,
            distributionFormat,
        };
        onApplyFilter(filters);
        console.log("Filtered Data:", filters);
        toggleDrawer(false)(); // Close the drawer after applying the filter
    };

    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 300, padding: '20px' }}>
                <h2>Filters</h2>

                <FormControl sx={{ m: 1, width: 250 }}>
                    <FormLabel>Organization Name</FormLabel>
                    <Select
                        multiple
                        value={selectedOrg}
                        onChange={handleOrganizationSelectChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {mockData.map((org) => (
                            <MenuItem key={org.uuid} value={org.organization_name}>
                                <Checkbox checked={selectedOrg.indexOf(org.organization_name) > -1} />
                                <ListItemText primary={org.organization_name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: 250 }}>
                    <FormLabel>Group</FormLabel>

                    <Select
                        multiple
                        // value={0}
                        // onChange={handleSelectChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Distribution Format</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="EDI" control={<Radio />} label="EDI" />
                        <FormControlLabel value="API" control={<Radio />} label="API" />
                    </RadioGroup>
                </FormControl>

                <FormControl sx={{ m: 1, width: 250 }}>
                    <FormLabel>Carrier</FormLabel>
                    <Select
                        multiple
                        value={selectedCarriers}
                        onChange={handleCarrierSelectChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => selected.join(', ')}>
                        {[...new Set(mockData.map((org) => org.carrier))].map((carrier) => (
                            <MenuItem key={carrier} value={carrier}>
                                <Checkbox checked={selectedCarriers.indexOf(carrier) > -1} />
                                <ListItemText primary={carrier} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: 250 }}>
                    <FormLabel>State</FormLabel>

                    <Select
                        multiple
                        // value={0}
                        // onChange={handleSelectChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => selected.join(', ')} >

                    </Select>
                </FormControl>


                <Button variant="contained" onClick={applyFilter} fullWidth>Apply Filter</Button>
            </Box>
        </Drawer>
    )
}

export default FilterDrawer