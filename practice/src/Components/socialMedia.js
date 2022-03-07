import React from "react";
import Card from "@mui/material/Card";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const SocialMedia = () => {
  return (
    <div>
      <Card style={{ borderColor: "red" }}>
        <InstagramIcon />
        <LinkedInIcon />
        <WhatsAppIcon />
      </Card>
    </div>
  );
};

export default SocialMedia;
