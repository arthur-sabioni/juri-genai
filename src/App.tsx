import {
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import Welcome from "./pages/Welcome";
import Header from "./components/Header";
import { appTheme } from './theme';
import { LanguageProvider } from "./language";

function App() {
  return (    
    <LanguageProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            bgcolor: "background.default",
          }}
        >
          <Box width="100%">
            <Header title="JuriAI" />
            <Welcome />
          </Box>
        </Container>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
