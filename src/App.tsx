import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Organizations from "./components/Organizations";
import Settings from "@components/Settings";
import Dashboard from "@components/Dashboard";
import HeroComponent from "@components/HeroComponent";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-darkBg overflow-hidden">
        <main className="">
          <Routes>
            <Route path="/" element={<HeroComponent />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="home" element={<Users />} />
              <Route path="wordlist" element={<Users />} />
              <Route path="users" element={<Users />} />
              <Route path="organizations" element={<Organizations />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
