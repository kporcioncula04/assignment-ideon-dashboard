import {
    Box, Button, TextField, Drawer, Select,
    MenuItem, Checkbox, ListItemText, FormControl, InputLabel
} from '@mui/material';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { mockData } from '../data/mockData';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function FilterDrawer({ isDrawerOpen, toggleDrawer, onApplyFilter }) {
    const [selectedOrg, setSelectedOrg] = useState([]);
    const [selectedCarriers, setSelectedCarriers] = useState([]);
    const [distributionFormat, setDistributionFormat] = useState('');

    const [selectStartDate, setStartDate] = useState(null)
    const [dateStartType, setStartDateType] = useState('');

    const [selectEndDate, setEndDate] = useState(null)
    const [dateEndType, setEndDateType] = useState('');


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
            selectStartDate,
            dateStartType,
            selectEndDate,
            dateEndType
        };
        onApplyFilter(filters);
        toggleDrawer(false)();
    };

    const handleReset = () => {
        setSelectedCarriers([])
        setSelectedOrg([])
        setDistributionFormat('')
        setStartDate(null)
        setStartDateType('')
        setEndDate(null)
        setEndDateType('')
    }

    const handleStartDateTypeChange = (event) => {
        setStartDateType(event.target.value);
    };

    const handleEndDateTypeChange = (event) => {
        setEndDateType(event.target.value);
    };

    const dateStartOptions = [
        { value: 'before', label: 'Before' },
        { value: 'after', label: 'After' },
    ];

    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 350, padding: '20px' }}>
                <h2>Filters</h2>

                <FormControl sx={{ m: 1, width: 250 }}>
                    <FormLabel>Organization Name</FormLabel>
                    <Select
                        multiple
                        value={selectedOrg}
                        onChange={handleOrganizationSelectChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => selected.join(', ')}
                        sx={{ width: '300px' }}
                    >
                        {mockData.map((org) => (
                            <MenuItem key={org.uuid} value={org.organization_name} sx={{ maxHeight: 400, overflow: 'auto' }}>
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
                        sx={{ width: '300px' }}
                    >
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <FormLabel>Coverage Start Date</FormLabel>

                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Box>
                            <Select native value={dateStartType} onChange={handleStartDateTypeChange} sx={{ minWidth: '150px' }}>
                                <option aria-label="None" value="" />
                                {dateStartOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                        </Box>

                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker value={selectStartDate}
                                    onChange={setStartDate} />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </FormControl>

                {/* todo: implement end date */}

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <FormLabel>Coverage End Date</FormLabel>

                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Box>
                            <Select native value={dateEndType} onChange={handleEndDateTypeChange} sx={{ minWidth: '150px' }}>
                                <option aria-label="None" value="" />
                                {dateStartOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                        </Box>

                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker value={selectEndDate}
                                    onChange={setEndDate} />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </FormControl>

                <FormControl sx={{ m: 1, width: 250 }}>
                    <FormLabel>Distribution Format</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={distributionFormat}
                        onChange={handleDistributionChange}
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
                        sx={{ width: '300px' }}
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
                        sx={{ width: '300px' }}
                        input={<OutlinedInput />}
                        renderValue={(selected) => selected.join(', ')} >

                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant="contained" onClick={handleReset} style={{ width: '45%' }}>Reset</Button>
                    <Button variant="contained" onClick={applyFilter} style={{ width: '45%' }}>Apply Filter</Button>
                </Box>
            </Box>
        </Drawer >
    )
}

export default FilterDrawer