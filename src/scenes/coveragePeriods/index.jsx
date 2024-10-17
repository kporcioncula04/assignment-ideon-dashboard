import * as React from 'react';
import CustomTable from '../../components/CustomTable';
import { Box, Button, TextField, Drawer } from '@mui/material';
import { ColorContext, tokens } from '../../themes'
import { useContext, useState } from 'react'
import { useTheme } from '@mui/material';

import './index.css'

import { mockData } from '../../data/mockData';

const columns = [
    { id: 'uuid', label: 'UUID', minWidth: 120 },
    { id: 'organization_name', label: 'Organization Name', minWidth: 120 },
    {
        id: 'carrier',
        label: 'Carrier',
        minWidth: 120,
        align: 'left',
    },
    {
        id: 'account',
        label: 'Account',
        minWidth: 120,
        align: 'left',
    },
    {
        id: 'delivery_config',
        label: 'Delivery Configuration',
        minWidth: 120,
        align: 'left',
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //filter
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [filteredRows, setFilteredRows] = useState(rows)
    const [filterValue, setFilterValue] = useState('')

    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const applyFilter = () => {
        const filteredData = rows.filter((row) =>
            row.organization_name.toLowerCase().includes(filterValue.toLowerCase()) ||
            row.carrier.toLowerCase().includes(filterValue.toLowerCase())
        );
        setFilteredRows(filteredData);
        setDrawerOpen(false)
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
        </Box>

    );
}
