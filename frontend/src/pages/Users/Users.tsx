import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Page from "../../components/Page/Page";
import { axiosAuth, UserType } from "../../utils/axios";

import classes from "./Users.module.css";
import Button from "../../components/Button/Button";
import axios from "axios";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import Modal from "../../components/Modal/Modal";
import { Context } from "../../utils/Context";
import Input from "../../components/Input/Input";

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]); // State to store users
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const { isAuth, handleLoginClick, isAddUser, handleAddUser } = useContext(Context);

  const fetchUsers = async () => {
    try {
      const response = await axiosAuth("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = (user: UserType) => {
    if (!isAuth) {
      handleLoginClick(true);
      return;
    }
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await axiosAuth.delete(`/api/users/${userToDelete.id}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userToDelete.id)
        );
        setShowDeleteModal(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <Page title="Users">
      <div className={classes.userList}>
        {users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          <table className={classes.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    <Icon
                      icon={icons.delete}
                      style={{ cursor: "pointer" }}
                      width={20}
                      onClick={() => handleDeleteClick(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showDeleteModal && (
        <Modal
          title="Confirm Delete"
          textOk="Delete"
          textCancel="Cancel"
          onSubmit={handleConfirmDelete}
          onClose={handleCancelDelete}
          iconName="delete"
        >
          <span className={classes.modalContainer}>
            Are you sure you want to delete this user?
          </span>
        </Modal>
      )}
    </Page>
  );
};

export default Users;
