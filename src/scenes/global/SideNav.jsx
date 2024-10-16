import { useState } from "react"
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import { Box, IconButton, useTheme, Typography } from '@mui/material'
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { tokens } from '../../themes';
import ideonLogo from '/workspaces/assignment-ideon-dashboard/src/assets/ideon-logo.webp'

import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const NavItems = ({ title, to, icon, selectedNav, setSelectedNav }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <MenuItem
            active={selectedNav === title}
            style={{ color: colors.white[500] }}
            onClick={() => setSelectedNav(title)}
            icon={icon}>
            <Typography >{title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}

function SideNav() {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedNav, setSelectedNav] = useState("DashBoard")

    return (
        <Box sx={{
            "& .pro-sidebar > .pro-sidebar-inner": {
                height: '100%',
                overflowY: 'hidden !important',
                background: colors.blue[500]
            },
            "& .pro-sidebar-inner > .pro-sidebar-layout": {
                overflowY: 'scroll !important',
                height: '100%',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            },
        }}>
            <ProSidebar collapsed={isCollapsed}>
                <Menu>
                    {!isCollapsed && (
                        <Box mb="25px" mt="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img src={ideonLogo} alt="Ideon Logo" style={{ width: '150px', height: 'auto' }} />
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "0%"}>
                        <Box>
                            <Box color="white" display="flex" justifyContent="center" alignItems="center" border="1px solid white" padding={1} margin={2} borderRadius={2}>
                                Customer Dashboard <ArrowDropDownOutlinedIcon />
                            </Box>
                        </Box>

                        <NavItems
                            title="Inbox"
                            to="/inbox"
                            icon={<FolderOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav
                            ={setSelectedNav}
                        />

                        <Typography
                            variant="h6"
                            color={colors.white[300]}
                            sx={{ m: "15px 0 5px 20px", display: isCollapsed ? 'none' : 'block', }}

                        >
                            Perspective Groups
                        </Typography>
                        <NavItems
                            title="Perspective Groups"
                            to="/perspectiveGroups"
                            icon={<FolderOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav
                            ={setSelectedNav}
                        />
                        <NavItems
                            title="Pre Coverage Periods"
                            to="/precoverageperiods"
                            icon={<ImportContactsOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav
                            ={setSelectedNav}
                        />
                        <NavItems
                            title="Coverage Periods"
                            to="/coveragePeriods"
                            icon={<WorkOutlineOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav
                            ={setSelectedNav}
                        />

                        <Typography
                            variant="h6"
                            color={colors.white[300]}
                            sx={{ m: "15px 0 5px 20px", display: isCollapsed ? 'none' : 'block', }}
                            paddingLeft={isCollapsed ? undefined : "0%"}
                        >
                            Enrollments
                        </Typography>
                        <NavItems
                            title="Enrollment Tasks"
                            to="/enrollmenttasks"
                            icon={<BusinessCenterOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav
                            ={setSelectedNav}
                        />
                        <NavItems
                            title="Customer Tickets"
                            to="/customertickets"
                            icon={<ConfirmationNumberOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav
                            ={setSelectedNav}
                        />
                        <Typography
                            variant="h6"
                            color={colors.white[300]}
                            sx={{ m: "15px 0 5px 20px", display: isCollapsed ? 'none' : 'block', }}
                        >
                            Discrepancies
                        </Typography>
                        <NavItems
                            title="Enrollment Discrepancies"
                            to="/enrollmentdiscrepancies"
                            icon={<PlagiarismOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav
                            ={setSelectedNav}
                        />

                        <Typography
                            variant="h6"
                            color={colors.white[300]}
                            sx={{ m: "15px 0 5px 20px", display: isCollapsed ? 'none' : 'block', }}
                        >
                            Reports
                        </Typography>
                        <NavItems
                            title="Member Counts"
                            to="/membercounts"
                            icon={<PersonOutlineOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav={setSelectedNav}
                        />
                        <NavItems
                            title="SLA Performance"
                            to="/slaperformance"
                            icon={<SignalCellularAltOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav={setSelectedNav}
                        />
                        <NavItems
                            title="Time to Production"
                            to="/timetoproduction"
                            icon={<AccessTimeOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav={setSelectedNav}
                        />
                        <Typography
                            variant="h6"
                            color={colors.white[300]}
                            sx={{ m: "15px 0 5px 20px", display: isCollapsed ? 'none' : 'block', }}

                        >
                            Admin
                        </Typography>
                        <NavItems
                            title="Users"
                            to="/users"
                            icon={<GroupOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav={setSelectedNav}
                        />
                        <NavItems
                            title="Account Settings"
                            to="/accountsettings"
                            icon={<SettingsOutlinedIcon />}
                            selected={selectedNav}
                            setSelectedNav={setSelectedNav}
                        />
                    </Box>
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowBackIosNewOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.white[500],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="right"
                                alignItems="right"
                                ml="15px"
                            >
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <ArrowBackIosNewOutlinedIcon style={{ color: colors.white[500] }} />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                </Menu>
            </ProSidebar>

        </Box>

    )
}

export default SideNav