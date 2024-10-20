import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, useTheme, MenuItem, Select, Box } from '@mui/material';
import { useContext } from 'react'
import { ColorContext, tokens } from '../themes'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../index.css'

import FileCopyIcon from '@mui/icons-material/FileCopy';

const CustomTable = ({ columns, rows, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const theme = useTheme();
  const colors = tokens.apply(theme.palette.mode);
  const selectThemeMode = useContext(ColorContext);

  return (
    <TableContainer className="table-container">
      <Table stickyHeader aria-label="sticky table">
        <TableHead >
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, border: '0.2px solid lightgray' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow hover tabIndex={-1} key={row.uuid} className='table-row'>
                {columns.map((column) => {
                  let value = row[column.id];
                  if (column.id === 'uuid') {
                    value = value.substring(0, 5);
                  }

                  return (
                    <TableCell key={`${row.uuid}-${column.id}`} align={column.align} className='table-cell'>
                      {column.id === 'uuid' ? (
                        <div className='uuid-container' style={{ color: '#990099' }}>
                          <span>
                            <FileCopyIcon style={{ fontSize: '14px', marginLeft: '5px' }} /> {value}
                          </span>
                        </div>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="center" padding="5px">
        <Box>
          <label>Show:</label>
          <Select value={rowsPerPage} onChange={onRowsPerPageChange} className='select-pagination'>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </Box>
        <Pagination sx={{
          '& .MuiPaginationItem-root': {
            color: '#990099',
          },
          '& .Mui-selected': {
            backgroundColor: 'lightgray',
            color: '#fff',
          },
        }} count={Math.ceil(rows.length / rowsPerPage)}
          page={page} onChange={onPageChange} defaultPage={1} siblingCount={1} boundaryCount={1}
        />
      </Stack>

    </TableContainer>
  );
};

export default CustomTable;