import Button from "../../components/Button";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UserRole = () => {
  const jsonString: any = localStorage?.getItem("userdata");
  const user: any = JSON.parse(jsonString);
  const navigate = useNavigate();

  const handleAdmin = async () => {
    let reqOptions = {
      url: "http://localhost:3000/user/update-user-role",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        role: 1,
        user_id: user.user_id,
      }),
    };
    let response = await axios.request(reqOptions);
    if (response.data) {
      user.role = 1;
      localStorage?.setItem("userdata", JSON.stringify(user));
      navigate("/admin");
    } else {
    }
  };
  const handleUser = async () => {
    let reqOptions = {
      url: "http://localhost:3000/user/update-user-role",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        role: 0,
        user_id: user.user_id,
      }),
    };
    let response = await axios.request(reqOptions);
    if (response.data) {
      user.role = 0;
      localStorage?.setItem("userdata", JSON.stringify(user));
      navigate(`/user/${user.user_id}`);
    }
  };
  // if (user.role !== null) {
  //   navigate("/");
  //   return null;
  // }
  return (
    <main className="user-role">
      <figure>
        <img src={logo} alt="logo" />
      </figure>
      <h1>
        <span style={{ color: "#13A650" }}> Welcome {user.name}!</span> select
        user role and procude further
      </h1>
      <section>
        <Button title="Admin" background="#e74c3c" click={handleAdmin} />
        <Button title="User" background="#130F40" click={handleUser} />
      </section>
    </main>
  );
};

export default UserRole;
