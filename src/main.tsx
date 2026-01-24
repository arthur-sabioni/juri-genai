import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box } from "@mui/material";
import "./amplify-config";
import { OpenAPI } from "./client";
import { JURIMETRY_API_BASE_URL } from "./config";
import { fetchAuthSession } from "aws-amplify/auth";

OpenAPI.BASE = JURIMETRY_API_BASE_URL;
OpenAPI.TOKEN = async () => {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString() || "";
};

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
