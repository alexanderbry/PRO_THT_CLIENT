
import { Button, DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { useNavigate } from "react-router";

export function NavigationBar() {
  const navigate = useNavigate();

  async function HandleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  }
  
  return (
    <Navbar fluid className="fixed w-screen">
      <div className="flex gap-3 md:order-2">
        <Button color="failure" onClick={HandleLogout}>Logout</Button>
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
