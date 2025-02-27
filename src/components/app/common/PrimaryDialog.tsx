"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { Children, cloneElement, isValidElement, useState } from "react";

interface PrimaryDialogProps {
  children: React.ReactNode;
  title?: string;
  textButton?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

interface WithSetOpenProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrimaryDialog = ({
  children,
  title,
  textButton = "Ouvrir",
  variant = "default",
}: PrimaryDialogProps) => {
  const [open, setOpen] = useState(false);

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement<WithSetOpenProps>(child)) {
      return cloneElement(child, { setOpen });
    }

    return child;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>{textButton}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {childrenWithProps}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PrimaryDialog;
