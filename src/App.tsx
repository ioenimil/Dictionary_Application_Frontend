import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/HeroComponent";
import Users from "./components/Users";
import Organizations from "./components/Organizations";
import Settings from "@components/Settings";
import Dashboard from "@components/Dashboard";


function App() {
  return (
    <Router>
      <main className="h-screen w-screen bg-white dark:bg-darkBg">
        <Routes>
          {/* Route for Hero Component */}
          <Route path="/" element={<Hero />} />

          {/* Nested Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Users />} />
            <Route path="wordlist" element={<Users />} />
            <Route path="users" element={<Users />} />
            <Route path="organizations" element={<Organizations/>} />
            <Route path="settings" element={<Settings/>} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
