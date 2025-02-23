import { NavigationBar } from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
    <NavigationBar />
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        {/* <LoginPage /> */}
        {/* <RegisterPage /> */}
        <HomePage />
      </main>
    </>
  );
}

export default App;
