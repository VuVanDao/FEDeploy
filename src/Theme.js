import { experimental_extendTheme as extendTheme } from "@mui/material";
import { deepOrange, orange } from "@mui/material/colors";

// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       //   main: "#556cd6",
//       main: yellow[500],
//     },
//     secondary: {
//       main: "#19857b",
//     },
//     error: {
//       main: red.A400,
//     },
//     text: {
//       secondary: red[500],
//       primary: blue[500],
//     },
//   },
// });
const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_BAR_CONTENT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "55px";
const theme = extendTheme({
  trelloCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_BAR_CONTENT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  colorSchemes: {
    light: {
      palette: {
        // primary: teal, //primary.main,primary.light
        secondary: deepOrange,
      },
      spacing: (factor) => `${0.25 * factor}rem`,
    },
    dark: {
      palette: {
        // primary: cyan,
        secondary: orange,
      },
      spacing: (factor) => `${0.25 * factor}rem`,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          textTransform: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.mode === "dark" ? "#90caf9" : "white",
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "3px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdc3c7",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#00b894",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          // console.log(theme);
          return {
            color: theme.palette.mode === "dark" ? "#90caf9" : "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.mode === "dark" ? "#90caf9" : "white",
            },
            "& .css-1i1js26-MuiSvgIcon-root-MuiSelect-icon": {
              borderColor:
                theme.palette.mode === "dark" ? "primary.main" : "white",
            },
            "&:hover": {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark" ? "#90caf9" : "white",
              },
            },
            "& fieldSet": {
              borderWidth: "1px !important",
            },
          };
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottomColor: "transparent",
          },
        },
      },
    },
  },
});
export default theme;
