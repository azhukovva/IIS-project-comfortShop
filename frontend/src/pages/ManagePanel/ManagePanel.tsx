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
  get,
  OrderType,
  ProposedCategoryType,
  RatingType,
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
import Popup from "../../components/Popup/Popup";

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
  const [categories, setCategories] = useState<ProposedCategoryType[]>([]); // State to store proposed categories
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [ratings, setRatings] = useState<RatingType[]>([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const {
    isAuth,
    handleLoginClick,
    isLoginClicked,
    isAddUser,
    handleAddUser,
    user,
    setUser,
    token,
  } = useContext(Context);

  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);

  // const [categoryToDelete, setCategoryToDelete] =
  //   useState<ProposedCategoryType | null>(null);

  const [categoryToDelete, setCategoryToDelete] =
    useState<ProposedCategoryType | null>(null);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

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
    fetchOrders();
    fetchRatings();
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

  const handleDeleteCategoryClick = (category: ProposedCategoryType) => {
    if (!isAuth) {
      handleLoginClick(true);
      return;
    }
    setCategoryToDelete(category);
    setShowDeleteCategoryModal(true);
    fetchCategories();
    setShowPopupDelete(true);
    setTimeout(() => {
      setShowPopupDelete(false);
    }, 2000);
  };

  const handleConfirmDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        const axiosAuthInstance = axiosAuth(token);
        await axiosAuthInstance.delete(
          `/api/proposed_categories/${categoryToDelete.id}/`
        );
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category.id !== categoryToDelete.id
          )
        );
        setShowDeleteCategoryModal(false);
        setCategoryToDelete(null);
      } catch (error) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2000);
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
      setShowPopupSuccess(true);
      setTimeout(() => {
        setShowPopupSuccess(false);
      }, 2000);
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
      console.error("Failed to promote:", error);
    }
  };

  const onPomoteModerator = async (id: string) => {
    if (!user) {
      handleLoginClick(true);
      return;
    }
    try {
      const axiosAuthInstance = axiosAuth(token);
      console.log("USER", user);
      const response = await axiosAuthInstance.post(
        `/api/users/${id}/promote_to_moderator/`
      );
      console.log("Promoted to moderator:", response.data);
      setShowPopupSuccess(true);
      setTimeout(() => {
        setShowPopupSuccess(false);
      }, 2000);
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
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
      fetchCategories();
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
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
        setShowPopupDelete(true);
        setTimeout(() => {
          setShowPopupDelete(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleDeleteRatingClick = async (id: number) => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.delete(`/api/rating/${id}/`);
      fetchRatings();
      setShowPopupDelete(true);
      setTimeout(() => {
        setShowPopupDelete(false);
      }, 2000);
      console.log("Rating deleted:", response.data);
    } catch (error) {
      console.error("Failed to delete rating:", error);
    }
  };

  const linkToProduct = async (id: number) => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.get(`api/products/${id}`);
      const product = response.data;
      const category = product.category;
      if (product !== null && category !== null)
        navigate(`/categories/${category}/product/${id}`);
    } catch (error) {
      console.error("Failed to link to product:", error);
    }
  };

  // Common
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setShowDeleteCategoryModal(false);
    setUserToDelete(null);
    setCategoryToDelete(null);
  };

  const handleSaveUser = async () => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      await axiosAuthInstance.put(`/api/users/me/`, {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
      });
      const me: any = await axiosAuthInstance.get(`/api/users/me/`);
      console.log("ME", me);
      setUser(me.data);
      setIsEdit(false);
      setShowPopupSave(true);
      setTimeout(() => {
        setShowPopupSave(false);
      }, 2000);
      // Reset input fields to initial state
      // setUsername(user?.username || "");
      // setEmail(user?.email || "");
      // setFirstName(user?.first_name || "");
      // setLastName(user?.last_name || "");
    } catch (error) {
      console.error("Failed to edit user:", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  // Editing User Information
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastName(value);
  };

  const fetchRatings = async () => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const response = await axiosAuthInstance.get(`api/rating`);

      console.log("ratings", response.data);
      const allRatings = response.data;
      if (user) {
        const myRatings = allRatings.filter(
          (rating: RatingType) => rating.user === user?.id
        );
        console.log("myRatings", myRatings);
        setRatings(myRatings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Manage Panel">
      {showPopupSuccess && <Popup text="Success!" />}
      {showPopupSave && <Popup text="Saved!" />}
      {showPopupDelete && <Popup text="Deleted!" isDelete />}
      {showError && (
        <Popup text="Something went wrong! Please, try again" isError />
      )}
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
                  <p>
                    <strong>You can call me:</strong>
                    <div>
                      {user.first_name} {user.last_name}
                    </div>
                  </p>
                </div>

                <div className={classes.buttons}>
                  <div>
                    {" "}
                    <Button
                      onClick={
                        isEdit ? handleSaveUser : () => setIsEdit(!isEdit)
                      }
                      isActive
                    >
                      {isEdit ? "Save" : "Edit Profile"}
                    </Button>
                  </div>

                  <Button onClick={() => navigate("/orders")} isActive>
                    My Orders
                  </Button>
                </div>
                {isEdit && (
                  <div className={classes.edit}>
                    <Input
                      labelText="Username"
                      placeholder="Change my Username"
                      name="username"
                      value={username}
                      onChange={handleInputChange}
                    />
                    <Input
                      labelText="Email"
                      placeholder="Change my Email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                    <Input
                      labelText="First Name"
                      placeholder="Change my First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleInputChange}
                    />
                    <Input
                      labelText="Last Name"
                      placeholder="Change my Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
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

        {(parseGroups(user?.groups || []).includes("admin") || parseGroups(user?.groups || []).includes("moderator")) && (
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
                              <Button
                                isActive
                                onClick={() => onPomoteModerator(user.id)}
                              >
                                Moderator
                              </Button>
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
                        <th>Approve Category</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.name}</td>
                          <td>{category.slug}</td>
                          <td>{category.parent}</td>
                          <td>
                            <Button
                              iconName="user"
                              onClick={() => handleApproveCategory(category.id)}
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
        <div style={{ maxHeight: "38vh", overflowY: "auto" }}>
          <h2>Manage My Ratings</h2>
          <div className={classes.userList}>
            {ratings.length === 0 ? (
              <p>No ratings available.</p>
            ) : (
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>My Rate</th>
                    <th>Description</th>
                    <th>Product</th>

                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((rating) => (
                    <tr key={rating.user}>
                      <td>{rating.rating}</td>
                      <td>{rating.title}</td>
                      <td onClick={() => linkToProduct(rating.product)}>
                        <div
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "1rem",
                            border: "1px solid rgba(0, 0, 0, 0.3) ",
                            padding: ".5rem 1.5rem",
                            width: "fit-content",
                          }}
                        >
                          {rating.product}
                        </div>
                      </td>

                      <td>
                        <Icon
                          icon={icons.delete}
                          style={{ cursor: "pointer" }}
                          width={20}
                          onClick={() => handleDeleteRatingClick(rating.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
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
              Are you sure you want to delete this User?
            </span>
          </Modal>
        )}
        {showDeleteCategoryModal && (
          <Modal
            title="Confirm Delete"
            textOk="Delete"
            textCancel="Cancel"
            onSubmit={handleConfirmDeleteCategory}
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
