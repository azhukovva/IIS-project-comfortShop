import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Page from "../../components/Page/Page";
import {
  axiosAuth,
  CategoryType,
  get,
  OrderType,
  UserType,
} from "../../utils/axios";

import classes from "./ManagePanel.module.css";
import Button from "../../components/Button/Button";
import axios from "axios";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import Modal from "../../components/Modal/Modal";
import { Context } from "../../utils/Context";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

export const parseGroups = (groups: string[]): string[] => {
  const groupMap: { [key: string]: string } = {
    "1": "admin",
    "2": "moderator",
    "3": "entrepreneur",
    "4": "user",
  };
  return groups.map((group) => groupMap[group] || "unknown");
};

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]); // State to store users
  const [categories, setCategories] = useState<CategoryType[]>([]); // State to store proposed categories
  const [orders, setOrders] = useState<OrderType[]>([]);

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

  const navigate = useNavigate();

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

  const fetchOrders = async () => {
    try {
      const response = await get("api/orders");

      console.log("orders", response.data);
      setOrders(response.data);
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

  const onPomoteSeller = async (id: string) => {
    if (!user) {
      handleLoginClick(true);
      return;
    }
    try {
      const axiosAuthInstance = axiosAuth(token);
      console.log("USER", user);
      const response = await axiosAuthInstance.post(
        `/api/users/${id}/promote_to_entrepreneur/`
      );
      console.log("Promoted to seller:", response.data);
    } catch (error) {
      console.error("Failed to promote:", error);
    }
  };

  const handleApproveCategory = async (id: string) => {
    if (!user) {
      handleLoginClick(true);
      return;
    }
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.post(
        `/api/proposed_categories/${id}/approve/`
      );
      console.log("Category approved:", response.data);
    } catch (error) {
      console.error("Failed to approve category:", error);
    }
  };

  // Users
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        const axiosAuthInstance = axiosAuth(token);
        await axiosAuthInstance.delete(`/api/users/${userToDelete.id}/`);
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
      <div className={classes.rowTop}>
        <Button isBack isActive onClick={() => navigate(-1)}>
          <Icon icon={icons.left} width={20} />
        </Button>
      </div>
      <div className={classes.container}>
        <div style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}>
          <h2>About me</h2>
          <div style={{ display: "flex", gap: "3rem" }}>
            {user ? (
              <div className={classes.userInfo}>
                <div>
                  <p>
                    <strong>My ID:</strong> {user.id}
                  </p>
                  <p>
                    <strong>My Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>My Role:</strong>
                    <div>{parseGroups(user.groups).join(", ")}</div>
                  </p>
                </div>

                <div className={classes.orders}>
                  <Button
                    onClick={() => navigate(`/orders/${user.id}`)}
                    isActive
                  >
                    My Orders
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ paddingBottom: "2rem" }}>
                <p style={{ marginTop: "2rem", paddingBottom: "1rem" }}>
                  No user information available.
                </p>
                <Button onClick={() => handleLoginClick(true)} isActive>
                  Log In
                </Button>
              </div>
            )}
          </div>
        </div>

        {parseGroups(user?.groups || []).includes("admin") && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div style={{ maxHeight: "38vh", overflowY: "auto" }}>
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
                        <th>Promotion</th>
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
                            <div style={{ display: "flex", gap: "1rem" }}>
                              <Button
                                isActive
                                onClick={() => onPomoteSeller(user.id)}
                              >
                                Entrepreneur
                              </Button>
                              <Button isActive>Moderator</Button>
                            </div>
                          </td>
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
            </div>
            {/* // */}

            <div style={{ maxHeight: "38vh", overflowY: "auto" }}>
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
                        <th>Approve Category</th>
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
                            <Button
                              iconName="user"
                              onClick={() => handleApproveCategory(category.slug)} //TODO - id?
                            >
                              Approve
                            </Button>
                          </td>
                          <td>
                            <Icon
                              icon={icons.delete}
                              style={{ cursor: "pointer" }}
                              width={20}
                              onClick={() =>
                                handleDeleteCategoryClick(category)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div style={{ maxHeight: "38vh", overflowY: "auto" }}>
              <h2>Manage Orders</h2>
              <div className={classes.userList}>
                {orders.length === 0 ? (
                  <p>No orders available.</p>
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
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          <td>{order.id}</td>
                          <td>{order.user.username}</td>
                          <td>{order.products.map((product) => product.id)}</td>
                          <td>{order.total_price}</td>
                          <td>{order.city}</td>
                          <td>{order.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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
