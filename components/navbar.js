import Link from "next/link";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import Script from "next/script";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: sessionData, status: sessionStatus } = useSession();

  console.log({ sessionData, sessionStatus });
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Hamburger Icon moved to the left */}
        {sessionData && (
          <button onClick={() => signOut("google")}>Log out</button>
        )}
        <button
          className="navbar-toggler order-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Username stays in the top right */}
        <div className="ms-auto order-lg-2 d-flex">
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-1">
              <Link href="/login" className="nav-link">
                <i className="fas fa-user me-1"></i> {sessionData?.user.name}
              </Link>
            </li>
          </ul>
        </div>

        {/* Offcanvas (pop-out sidebar) for collapsed navigation */}
        <div
          className="offcanvas offcanvas-start"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Data-Sense
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {/* Sidebar Menu Items */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  <i className="fas fa-home me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link">
                  <i className="fas fa-user-circle me-1"></i> Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/devices" className="nav-link">
                  <i className="fas fa-laptop me-1"></i> Your Devices
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/notifications" className="nav-link">
                  <i className="fa fa-bell me-1"></i> Notifications
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/data" className="nav-link">
                  <i className="fas fa-database me-1"></i> Your Data
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard" className="nav-link">
                  <i className="fa-sharp fa-solid fa-table-columns me-1"></i>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/settings" className="nav-link">
                  <i className="fas fa-cog me-1"></i> Settings
                </Link>
              </li>
              <li className="nav-item mt-auto">
                <Link href="/logout" className="nav-link">
                  <i className="fas fa-sign-out-alt me-1"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
