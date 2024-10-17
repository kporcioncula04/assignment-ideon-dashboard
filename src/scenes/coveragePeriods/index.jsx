import * as React from 'react';

import CustomTable from '../../components/CustomTable';
import FilterDrawer from '../../components/FilterDrawer';
import { mockData } from '../../data/mockData';
import './index.css'
import { ColorContext, tokens } from '../../themes'

import { useTheme } from '@mui/material';
import { Box, Button, TextField, Drawer } from '@mui/material';
import { useContext, useState } from 'react'

const columns = [
    { id: 'uuid', label: 'UUID', minWidth: 120 },
    { id: 'organization_name', label: 'Organization Name', minWidth: 120 },
    {
        id: 'carrier', label: 'Carrier', minWidth: 120, align: 'left',
    },
    {
        id: 'account', label: 'Account', minWidth: 120, align: 'left',
    },
    {
        id: 'delivery_config', label: 'Delivery Configuration', minWidth: 120, align: 'left',
    },
];

const rows = mockData

export default function StickyHeadTable() {
    const theme = useTheme();
    const colors = tokens.apply(theme.palette.mode);
    // const selectThemeMode = useContext(ColorContext);

    //pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [filteredRows, setFilteredRows] = useState(rows)


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //filter
    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    };

    const handleApplyFilter = (filters) => {
        const { selectedOrganizations = [], selectedCarriers = [], distributionFormat = '' } = filters;

        const filteredData = rows.filter((row) => {
            const orgMatch = selectedOrganizations.length === 0 || selectedOrganizations.includes(row.organization_name);
            const carrierMatch = selectedCarriers.length === 0 || selectedCarriers.includes(row.carrier);
            const formatMatch = !distributionFormat || row.distribution_format === distributionFormat;

            return orgMatch && carrierMatch && formatMatch;
        });
        setFilteredRows(filteredData);
    };

    return (
        <Box style={{ border: '1px solid white', borderRadius: '4px', background: colors.white[900], padding: '20px', margin: '20px' }}>
            <Box>
                <h1>Coverage Periods</h1>
                <Button variant="contained" onClick={toggleDrawer(true)} >Filters</Button>
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
