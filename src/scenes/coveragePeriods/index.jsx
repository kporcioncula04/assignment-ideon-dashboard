import CustomTable from '../../components/CustomTable'
import FilterDrawer from '../../components/FilterDrawer'
import { mockData } from '../../data/mockData';
import { columnsHeader } from '../../data/columsHeader'
import { Box, Button, useTheme, Typography, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react'
import { tokens } from '../../themes'
import './index.css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

const columns = columnsHeader
const rows = mockData

export default function StickyHeadTable() {
    const theme = useTheme();
    const colors = tokens.apply(theme.palette.mode);
    const fonts = tokens.apply(theme.typography)

    //pagination
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //drawer and filter state
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [filteredRows, setFilteredRows] = useState(rows);
    const [selectedFilters, setSelectedFilters] = useState({
        selectedOrg: [],
        selectedCarriers: [],
        distributionFormat: '',
        selectStartDate: '',
        selectEndDate: '',
        dateStartType: '',
        dateEndType: ''
    })

    // pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    //filter
    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleApplyFilter = (filters) => {
        const { selectedOrg = [], selectedCarriers = [], distributionFormat = '', selectStartDate = '', selectEndDate = '' } = filters;
        let formattedStartDate = null;
        let formattedEndDate = null;

        const filteredData = rows.filter((row) => {
            const orgMatch = selectedOrg.length === 0 || selectedOrg.includes(row.organization_name);
            const carrierMatch = selectedCarriers.length === 0 || selectedCarriers.includes(row.carrier);
            // const formatMatch = !distributionFormat || row.distribution_format === distributionFormat;

            let dateStartMatch = true;
            let dateEndMatch = true;

            if (selectStartDate) {
                const startDate = new Date(selectStartDate);
                formattedStartDate = `${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate.getDate().toString().padStart(2, '0')}.${startDate.getFullYear().toString()}`;
                const rowStartDate = new Date(row.delivery_config);
                dateStartMatch = rowStartDate >= startDate;
            }

            if (selectEndDate) {
                const endDate = new Date(selectEndDate);
                formattedEndDate = `${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getDate().toString().padStart(2, '0')}.${endDate.getFullYear().toString()}`;
                const rowEndDate = new Date(row.delivery_config);
                dateEndMatch = rowEndDate >= endDate;
            }

            return orgMatch && carrierMatch && dateStartMatch && dateEndMatch;

        });

        if (formattedStartDate) {
            filters.selectStartDate = formattedStartDate;
        }

        if (formattedEndDate) {
            filters.selectEndDate = formattedEndDate;
        }

        setFilteredRows(filteredData);
        setSelectedFilters(filters);

    };

    return (
        <Box className='main-containter' sx={{
            backgroundColor: theme.palette.mode === 'light' ? colors.white[900] : colors.blue[500]
        }}>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h2" className="main-header">Coverage Periods</Typography>

                    <Box style={{ display: 'flex', alignItems: 'row', justifyContent: 'space-around', gap: '5px' }}>
                        <Button variant="outlined" style={{ padding: 0, height: '37px', minWidth: '40px', backgroundColor: theme.palette.mode === 'light' ? colors.gray[900] : colors.gray[400] }} ><SettingsIcon style={{ height: '100%' }} /></Button>
                        <Button variant="outlined" className='function-buttons' style={{ backgroundColor: theme.palette.mode === 'light' ? colors.gray[900] : colors.gray[400] }}>Export CSV</Button>
                        <TextField size="small" placeholder="Search Org or Carrier" variant="outlined" sx={{ backgroundColor: theme.palette.mode === 'light' ? colors.gray[900] : colors.gray[400] }} slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                            },
                        }}></TextField>
                    </Box>

                </Box>
                <Box className='filter-box'>
                    <Button variant="outlined" sx={{ backgroundColor: theme.palette.mode === 'light' ? colors.gray[900] : colors.gray[400], }} onClick={toggleDrawer(true)}> <FilterAltOutlinedIcon />Filters</Button>
                </Box>

                {(selectedFilters.selectedOrg?.length > 0 || selectedFilters.selectedCarriers?.length > 0 ||
                    selectedFilters.distributionFormat || selectedFilters.selectStartDate || selectedFilters.selectEndDate) &&
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 3 }}>
                        <div>Company: {selectedFilters.selectedOrg?.length > 0
                            ? selectedFilters.selectedOrg.join(', ')
                            : 'None'} </div>
                        <div>Carriers: {selectedFilters.selectedCarriers?.length > 0
                            ? selectedFilters.selectedCarriers.join(', ')
                            : 'None'} </div>
                        <div>Distribution Format: {selectedFilters.distributionFormat?.length > 0
                            ? selectedFilters.distributionFormat.join(', ')
                            : 'None'} </div>
                        <div>Coverage Start Date: {selectedFilters.dateStartType} {selectedFilters.selectStartDate?.length > 0
                            ? selectedFilters.selectStartDate
                            : 'None'} </div>
                        <div>Coverage End Date: {selectedFilters.dateEndType} {selectedFilters.selectEndDate?.length > 0
                            ? selectedFilters.selectEndDate
                            : 'None'} </div>
                    </Box>}

            </Box>

            <CustomTable
                columns={columns}
                rows={filteredRows}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <FilterDrawer
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                onApplyFilter={handleApplyFilter}
            />

        </Box>

    );
}
