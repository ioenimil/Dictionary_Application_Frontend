import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Organizations from "./components/Organizations";
import Settings from "@components/Settings";
import Dashboard from "@components/Dashboard";
import HeroComponent from "@components/HeroComponent";
import Home from "@components/Home";
import WordList from "@components/WordList";
import ProtectedRoute from "@components/ProtectedRoute";

function App() {
  return (
    <Router>
      <main className="h-screen bg-white dark:bg-darkBg flex flex-col">
        <div className="flex-grow overflow-hidden">
          <Routes>
            <Route path="/" element={<HeroComponent />} />
            <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />}/>
              <Route path="wordlist" element={<WordList />} />
              <Route path="users" element={<Users />} />
              <Route path="organizations" element={<Organizations />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            </Route>
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
