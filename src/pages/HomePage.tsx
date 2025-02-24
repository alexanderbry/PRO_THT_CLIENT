import React from "react";
import { Card, Badge } from "flowbite-react";
import { HiMail, HiCalendar } from "react-icons/hi";
import { NavigationBar } from "../components/Navbar";
import { api } from "../APIs/api";
import { jwtDecode } from "jwt-decode";

const HomePage: React.FC = () => {
  const [user, setUser] = React.useState({
    fullName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    createdAt: "",
  });

  async function fetchUser() {
    const token = localStorage.getItem("token");
    const user = jwtDecode<{ id: string }>(token!);

    const response = await api.get(`/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    setUser(response.data.data);
  }

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen w-full">
      <NavigationBar />
      <div className="flex h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="flex flex-col items-center pb-2">
            <img
              src="https://i.pinimg.com/564x/7b/12/2b/7b122bfb0391eea8a55c6b331471b7db.jpg"
              alt="Profile"
              className="mb-3 size-32 rounded-full border-4 border-white shadow-lg"
            />

            <h5 className="mb-1 text-xl font-medium text-gray-900">
              {user.fullName}
            </h5>
            <Badge color="info" className="px-3 py-1">
              {user.gender} • {new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()} years
            </Badge>

            <div className="mt-6 w-full space-y-4 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="text-blue-600">
                  <HiMail className="size-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-base font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-blue-600">
                  <HiCalendar className="size-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined since</p>
                  <p className="text-base font-medium text-gray-900">{new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
