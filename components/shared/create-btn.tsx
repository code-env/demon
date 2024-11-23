import React from "react";

import { Button } from "@/components/ui/button";

interface CreateButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
}

const CreateButton = ({ children, onClick, isLoading }: CreateButtonProps) => {
  return (
    <Button onClick={onClick} disabled={isLoading}>
      {isLoading ? "Creating..." : children}
    </Button>
  );
};

export default CreateButton;
