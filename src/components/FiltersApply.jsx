import {
    Box, FormControl, FormLabel,
    Select, MenuItem, Checkbox, ListItemText, OutlinedInput, RadioGroup,
    FormControlLabel, Radio, Button, TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../index.css'

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
    FilterSaved,
    saveFilter }) {

    const dateStartOptions = [
        { value: 'before', label: 'Before' },
        { value: 'after', label: 'After' },
    ];

    return (
        <Box sx={{ width: 350, p: 2 }}>
            <FormControl sx={{ m: 1, width: 250 }}>
                <FormLabel>Organization Name</FormLabel>
                <Select
                    multiple
                    value={selectedOrg}
                    onChange={handleOrganizationSelectChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(', ')}
                    sx={{
                        '.MuiSelect-select': {
                            padding: '10px',
                        },
                        width: '300px'
                    }}
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
                    sx={{
                        '.MuiSelect-select': {
                            padding: '10px',
                        },
                        width: '300px'
                    }}
                >
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <FormLabel>Coverage Start Date</FormLabel>
                <Box className='coverage-dates-main '>
                    <Box>
                        <Select native value={dateStartType} onChange={handleStartDateTypeChange}
                            sx={{
                                '.MuiNativeSelect-select': {
                                    padding: '10px',
                                },
                                '& .MuiInputBase-input': {
                                    padding: '10px',
                                },
                                width: '145px'
                            }}>
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
                                onChange={setStartDate}
                                slots={{
                                    textField: (params) => <TextField {...params}
                                        sx={{
                                            '.MuiInputBase-root': {
                                                height: '40px',
                                            },
                                            '.MuiInputBase-input': {
                                                padding: '5px',
                                            },
                                            width: '145px'
                                        }} />
                                }}
                            />

                        </LocalizationProvider>
                    </Box>
                </Box>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <FormLabel>Coverage End Date</FormLabel>
                <Box className='coverage-dates-main'>
                    <Box>
                        <Select native value={dateEndType} onChange={handleEndDateTypeChange}
                            sx={{
                                '.MuiNativeSelect-select': {
                                    padding: '10px',
                                },
                                '& .MuiInputBase-input': {
                                    padding: '10px',
                                },
                                width: '145px'
                            }}>
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
                                onChange={setEndDate}
                                slots={{
                                    textField: (params) => <TextField {...params}
                                        sx={{
                                            '.MuiInputBase-root': {
                                                height: '40px',
                                            },
                                            '.MuiInputBase-input': {
                                                padding: '5px',
                                            },
                                            width: '145px'
                                        }} />
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
            </FormControl>

            <FormControl sx={{ m: 1, width: 250 }}>
                <FormLabel>Distribution Format</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    value={distributionFormat}
                    onChange={handleDistributionChange}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
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
                    sx={{
                        '.MuiSelect-select': {
                            padding: '10px',
                        },
                        width: '300px'
                    }}
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
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(', ')}
                    sx={{
                        '.MuiSelect-select': {
                            padding: '10px',
                        },
                        width: '300px'
                    }} >

                </Select>
            </FormControl>
            <Box className='save-filter-button'>
                <Button variant="outlined" onClick={saveFilter} style={{ width: '35%' }}>Save filter</Button>
                {isSaveFilterOpen && <FilterSaved />}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', pt: 5 }}>
                <Button variant="outlined" onClick={handleReset} style={{ width: '45%' }}>Reset</Button>
                <Button variant="contained" onClick={applyFilter} style={{ width: '45%', backgroundColor: '#660066' }}>Apply Filter</Button>
            </Box>
        </Box>
    )
}

export default FiltersApply