import {
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import PagesHandler from "./pages/handler/PagesHandler";
import Header from "./components/Header";
import { appTheme } from './theme';
import { LanguageProvider } from "./language";
import { PagesProvider } from "./pages/handler/PagesProvider";

function App() {
  return (    
    <LanguageProvider>
      <PagesProvider>
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
              <PagesHandler />
            </Box>
          </Container>
        </ThemeProvider>
      </PagesProvider>
    </LanguageProvider>
  );
}

export default App;
