import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box } from "@mui/material";
import "./amplify-config";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Authenticator>
        <App />
      </Authenticator>
    </Box>
  </React.StrictMode>
);
