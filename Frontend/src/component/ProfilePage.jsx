import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { Person, Envelope, Telephone, GeoAlt, ShieldLock, Globe, Calendar } from "react-bootstrap-icons";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/user/profile", {
          withCredentials: true,
        });
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  if (!user) return <p className="text-center mt-5 text-danger">No profile data</p>;

  return (
    <div>
      <NavBar />
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="card shadow-lg border-0 rounded-4 p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="text-center mb-4">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="rounded-circle mx-auto"
                style={{ width: "90px", height: "90px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                style={{ width: "90px", height: "90px", fontSize: "40px" }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <h3 className="fw-bold mt-3">{user.name}</h3>
            <span className="badge bg-info text-dark px-3 py-2">{user.role}</span>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex align-items-center">
              <Envelope className="me-2 text-primary" />
              <strong>Email:</strong>
              <span className="ms-2">{user.email}</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <Telephone className="me-2 text-success" />
              <strong>Phone:</strong>
              <span className="ms-2">{user.phone || "Not provided"}</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <GeoAlt className="me-2 text-danger" />
              <strong>Address:</strong>
              <span className="ms-2">{user.address || "Not provided"}</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <GeoAlt className="me-2 text-warning" />
              <strong>City:</strong>
              <span className="ms-2">{user.city || "Not provided"}</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <Globe className="me-2 text-info" />
              <strong>Country:</strong>
              <span className="ms-2">{user.country || "Not provided"}</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <ShieldLock className="me-2 text-secondary" />
              <strong>Role:</strong>
              <span className="ms-2">{user.role}</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <Calendar className="me-2 text-dark" />
              <strong>Created At:</strong>
              <span className="ms-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </li>
            {/* <li className="list-group-item d-flex align-items-center">
              <Calendar className="me-2 text-dark" />
              <strong>Updated At:</strong>
              <span className="ms-2">
                {new Date(user.updatedAt).toLocaleDateString()}
              </span>
            </li> */}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;



