import React from "react";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

export default function FlexIcon({ onClick }) {
  return (
    <div className="flex justify-end">
      <div className="fixed top-[85px] right-6">
        <IconButton
          onClick={onClick}
          aria-label="Settings"
          size="large"
          // sx={{
          //   bgcolor: "rgba(0,0,0,0.05)",
          //   "&:hover": { bgcolor: "rgba(0,0,0,0.10)" },
          // }}
        >
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}
