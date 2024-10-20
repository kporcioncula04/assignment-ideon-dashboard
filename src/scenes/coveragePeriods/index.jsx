import * as React from 'react';

import CustomTable from '../../components/CustomTable';
import FilterDrawer from '../../components/FilterDrawer';
import { mockData } from '../../data/mockData';
import { columnsHeader } from '../../data/columsHeader'
import './index.css'
import { ColorContext, tokens } from '../../themes'

import { useTheme } from '@mui/material';
import { Box, Button, TextField, Drawer } from '@mui/material';
import { useContext, useState } from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';


const columns = columnsHeader
const rows = mockData

export default function StickyHeadTable() {
    const theme = useTheme();
    const colors = tokens.apply(theme.palette.mode);
    // const selectThemeMode = useContext(ColorContext);

    //pagination
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    //filter
    const toggleDrawer = (open) => (event) => {
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
        // Set the formatted date to selectStartDate (or whatever you need)
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
        <Box style={{ border: '1px solid white', borderRadius: '4px', background: colors.white[900], padding: '20px', margin: '20px' }}>
            <Box>
                <Box>
                    <h1 style={{ marginTop: '0px' }}>Coverage Periods</h1>
                </Box>
                <Box style={{ paddingBottom: '10px' }}>
                    <Button variant="outlined" onClick={toggleDrawer(true)} sx={{ paddingBottom: '5px' }}> <FilterAltOutlinedIcon />Filters</Button>
                </Box>

                {(selectedFilters.selectedOrg?.length > 0 || selectedFilters.selectedCarriers?.length > 0 ||
                    selectedFilters.distributionFormat || selectedFilters.selectStartDate || selectedFilters.selectEndDate) &&
                    <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <p>Company: {selectedFilters.selectedOrg?.length > 0
                            ? selectedFilters.selectedOrg.join(', ')
                            : 'None'} </p>
                        <p>Carriers: {selectedFilters.selectedCarriers?.length > 0
                            ? selectedFilters.selectedCarriers.join(', ')
                            : 'None'} </p>
                        <p>Distribution Format: {selectedFilters.distributionFormat?.length > 0
                            ? selectedFilters.distributionFormat.join(', ')
                            : 'None'} </p>
                        <p>Coverage Start Date: {selectedFilters.dateStartType} {selectedFilters.selectStartDate?.length > 0
                            ? selectedFilters.selectStartDate
                            : 'None'} </p>
                        <p>Coverage End Date: {selectedFilters.dateEndType} {selectedFilters.selectEndDate?.length > 0
                            ? selectedFilters.selectEndDate
                            : 'None'} </p>
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
