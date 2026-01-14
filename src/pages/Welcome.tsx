import {
  Box,
  Typography
} from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useTranslation } from "../language";

function Welcome() {
  const { user } = useAuthenticator((context) => [context.user]);
  const userName = user?.signInDetails?.loginId;
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4">
        {t("welcome.heading")}
        {userName ? `, ${userName}` : ""} 👋
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
        {t("welcome.subtitle")}
      </Typography>
    </Box>
  );
}

export default Welcome;
