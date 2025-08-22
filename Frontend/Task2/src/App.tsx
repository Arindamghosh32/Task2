import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Form from "./Pages/Form";
import { Box } from "@mui/material";


function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;