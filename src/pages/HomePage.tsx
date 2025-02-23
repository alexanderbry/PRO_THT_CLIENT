import React from "react";
import { Card, Badge } from "flowbite-react";
import { HiMail, HiCalendar } from "react-icons/hi";

const HomePage: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "Male",
    age: 30,
    joinDate: "1 February 2025",
    profilePicture: "https://i.pinimg.com/564x/7b/12/2b/7b122bfb0391eea8a55c6b331471b7db.jpg",
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center pb-2">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="mb-3 size-32 rounded-full border-4 border-white shadow-lg"
          />
          
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            {user.name}
          </h5>
          <Badge color="info" className="px-3 py-1">
            {user.gender} • {user.age} years
          </Badge>

          <div className="mt-6 w-full space-y-4 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="text-blue-600">
                <HiMail className="size-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-blue-600">
                <HiCalendar className="size-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="font-medium text-gray-900">{user.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;