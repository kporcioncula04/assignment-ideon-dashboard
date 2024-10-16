import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles"

//colors
export const tokens = (mode) => ({
    ...(mode === 'dark' ? {
        black: {
            100: "#d3d3d4",
            200: "#a6a8a9",
            300: "#7a7c7f",
            400: "#4d5154",
            500: "#212529",
            600: "#1a1e21",
            700: "#141619",
            800: "#0d0f10",
            900: "#070708"
        },
        white: {
            100: "#fefefe",
            200: "#fcfdfd",
            300: "#fbfbfc",
            400: "#f9fafb",
            500: "#f8f9fa",
            600: "#c6c7c8",
            700: "#959596",
            800: "#636464",
            900: "#323232"
        },
        magenta: {
            100: "#ffccff",
            200: "#ff99ff",
            300: "#ff66ff",
            400: "#ff33ff",
            500: "#ff00ff",
            600: "#cc00cc",
            700: "#990099",
            800: "#660066",
            900: "#330033"
        },
        blue: {
            100: "#d0d1d3",
            200: "#a1a3a7",
            300: "#72747c",
            400: "#434650",
            500: "#141824",
            600: "#10131d",
            700: "#0c0e16",
            800: "#080a0e",
            900: "#040507"
        }
    } : {
        black: {
            100: "#070708",
            200: "#0d0f10",
            300: "#141619",
            400: "#1a1e21",
            500: "#212529",
            600: "#4d5154",
            700: "#7a7c7f",
            800: "#a6a8a9",
            900: "#d3d3d4",
        },
        white: {
            100: "#323232",
            200: "#636464",
            300: "#959596",
            400: "#c6c7c8",
            500: "#f8f9fa",
            600: "#f9fafb",
            700: "#fbfbfc",
            800: "#fcfdfd",
            900: "#fefefe",
        },
        magenta: {
            100: "#330033",
            200: "#660066",
            300: "#990099",
            400: "#cc00cc",
            500: "#ff00ff",
            600: "#ff33ff",
            700: "#ff66ff",
            800: "#ff99ff",
            900: "#ffccff",
        },
        blue: {
            100: "#040507",
            200: "#080a0e",
            300: "#0c0e16",
            400: "#10131d",
            500: "#141824",
            600: "#434650",
            700: "#72747c",
            800: "#a1a3a7",
            900: "#d0d1d3",
        }
    })
})


//mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark' ? {
                primary: {
                    main: colors.blue[500]
                },
                secondary: {
                    main: colors.black[500]
                },
                neutral: {
                    dark: colors.black[700],
                    main: colors.black[500],
                    light: colors.black[100]
                },
                background: {
                    default: colors.black[500]
                }
            } : {
                primary: {
                    main: colors.white[500]
                },
                secondary: {
                    main: colors.white[600]
                },
                neutral: {
                    dark: colors.white[700],
                    main: colors.white[500],
                    light: colors.white[100]
                },
                background: {
                    default: colors.white[900]
                }
            })
        },
        typography: {
            fontFamily: ["Roboto", "sans-serif"].join(','),
            fontSize: 12,
            h1: {
                fontSize: 40
            },
            h2: {
                fontSize: 32
            },
            h3: {
                fontSize: 24
            },
            h4: {
                fontSize: 20
            },
            h5: {
                fontSize: 16
            },

        }
    }
};

//context for color mode 
export const ColorContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState("dark")
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light"))
        })
    )
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return [theme, colorMode];
}