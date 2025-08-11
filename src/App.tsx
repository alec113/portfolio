import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const Layout = () => (
    <div className="bg-white">
      <Navbar />
      <div className="min-h-screen m-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="/projects"
            element={<Projects />}
          />
          <Route
            path="/projects/:project"
            element={<ProjectDetails />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
