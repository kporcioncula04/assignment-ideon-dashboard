import { Box, Button, Drawer } from '@mui/material';
import { useState } from 'react';
import { mockData } from '../data/mockData';


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
    const [currentFilter, setCurrentFilter] = useState(null)

    const handleSaveFilter = (filters) => {
        setCurrentFilter(filters)
        setCurrentView('saved')
    };

    const handleSaveFilterName = (newFilter) => {
        const filterExists = savedFilters.some((filter) => filter.name === newFilter.name);
        if (filterExists) {
            alert("A filter with this name already exists. Please choose a different name.");
            return; // Exit if the name already exists
        }

        let updatedFilters = savedFilters;
        if (newFilter.default) {
            updatedFilters = savedFilters.map((filter) => ({
                ...filter,
                default: false
            }))
        }

        setSavedFilters([...updatedFilters, newFilter])
        // setCurrentView('filters')
    }

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

    const saveFilter = () => {
        const filters = {
            selectedOrg,
            selectedCarriers,
            distributionFormat,
            selectStartDate,
            dateStartType,
            selectEndDate,
            dateEndType
        }
        handleSaveFilter(filters)
    }

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
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            dateStartType={dateStartType}
                            selectEndDate={selectEndDate}
                            dateEndType={dateEndType}
                            saveFilter={saveFilter} />
                    ) : (<FilterSaved onApplyFilter={onApplyFilter}
                        handleSaveFilterName={handleSaveFilterName}
                        savedFilters={savedFilters} />)
                }

            </Box>
        </Drawer >
    )
}

export default FilterDrawer