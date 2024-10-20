import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, useTheme, MenuItem, Select, Box } from '@mui/material';
import { tokens } from '../themes'
import { Pagination, Stack } from '@mui/material';

import '../index.css'
import FileCopyIcon from '@mui/icons-material/FileCopy';

const CustomTable = ({ columns, rows, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const theme = useTheme();
  const colors = tokens.apply(theme.palette.mode);
  return (
    <TableContainer className="table-container" sx={{
      '& .MuiTableCell-root': {
        color: theme.palette.mode === 'light' ? colors.black[500] : colors.white[500], // Adjust text color based on mode
      },
    }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead sx={{
          '& .MuiTableCell-head': {
            backgroundColor: theme.palette.mode === 'light' ? colors.gray[600] : colors.gray[400],
            color: theme.palette.mode === 'light' ? colors.black[200] : colors.black[500],
          }
        }} >
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

        <TableBody sx={{
          '& .MuiTableRow-root': {
            backgroundColor: theme.palette.mode === 'light' ? colors.white[800] : colors.blue[500],
            '&:hover': {
              backgroundColor: theme.palette.mode === 'light' ? colors.white[500] : colors.gray[400],
            },
          }
        }}>
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
                    <TableCell key={`${row.uuid}-${column.id}`} align={column.align} className='table-cell' >
                      {column.id === 'uuid' ? (
                        <div className='uuid-container'>
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

    </TableContainer >
  );
};

export default CustomTable;