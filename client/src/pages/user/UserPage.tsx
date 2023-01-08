import "./user.css";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { RiLogoutBoxRLine } from "react-icons/ri";

const UserPage = () => {
  const navigate = useNavigate();
  const jsonString: any = localStorage?.getItem("userdata");
  const user: any = JSON.parse(jsonString);
  const [initialValues, setInitialValues] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      let reqOptions: any = {
        url: `http://localhost:3000/user/get-user/${id}`,
        method: "GET",
      };
      let response = await axios.request(reqOptions);
      if (response.data) {
        setInitialValues({
          name: response.data.data[0].name,
          email: response.data.data[0].email,
          dob: response.data.data[0].dob,
          mobile: response.data.data[0].mobile,
          occupation: response.data.data[0].occupation,
          state: response.data.data[0].state,
          district: response.data.data[0].district,
          nationality: response.data.data[0].nationality,
          empno: response.data.data[0].empno,
          user_id: response.data.data[0].user_id,
          role: response.data.data[0].role,
        });
      }
    })();
  }, [id]);
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return initialValues ? (
    <div className="user-page">
      <nav>
        <figure>
          <img src={logo} alt="logo" />
        </figure>

        <section className="nav-end">
          <div className="user-name">
            <FaUserCircle className="user-icon" />
            <h2> {user?.name}</h2>
          </div>
          <div className="logout">
            <RiLogoutBoxRLine onClick={logout} />
          </div>
        </section>
      </nav>
      <div className="main">
        <div className="container">
          <header>Registration</header>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async (values) => {
              let reqOptions: any = {
                url: "http://localhost:3000/user/update-user",
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                data: JSON.stringify(values),
              };
              let response = await axios.request(reqOptions);
              if (response.data) {
                toast.success("Success!");
                if (user.role == 1) {
                  navigate("/admin");
                }
              } else {
                toast.error("Error in Submition!");
              }
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="form first">
                  <div className="details personal">
                    <span className="title">Personal Details</span>

                    <div className="fields">
                      <div className="input-field">
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          required
                        />
                      </div>

                      <div className="input-field">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          placeholder="Enter birth date"
                          name="dob"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dob}
                        />
                      </div>

                      <div className="input-field">
                        <label>Email</label>
                        <input
                          type="text"
                          placeholder="Enter your email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          required
                        />
                      </div>

                      <div className="input-field">
                        <label>Mobile Number</label>
                        <input
                          type="number"
                          placeholder="Enter mobile number"
                          name="mobile"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mobile}
                        />
                      </div>

                      <div className="input-field">
                        <label>Employee number</label>
                        <input
                          type="number"
                          placeholder="Enter employee number"
                          name="empno"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.empno}
                        />
                      </div>

                      <div className="input-field">
                        <label>Occupation</label>
                        <input
                          type="text"
                          placeholder="Enter your ccupation"
                          name="occupation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.occupation}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="details ID">
                    <span className="title">Address Details</span>

                    <div className="fields">
                      <div className="input-field">
                        <label>State</label>
                        <input
                          type="text"
                          placeholder="Enter your state"
                          name="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.state}
                        />
                      </div>

                      <div className="input-field">
                        <label>District</label>
                        <input
                          type="text"
                          placeholder="Enter your district"
                          name="district"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.district}
                        />
                      </div>

                      <div className="input-field">
                        <label>Nationality</label>
                        <input
                          type="text"
                          placeholder="Enter nationality"
                          name="nationality"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nationality}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="sumbit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  ) : (
    <span>loading...</span>
  );
};

export default UserPage;
