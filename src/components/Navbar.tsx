import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (location.pathname !== "/") return;

    if (!location.hash) {
      setActiveSection("about");
    }

    const sections = ["about", "skills", "experience", "projects"];
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const hash = location.hash.replace("#", "");
    if (hash && sections.includes(hash)) {
      setActiveSection(hash);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [location.pathname, location.hash]);

  const getActiveLink = () => {
    if (location.pathname === "/projects") return "projects";
    return location.pathname === "/" ? activeSection : "about";
  };

  const navLinks = [
    { name: "About Me", id: "about", href: "/#about" },
    { name: "Skills", id: "skills", href: "/#skills" },
    { name: "Experience", id: "experience", href: "/#experience" },
    { name: "Projects", id: "projects", href: "/projects" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20 py-2 md:px-20">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div>
          <p className="text-4xl px-5 md:text-5xl text-primary font-extrabold">
            {"< / >"}
          </p>
        </div>
        <ul className="sm:flex items-center justify-center hidden py-4 gap-4 sm:text-sm md:gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`font-medium cursor-pointer p-2 rounded-lg transition-colors ${
                getActiveLink() === link.id
                  ? "bg-primary text-white"
                  : "hover:text-primary"
              }`}
            >
              <a
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault();
                    if (location.pathname !== "/") {
                      navigate("/");
                      setTimeout(() => {
                        const element = document.getElementById(link.id);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 100);
                    } else {
                      const element = document.getElementById(link.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        {!isMenuOpen && (
          <div className="flex items-center justify-end px-4 py-2 md:hidden">
            <svg
              onClick={toggleMenu}
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 30 30"
              className="cursor-pointer"
            >
              <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
            </svg>
          </div>
        )}
        {isMenuOpen && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-screen bg-light-primary/95 h-screen top-0 z-[100] backdrop-blur-md"
          >
            <div className="flex items-center justify-end px-4 py-2 md:hidden">
              <svg
                onClick={toggleMenu}
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 50 50"
                className="cursor-pointer"
              >
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-center h-full gap-15 text-lg">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`cursor-pointer transition-colors ${
                    getActiveLink() === link.id
                      ? "text-white bg-primary p-2 rounded-lg"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      toggleMenu();
                      if (link.href.startsWith("/#")) {
                        e.preventDefault();
                        if (location.pathname !== "/") {
                          navigate("/");
                          setTimeout(() => {
                            const element = document.getElementById(link.id);
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 100);
                        } else {
                          const element = document.getElementById(link.id);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
