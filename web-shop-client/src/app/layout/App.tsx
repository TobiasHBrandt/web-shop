import { Container, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Headers from "./Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const palettetype = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palettetype,
      background: {
        default: palettetype === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Headers darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Catalog />
      </Container>
      
    </ThemeProvider>
  );
}

export default App;
