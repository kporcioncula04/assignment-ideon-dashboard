import * as React from 'react';
import CustomTable from '../../components/CustomTableComponent';
import './index.css'

import { Box } from '@mui/material';
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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box style={{ border: '1px solid white', }}>
            <Box>
                <h1>Coverage Periods</h1>
                <button>Filters</button>
            </Box>

            <CustomTable
                columns={columns}
                rows={mockData}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>

    );
}
