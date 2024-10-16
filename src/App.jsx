import { useState } from 'react'
import { ColorContext, useMode } from './themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import TopNav from './scenes/global/TopNav';
import SideNav from './scenes/global/SideNav'
import CustomerDashboard from './scenes/customerDashboard';
// import CoveragePeriods from './scenes/customerDashboard'
// todo: implement other pages
// import EnrollmentTasks from './scenes/dashboard'
// import CustomerTickerts from './scenes/dashboard'
// import PreCoveragePeriods from './scenes/dashboard'
import CoveragePeriods from './scenes/coveragePeriods'

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <>
          <div className="layout">
            <SideNav />
            <main className="main">
              <TopNav />
              <Routes>
                <Route path="/" element={<Navigate to="/coveragePeriods" />} />
                {/* <Route path="/enrollment" element={<EnrollmentTasks />} /> */}
                <Route path="/coveragePeriods" element={<CoveragePeriods />} />
                {/* <Route path="/customerTickets" element={<CustomerTickerts />} />
                <Route path="/preCoveragePeriods" element={<PreCoveragePeriods />} /> */}
              </Routes>
            </main>
          </div>
        </>
      </ThemeProvider>

    </ColorContext.Provider>

  )
}

export default App
