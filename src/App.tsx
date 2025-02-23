import { NavigationBar } from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
    {/* <NavigationBar /> */}
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        {/* <LoginPage /> */}
        <RegisterPage />
      </main>
    </>
  );
}

export default App;
