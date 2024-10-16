import { useState } from 'react'
import { ColorContext, useMode } from './themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import TopNav from './scenes/global/TopNav';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <>
          <div className="app">
            <main className="content">
              <TopNav />
            </main>
          </div>
        </>
      </ThemeProvider>

    </ColorContext.Provider>

  )
}

export default App
