import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { Box, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorContext, tokens } from '../themes'

const CustomTable = ({ columns, rows, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const theme = useTheme();
  const colors = tokens.apply(theme.palette.mode);
  const selectThemeMode = useContext(ColorContext);

  return (
    <TableContainer sx={{ maxHeight: 440, border: 'lightgray', borderRadius: '10px' }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead >
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, border: '1px solid gray' }}
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
              <TableRow hover tabIndex={-1} key={row.uuid} sx={{ border: '1px solid white' }}>
                {columns.map((column) => {
                  let value = row[column.id];
                  if (column.id === 'uuid') {
                    value = value.substring(0, 5); // Trim UUID to first 5 characters
                  }

                  return (
                    <TableCell key={`${row.uuid}-${column.id}`} align={column.align} style={{ border: '0.5px solid gray' }}>
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default CustomTable;