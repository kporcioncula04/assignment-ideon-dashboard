import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy'; // Import the icon

const CustomTable = ({ columns, rows, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
    return (
        <TableContainer sx={{ maxHeight: 440, border: '1px solid white' }}>
            <Table stickyHeader aria-label="sticky table">
                {/* Table Header */}
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow hover tabIndex={-1} key={row.uuid}>
                                {columns.map((column) => {
                                    let value = row[column.id];

                                    // Trim UUID and add an icon if the column is 'uuid'
                                    if (column.id === 'uuid') {
                                        value = value.substring(0, 5); // Trim UUID to first 5 characters
                                    }

                                    return (
                                        <TableCell key={`${row.uuid}-${column.id}`} align={column.align}>
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
            {/* Table Pagination */}
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