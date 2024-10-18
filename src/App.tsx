import Dashboard from "@components/Dashboard";
import HeroComponent from "@components/HeroComponent";
import Home from "@components/Home";
import ProtectedRoute from "@components/ProtectedRoute";
import Settings from "@components/Settings";
import WordList from "@components/WordList";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Organizations from "./components/Organizations";
import Users from "./components/Users";
function App() {
  return (
    <Router>
      <main className="flex h-screen flex-col bg-white dark:bg-darkBg">
        <div className="flex-grow overflow-hidden">
          <Routes>
            <Route path="/" element={<HeroComponent />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Home />} />
                <Route path="wordlist" element={<WordList />} />
                <Route path="users" element={<Users />} />
                <Route path="organizations" element={<Organizations />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </div>
        <ToastContainer />
      </main>
    </Router>
  );
}

export default App;
