import { Label, Modal, TextInput, Radio } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { api } from "../APIs/api";
import Swal from "sweetalert2";
import { isAxiosError } from "axios";

interface Iprops {
  userId: number;
}

export function EditButton(props: Iprops) {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    email: "",
    fullName: "",
    gender: "",
    dateOfBirth: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  function onCloseModal() {
    setOpenModal(false);
  }

  async function fetchUser() {
    const token = localStorage.getItem("token");

    const response = await api.get(`/${props.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const formattedDateOfBirth = new Date(response.data.data.dateOfBirth)
      .toISOString()
      .split("T")[0];

    setFormData({
      ...response.data.data,
      dateOfBirth: formattedDateOfBirth,
    });
  }

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const { id, email, role, createdAt, updatedAt, ...updateData } = formData;
      console.log(id, email, role, createdAt, updatedAt);

      await api.put(`/${props.userId}`, updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "User updated",
        text: "The user details were updated successfully!",
      });
      setOpenModal(false);
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
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <HiOutlinePencilAlt
        onClick={() => setOpenModal(true)}
        className="cursor-pointer text-blue-400 hover:text-blue-500"
        size={18}
      />
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
              Edit User
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label value="Full Name" />
                </div>
                <TextInput
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  type="text"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Email" />
                </div>
                <TextInput
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="gender" value="Gender" />
                </div>
                <div className="flex items-center space-x-4">
                  <Radio
                    id="male"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <Label htmlFor="male" value="Male" />
                  <Radio
                    id="female"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <Label htmlFor="female" value="Female" />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Date of Birth" />
                </div>
                <TextInput
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mt-6 flex w-full justify-center">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save edited user
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
