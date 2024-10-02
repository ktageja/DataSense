import Navbar from "./navbar";
import Footer from "./footer";
import { createContext, useContext, useEffect, useState } from "react";
import config from "@/pages/api/config.json";

// import "bootstrap/dist/css/bootstrap.min.css";
export const RealtimeDataContext = createContext(null);
export const ThemeContext = createContext(null);

const Layout = ({ children }) => {
  const [realtimeData, setRealtimeData] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket(config.ws_api);

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log("Received realtim data", newData);
      setRealtimeData(newData);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <RealtimeDataContext.Provider value={realtimeData}>
          <Navbar />
          {/* <button
            onClick={() =>
              setTheme((prev) => {
                if (prev === "light") {
                  return "dark";
                }
                return "light";
              })
            }
          >
            Theme: {theme}
          </button> */}
          <main>{children}</main>
          <Footer />
        </RealtimeDataContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};

export default Layout;
