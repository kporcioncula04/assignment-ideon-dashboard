import { Box, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorContext, tokens } from '../../themes'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';

function TopNav() {
    const theme = useTheme();
    const colors = tokens.apply(theme.palette.mode);
    const selectThemeMode = useContext(ColorContext);

    return (
        <Box display="flex" justifyContent="space-between">
        </Box>
    )
}

export default TopNav