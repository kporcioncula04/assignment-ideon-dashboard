import { Box, FormControl, FormLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function FiltersApply({ selectedOrg,
    handleOrganizationSelectChange,
    mockData,
    dateStartType,
    handleStartDateTypeChange,
    selectStartDate,
    setStartDate,
    dateEndType,
    handleEndDateTypeChange,
    selectEndDate,
    setEndDate,
    distributionFormat,
    handleDistributionChange,
    selectedCarriers,
    handleCarrierSelectChange,
    handleSaveFilter,
    handleReset,
    applyFilter,
    isSaveFilterOpen,
    FilterSaved }) {

    const dateStartOptions = [
        { value: 'before', label: 'Before' },
        { value: 'after', label: 'After' },
    ];

    return (
        <Box sx={{ width: 350, padding: '20px' }}>
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
                            <Checkbox checked={(selectedOrg).indexOf(org.organization_name) > -1} />
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

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <FormLabel>Coverage End Date</FormLabel>
                {console.log('end', selectEndDate)}

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
                            <Checkbox checked={(selectedCarriers).indexOf(carrier) > -1} />
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
            <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
                <Button variant="contained" onClick={handleSaveFilter} style={{ width: '45%' }}>Save filter</Button>
                {isSaveFilterOpen && <FilterSaved />}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="outlined" onClick={handleReset} style={{ width: '49%' }}>Reset</Button>
                <Button variant="contained" onClick={applyFilter} color="secondary" style={{ width: '49%' }}>Apply Filter</Button>
            </Box>
        </Box>
    )
}

export default FiltersApply