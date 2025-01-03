import { Box, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorContext, tokens } from '../../themes'
import { useLocation } from 'react-router-dom';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

function TopNav() {
    const theme = useTheme();
    const colors = tokens.apply(theme.palette.mode);
    const selectThemeMode = useContext(ColorContext);
    const location = useLocation();

    // todo: implement more pagetitle here to make it dynamic
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/coveragePeriods':
                return 'Coverage Periods';
            case '/enrollment':
                return 'Enrollment Tasks';
            default:
                return 'Dashboard';
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box><p>{getPageTitle()}</p></Box>
            <Box display="flex" >
                <IconButton onClick={selectThemeMode.toggleColorMode}>
                    {theme.palette.mode === 'light' ? (
                        <ModeNightOutlinedIcon />
                    ) : <WbSunnyOutlinedIcon />}
                </IconButton>
                <IconButton><NotificationsOutlinedIcon /></IconButton>
                <IconButton> <PortraitOutlinedIcon /></IconButton>

                <IconButton sx={{ display: 'flex', alignItems: 'center' }}>
                    <span>Hanna
                        <KeyboardArrowDownOutlinedIcon sx={{ marginLeft: 0.5, paddingTop: 0.4 }} /></span>
                </IconButton>
            </Box>
        </Box>
    )
}

export default TopNav