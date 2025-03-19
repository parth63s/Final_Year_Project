import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

const Item = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [plans, setPlans] = useState([
    {
      id: 1,
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234-567-8900",
        address: "123 Main Street, Apt 4B, New York, NY 10001",
      },
      pickup: {
        restaurant: "Healthy Delights",
        address: "456 Restaurant Ave, New York, NY 10002",
        startTime: "10:00 AM",
        endTime: "10:30 AM",
      },
      delivery: {
        time: "11:00 AM",
        status: "pending",
      },
      subscription: {
        type: "Monthly Premium",
        days: ["Monday", "Wednesday", "Friday"],
      },
      mapUrl: "https://maps.google.com/?q=40.7128,-74.0060",
    },
    {
      id: 2,
      customer: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 234-567-8901",
        address: "789 Park Avenue, New York, NY 10003",
      },
      pickup: {
        restaurant: "Fresh Foods",
        address: "321 Food Street, New York, NY 10004",
        startTime: "11:30 AM",
        endTime: "12:00 PM",
      },
      delivery: {
        time: "12:30 PM",
        status: "in_progress",
      },
      subscription: {
        type: "Weekly Standard",
        days: ["Tuesday", "Thursday"],
      },
      mapUrl: "https://maps.google.com/?q=40.7128,-74.0060",
    },
  ]);

  const updateDeliveryStatus = (id) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              delivery: {
                ...plan.delivery,
                status:
                  plan.delivery.status === "pending"
                    ? "in_progress"
                    : "completed",
              },
            }
          : plan
      )
    );
  };

  return (
    <div className="container delivery-margin mt-4">
      {plans.map((plan) => (
        <div key={plan.id} className="card mb-3 p-3 shadow">
          {/* <div className="card-body"> */}
            <div className="row">
              {/* Customer Details */}
              <div className="col-md-4">
                <h5>Customer Details</h5>
                <p>
                    <PersonIcon/>
                    {plan.customer.name} <br />
                    <small>Customer Name</small>
                </p>
                <p>
                  <PhoneIcon /> {plan.customer.phone} <br />
                  <small>Phone Number</small>
                </p>
                <p>
                  <EmailIcon /> {plan.customer.email} <br />
                  <small>Email</small>
                </p>
                <p>
                  <LocationOnIcon /> {plan.customer.address} <br />
                  <small>Delivery Address</small>
                </p>
              </div>

              {/* Delivery Schedule */}
              <div className="col-md-4">
                <h5>Delivery Schedule</h5>
                <p>
                  <LocationOnIcon /> {plan.pickup.restaurant} <br />
                  <small>{plan.pickup.address}</small>
                </p>
                <p>
                  <AccessTimeIcon /> Pickup: {plan.pickup.startTime} -{" "}
                  {plan.pickup.endTime} <br />
                  <small>Delivery: {plan.delivery.time}</small>
                </p>
                <p>
                  <DeliveryDiningIcon /> {plan.subscription.type} <br />
                  <small>Days: {plan.subscription.days.join(", ")}</small>
                </p>
              </div>

              {/* Map & Actions */}
              <div className="col-md-4 text-center">
                <h5>Route & Actions</h5>
                <iframe
                  src={plan.mapUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title={`Map-${plan.id}`}
                ></iframe>
                <div className="mt-3 d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-primary"
                    disabled={!isOnline || plan.delivery.status === "completed"}
                    onClick={() => updateDeliveryStatus(plan.id)}
                  >
                    {plan.delivery.status === "pending"
                      ? "Start Delivery"
                      : plan.delivery.status === "in_progress"
                      ? "Mark Delivered"
                      : "Delivered"}
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => window.open(plan.mapUrl, "_blank")}
                  >
                    Open Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        // </div>
      ))}
    </div>
  );
};

export default Item;
