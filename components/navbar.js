import { FiBell, FiUser } from "react-icons/fi";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import { userAtom } from "../store/store";
import { useAtom } from "jotai";
import { removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    setUser(undefined);
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Right-aligned section */}
        <div className="collapse navbar-collapse d-flex justify-content-end">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {/* Search bar */}
            <form className="d-flex me-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </form>

            {/* Notification Icon */}
            <li className="nav-item">
              <FiBell size={24} className="me-3" />
            </li>

            {/* User Icon and Login Link */}
            <li className="nav-item d-flex align-items-center">
              <FiUser size={24} className="me-2" />
              {user ? (
                <a
                  className="nav-link"
                  style={{
                    border: "1px solid blue",
                    color: "blue",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </a>
              ) : (
                <Link href="/login" legacyBehavior>
                  <a
                    className="nav-link"
                    style={{
                      border: "1px solid blue",
                      color: "blue",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Login
                  </a>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
