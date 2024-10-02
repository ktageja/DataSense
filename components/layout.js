import Footer from "./footer";
import Sidebar from "./sidebar";
import Header from "./header";
import { createContext, useEffect, useState } from "react";
import config from "@/pages/api/config.json";

// Create Contexts for Realtime Data and Theme
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
      console.log("Received realtime data", newData);
      setRealtimeData(newData);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <RealtimeDataContext.Provider value={realtimeData}>
        <div className="layout">
          <Header />
          <div className="content-area d-flex">
            {" "}
            {/* Added d-flex for layout */}
            <Sidebar />
            <main className="main-content flex-grow-1">
              {" "}
              {/* Main content takes available space */}
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </RealtimeDataContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Layout;
