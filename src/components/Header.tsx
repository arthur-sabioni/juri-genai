import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem } from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useLanguage, useTranslation } from "../language";
import juriLogo from "../assets/juri.png";

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  const { signOut } = useAuthenticator();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        top: 0,
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(12px)",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 960,
          width: "100%",
          mx: "auto",
          px: 2,
          py: 1.5,
          gap: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            component="img"
            src={juriLogo}
            alt="Juri logo"
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Select
            size="small"
            value={language}
            onChange={(event) => setLanguage(event.target.value as "en-us" | "pt-br")}
          >
            <MenuItem value="pt-br">pt-br</MenuItem>
            <MenuItem value="en-us">en-us</MenuItem>
          </Select>
          {typeof signOut === "function" && (
            <Button
              onClick={signOut}
              variant="contained"
              color="secondary"
              size="small"
            >
              {t("header.signOut")}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
