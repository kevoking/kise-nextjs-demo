"use client";

import { useState } from "react";
import { Toast } from "@/components/ui/toast";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <>
      {children}
      <Toast message="Welcome to the app!" />
      <Dialog title="Example Dialog" open={true}>
        <p>This is a dialog example.</p>
      </Dialog>
      <DropdownMenu>
        <DropdownMenu.Item>Option 1</DropdownMenu.Item>
        <DropdownMenu.Item>Option 2</DropdownMenu.Item>
      </DropdownMenu>
      <button onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </>
  );
}