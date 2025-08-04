//otettu react-router käyttöön 25.6. selkeyttääkseni rakennetta, kun alan tekemään ulkoasua

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CalendarPage from "./pages/CalendarPage";
// import AdminPage from "./pages/AdminPage";
// import Navbar from "./components/Navbar";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//   <Route path="/" element={<CalendarPage />} />
//   <Route path="/calendar" element={<CalendarPage />} /> 
//   <Route path="/admin" element={<AdminPage />} />
// </Routes>
//     </Router>
//   );
// }

// export default App;



// uusi missä GDPR 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted py-3 mt-auto">
  <small>
    Tämä palvelu noudattaa tietosuojakäytäntöjä.
  </small>
</footer>

      </div>
    </Router>
  );
}

export default App;
