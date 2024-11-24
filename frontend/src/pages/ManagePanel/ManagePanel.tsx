import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Page from "../../components/Page/Page";
import { axiosAuth, CategoryType, UserType } from "../../utils/axios";

import classes from "./ManagePanel.module.css";
import Button from "../../components/Button/Button";
import axios from "axios";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import Modal from "../../components/Modal/Modal";
import { Context } from "../../utils/Context";
import Input from "../../components/Input/Input";

export const parseGroups = (groups: string[]) => {};

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]); // State to store users
  const [categories, setCategories] = useState<CategoryType[]>([]); // State to store proposed categories

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(
    null
  );
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

  const {
    isAuth,
    handleLoginClick,
    isLoginClicked,
    isAddUser,
    handleAddUser,
    user,
    token,
  } = useContext(Context);

  const fetchUsers = async () => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.get("api/users");

      console.log("users", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.get("api/proposed_categories");

      console.log("categories", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // if (!isAuth) {
    //   handleLoginClick(true);
    //   return;
    // }
    fetchUsers();
    fetchCategories();
  }, [isAddUser, isLoginClicked]);

  // Users
  const handleDeleteClick = (user: UserType) => {
    if (!isAuth) {
      handleLoginClick(true);
      return;
    }
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteCategoryClick = (category: CategoryType) => {
    if (!isAuth) {
      handleLoginClick(true);
      return;
    }
    setCategoryToDelete(category);
    setShowDeleteCategoryModal(true);
  };

  const handleConfirmDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        const axiosAuthInstance = axiosAuth(token);
        await axiosAuthInstance.delete(
          `/api/proposed_categories/${categoryToDelete.slug}`
        );
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category.slug !== categoryToDelete.slug
          )
        );
        setShowDeleteCategoryModal(false);
        setCategoryToDelete(null);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  // Users
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        const axiosAuthInstance = axiosAuth(token);
        await axiosAuthInstance.delete(`/api/users/${userToDelete.username}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.username !== userToDelete.username)
        );
        setShowDeleteModal(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  // Common
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setShowDeleteCategoryModal(false);
    setUserToDelete(null);
    setCategoryToDelete(null);
  };

  return (
    <Page title="Manage Panel">
      <div className={classes.container}>
        <div style={{ flex: 1, borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}>
          <h2>About me</h2>
          <div>
            {user ? (
              <div className={classes.userInfo}>
                <p>
                  <strong>My ID:</strong> {user.id}
                </p>
                <p>
                  <strong>My Username:</strong> {user.username}
                </p>
                <p>
                  <strong>My Role:</strong>{" "}
                  {user.groups.map((group) => group).join(", ")}
                </p>
              </div>
            ) : (
              <p style={{ marginTop: "2rem", paddingBottom: "1rem" }}>
                No user information available.
              </p>
            )}
          </div>
        </div>
        {isAuth && user?.groups.includes("admin") && (
          <div style={{ flex: 1 }}>
            <div>
              <h2>All Users</h2>
              <div className={classes.userList}>
                {users.length === 0 ? (
                  <p>No users available.</p>
                ) : (
                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>

                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.username}>
                          <td>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
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
              <div style={{ flex: 1 }}>
                <h2>Manage Categories</h2>
                <div className={classes.userList}>
                  {categories.length === 0 ? (
                    <p>No categories available.</p>
                  ) : (
                    <table className={classes.table}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Slug</th>
                          <th>Parent</th>
                          <th>Children</th>

                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category.slug}>
                            <td>{category.name}</td>
                            <td>{category.slug}</td>
                            <td>{category.parent}</td>
                            <td>{category.children}</td>
                            <td>
                              <Icon
                                icon={icons.delete}
                                style={{ cursor: "pointer" }}
                                width={20}
                                onClick={() => handleDeleteCategoryClick(category)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

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
              Are you sure you want to delete this User?
            </span>
          </Modal>
        )}
        {showDeleteCategoryModal && (
          <Modal
            title="Confirm Delete"
            textOk="Delete"
            textCancel="Cancel"
            onSubmit={handleConfirmDelete}
            onClose={handleCancelDelete}
            iconName="delete"
          >
            <span className={classes.modalContainer}>
              Are you sure you want to reject this category?
            </span>
          </Modal>
        )}
      </div>
    </Page>
  );
};

export default Users;
