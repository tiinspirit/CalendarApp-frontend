// import React, { useState, useEffect } from "react";
// import AdminPanel from "../components/AdminPanel";

// const AdminPage = () => {
//   const [registrations, setRegistrations] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/auth/me", { credentials: "include" })
//       .then(res => res.json())
//       .then(data => setUser(data))
//       .catch(err => console.error("Virhe käyttäjätiedoissa:", err));
//   }, []);

//   useEffect(() => {
//     if (user?.isAdmin) {
//       fetch("http://localhost:5000/registrations", { credentials: "include" })
//         .then(res => res.json())
//         .then(data => setRegistrations(data))
//         .catch(err => console.error("Virhe ilmoittautumisissa:", err));
//     }
//   }, [user]);

//   if (user === null) return <p>Ladataan...</p>;
//   if (!user.isAdmin) return <p>Ei pääsyä.</p>;

//   return (
//     <div className="container mt-4">
//       <h2>Admin-paneeli</h2>
//       <AdminPanel registrations={registrations} show={true} toggle={() => {}} />
//     </div>
//   );
// };

// export default AdminPage;

import React, { useEffect, useState } from "react";
import AdminPanel from "../components/AdminPanel";


const AdminPage = () => {
  const [registrations, setRegistrations] = useState([]);
const [showPanel, setShowPanel] = useState(true);

  useEffect(() => {
    // Hakee ilmoittautumiset backendistä
    fetch("http://localhost:5000/registrations", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setRegistrations(data);
      })
      .catch(err => {
        console.error("Virhe haettaessa ilmoittautumisia:", err);
      });
  }, []);

  

  return (
    <div className="container mt-4">
      <h2>Admin-sivu</h2>
      {/* Viedään ilmoittautumiset AdminPaneliin propsina/chatGPT */}
      
     <button onClick={() => setShowPanel(!showPanel)}>
  {showPanel ? "Piilota ilmoittautumiset" : "Näytä ilmoittautumiset"}
</button> 
{/* nappi jäi aiemmasta, kun admin-paneeli oli osa kalenterinäkymää, jätän tähän jos tarvitsen vielä */}

{showPanel && (
  <AdminPanel registrations={registrations} show={true} />
)}
    </div>
  );
};

export default AdminPage;
