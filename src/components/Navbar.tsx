
import { Button, DarkThemeToggle, Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function NavigationBar() {
  return (
    <Navbar fluid>
      <div className="flex gap-3 md:order-2">
        <Button color="failure">Logout</Button>
        <DarkThemeToggle />
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
