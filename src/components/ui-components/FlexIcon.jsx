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
        >
          <SettingsIcon fontSize="inherit" className="dark:text-gray-100" />
        </IconButton>
      </div>
    </div>
  );
}
