import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { NavigationBar } from "../components/Navbar";
import { api } from "../APIs/api";
import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import { isAxiosError } from "axios";
import { EditButton } from "../components/ModalButton";

interface User {
  id: number;
  fullName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  createdAt: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  async function fetchUsers() {
    const token = localStorage.getItem("token");
    const response = await api.get(`/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
    setUsers(response.data.data);
  }

  async function HandleDelete(id: number) {
    Swal.fire({
      title: "Do you want to delete this user?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          api.delete(`/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        } catch (error) {
          if (isAxiosError(error)) {
            Swal.fire({
              icon: "error",
              title: "Sorry!",
              text: error.response?.data.message,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Sorry!",
              text: "An error occurred. Please try again later.",
            });
          }
        }
        Swal.fire("Deleted!", "", "success");
      }
    });
  }

  React.useEffect(() => {
    fetchUsers();
  }, [users]);

  return (
    <div className="min-h-screen">
      <NavigationBar />
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 p-4">
        <Table hoverable>
          <TableHead>
            <TableHeadCell className="text-center">No</TableHeadCell>
            <TableHeadCell className="text-center">Full Name</TableHeadCell>
            <TableHeadCell className="text-center">Email</TableHeadCell>
            <TableHeadCell className="text-center">Gender</TableHeadCell>
            <TableHeadCell className="text-center">Date of Birth</TableHeadCell>
            <TableHeadCell className="text-center">Join Date</TableHeadCell>
            <TableHeadCell className="text-center">Actions</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {users.map((user, index) => (
              <TableRow
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.fullName}
                </TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={
                      user.gender === "male" ? "text-blue-500" : "text-pink-500"
                    }
                  >
                    {user.gender}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="flex justify-center gap-4 whitespace-nowrap">
                  <EditButton userId={user.id} />
                  <HiOutlineTrash
                    onClick={() => HandleDelete(user.id)}
                    className="cursor-pointer text-red-400 hover:text-red-500"
                    size={18}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
