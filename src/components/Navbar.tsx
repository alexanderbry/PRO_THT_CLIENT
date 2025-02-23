
import { Button, DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function NavigationBar() {
  return (
    <Navbar fluid>
      <div className="flex gap-3 md:order-2">
        <Button color="failure">Logout</Button>
        <DarkThemeToggle />
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarBrand className="text-3xl font-bold text-blue-800">
          PRO THT <span className="ml-2 text-base text-black">by Alexander Briyan</span>
        </NavbarBrand>
      </NavbarCollapse>
    </Navbar>
  );
}
