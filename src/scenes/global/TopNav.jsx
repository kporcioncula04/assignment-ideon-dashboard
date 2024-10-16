import { Box, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorContext, tokens } from '../../themes'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

function TopNav() {
    const theme = useTheme();
    const colors = tokens.apply(theme.palette.mode);
    const selectThemeMode = useContext(ColorContext);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* todo: make this dynamic */}
            <Box><p>Coverage Periods</p> </Box>
            <Box display="flex" >
                <IconButton onClick={selectThemeMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <ModeNightOutlinedIcon />
                    ) : <WbSunnyOutlinedIcon />}
                </IconButton>
                <IconButton><NotificationsOutlinedIcon /></IconButton>
                {/* todo:  */}
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