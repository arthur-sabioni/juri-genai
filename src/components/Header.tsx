import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useTranslation } from "../language";
import { usePage } from "../pages/handler/hooks";
import { Pages } from "../pages/handler/types";
import juriLogo from "../assets/juri.png";

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  const { signOut } = useAuthenticator();
  const { t } = useTranslation();
  const { setCurrentPage } = usePage();

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
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1.5,
            cursor: "pointer",
            userSelect: "none"
          }}
          onClick={() => setCurrentPage(Pages.Welcome)}
        >
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
