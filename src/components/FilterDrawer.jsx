import {
    Box, Button, TextField, Drawer, Select,
    MenuItem, Checkbox, ListItemText, FormControl, InputLabel
} from '@mui/material';
import { useState } from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
import { mockData } from '../data/mockData';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FilterSaved from './FilterSaved';
import FiltersApply from './FiltersApply'

function FilterDrawer({ isDrawerOpen, toggleDrawer, onApplyFilter }) {
    const [selectedOrg, setSelectedOrg] = useState([]);
    const [selectedCarriers, setSelectedCarriers] = useState([]);
    const [distributionFormat, setDistributionFormat] = useState('');

    const [selectStartDate, setStartDate] = useState(null)
    const [dateStartType, setStartDateType] = useState('');

    const [selectEndDate, setEndDate] = useState(null)
    const [dateEndType, setEndDateType] = useState('');

    const [isSaveFilterOpen, setIsSaveFilterOpen] = useState(false);

    const [currentView, setCurrentView] = useState('filters')
    const [savedFilters, setSavedFilters] = useState([])


    const handleSaveFilter = (newFilter) => {
        setIsSaveFilterOpen((prev) => [...prev, newFilter]); // Open the save filter component or tab
    };

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


    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
            <Box >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button variant="outlined" onClick={() => setCurrentView('filters')}>Filters</Button>
                    <Button variant="outlined" onClick={() => setCurrentView('saved')} >Saved Filters</Button>
                </Box>


                {
                    currentView === 'filters' ? (
                        <FiltersApply handleSaveFilter={handleSaveFilter}
                            mockData={mockData}
                            handleOrganizationSelectChange={handleOrganizationSelectChange}
                            handleCarrierSelectChange={handleCarrierSelectChange}
                            handleDistributionChange={handleDistributionChange}
                            applyFilter={applyFilter}
                            handleReset={handleReset}
                            handleStartDateTypeChange={handleStartDateTypeChange}
                            handleEndDateTypeChange={handleEndDateTypeChange}
                            isSaveFilterOpen={isSaveFilterOpen}
                            selectedOrg={selectedOrg}
                            selectedCarriers={selectedCarriers}
                            distributionFormat={distributionFormat}
                            selectStartDate={selectStartDate}
                            dateStartType={dateStartType}
                            selectEndDate={selectEndDate}
                            dateEndType={dateEndType} />
                    ) : (<FilterSaved savedFilters={savedFilters} />)
                }

            </Box>
        </Drawer >
    )
}

export default FilterDrawer