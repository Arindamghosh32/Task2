import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import Form from "./Pages/Form";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      
      
      <Box sx={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>

      
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100vw",
          bgcolor: "background.default", 
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Form />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
