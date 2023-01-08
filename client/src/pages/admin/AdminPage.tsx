import "./admin.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import {
  FaRegListAlt,
  FaUsers,
  FaTasks,
  FaUserCircle,
  FaSearch,
  FaTrash,
  FaUserEdit,
} from "react-icons/fa";
import {
  RiDashboardFill,
  RiBarChartFill,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AdminPage = () => {
  const navigate = useNavigate();
  const jsonString: any = localStorage?.getItem("userdata");
  const user: any = JSON.parse(jsonString);
  if (user?.role !== 1) {
    return <h1>Unauthorized</h1>;
  }
  const [users, setUsers] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const fetchUser = async () => {
    let reqOptions = {
      url: "http://localhost:3000/user/get-users",
      method: "GET",
    };
    let response = await axios.request(reqOptions);
    setUsers(response.data.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const onSearchUser = (e: any) => {
    setSearchValue(e.target.value);
    setUsers(
      [...users].filter((user) =>
        user.name?.toLowerCase().includes(searchValue?.toLowerCase())
      )
    );
  };
  const onClearSearch = (e: any) => {
    if (searchValue.length < 1 && e.key === "Backspace") {
      fetchUser();
    }
  };
  const editUser = (data: any) => {
    navigate(`/user/${data.user_id}`);
  };
  const deleteUser = async (data: any) => {
    let reqOptions = {
      url: `http://localhost:3000/user/delete-user/${data.user_id}`,
      method: "DELETE",
    };

    let response = await axios.request(reqOptions);
    if (response?.data?.data?.length) {
      setUsers(response.data.data);
      toast.success("User deleted succesfully!");
    } else toast.error("Error in deleting user");
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="Admin">
      <nav>
        <figure>
          <img src={logo} alt="logo" />
        </figure>
        <section className="nav-center">
          <input
            type="text"
            placeholder="search by name"
            value={searchValue}
            onChange={onSearchUser}
            onKeyUp={onClearSearch}
          />
          <FaSearch className="search-icon" />
        </section>
        <section className="nav-end">
          <div className="user-name">
            <FaUserCircle className="user-icon" />

            <h2> {user.name}</h2>
          </div>
        </section>
      </nav>
      <div className="admin-container">
        <aside>
          <ul>
            <li style={{ color: "steelblue" }}>
              <RiDashboardFill /> <span>Dashboard</span>
            </li>
            <li>
              <FaRegListAlt /> <span>Product</span>
            </li>
            <li>
              <FaUsers />
              <span>Teams</span>
            </li>
            <li>
              <FaTasks />
              <span>Order list</span>
            </li>
            <li>
              <RiBarChartFill />
              <span>Stock</span>
            </li>

            <li onClick={logout}>
              <RiLogoutBoxRLine /> <span>Logout</span>
            </li>
          </ul>
        </aside>
        <section className="content">
          {!users.length ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "10rem",
                fontSize: "2rem",
                color: "gray",
              }}
            >
              NO records found
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th>Mobile</th>
                  <th>Occupation</th>
                  <th>State</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.user_id}>
                    <td>{i + 1}</td>
                    <td>{user.name ?? "--"}</td>
                    <td>{user.email ?? "--"}</td>
                    <td>{user.dob ?? "--"}</td>
                    <td>{user.mobile ?? "--"}</td>
                    <td>{user.occupation ?? "--"}</td>
                    <td>{user.state ?? "--"}</td>
                    <td>{user.role == 0 ? "user" : "admin"}</td>
                    <td>
                      <div className="action">
                        <FaTrash
                          className="trash"
                          onClick={() => deleteUser(user)}
                        />
                        <FaUserEdit
                          className="edit"
                          onClick={() => editUser(user)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
