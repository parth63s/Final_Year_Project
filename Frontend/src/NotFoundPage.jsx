import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function NotFoundPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light position-relative px-3">
      
      {/* Big 404 */}
      <h1 className="display-1 fw-bold text-primary">404</h1>
      
      {/* Subtitle */}
      <h2 className="fw-semibold text-dark mb-3">Page Not Found</h2>
      
      {/* Description */}
      <p className="text-muted fs-5 mb-4">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>
      
      {/* Home Button */}
      <Link to="/" className="btn btn-primary btn-lg d-flex align-items-center gap-2 shadow">
        <FaHome size={20} /> Go Back Home
      </Link>

      {/* Decorative Circles */}
      <div className="position-absolute top-0 start-0 translate-middle bg-primary rounded-circle opacity-25" style={{ width: "200px", height: "200px" }}></div>
      <div className="position-absolute bottom-0 end-0 translate-middle bg-info rounded-circle opacity-25" style={{ width: "250px", height: "250px" }}></div>
    </div>
  );
}
