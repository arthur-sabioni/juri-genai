import { Alert as MuiAlert, AlertProps as MuiAlertProps, Collapse } from "@mui/material";

interface AlertProps extends MuiAlertProps {
  /**
   * If true, the alert will be shown.
   * If false, the alert will be collapsed.
   * Default is true.
   */
  open?: boolean;
}

export function Alert({ open = true, sx, children, ...props }: AlertProps) {
  return (
    <Collapse in={open}>
      <MuiAlert
        sx={{
          alignItems: "center",
          "& .MuiAlert-icon": {
            padding: 0,
            alignItems: "center",
            display: "flex",
          },
          "& .MuiAlert-action": {
            padding: 0,
            alignItems: "center",
            display: "flex",
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiAlert>
    </Collapse>
  );
}
