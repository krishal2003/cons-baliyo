import { Icon } from "@iconify/react";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { IconButtonAnimate } from "./animate";
import Link from "next/link";

function Help() {
 const [open, setOpen] = useState(false);
 const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
 const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };

  return (
    <Link href="/dashboard/application/" >
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleClickOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Icon icon="material-symbols:help" width="30px" />
      </IconButtonAnimate>
    </Link>
  );
}

export default Help;

