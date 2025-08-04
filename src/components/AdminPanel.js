import React from 'react';

const AdminPanel = ({ registrations, show, toggle }) => {
  console.log("AdminPanel näkyy", registrations.length);

  if (!registrations || registrations.length === 0) return <p>Ei ilmoittautumisia</p>;
  if (!show) return null;

  return (
    <div style={{ marginTop: "40px" }}>
      

      <h3>Ilmoittautumiset</h3>
      


        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc" }}>Tapahtuma</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Käyttäjä</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Toimipaikka</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Aika</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r._id}>
                <td>{r.eventId?.title}</td>
                <td>{r.userId?.name}</td>
                <td>{r.location || "-"}</td>
                <td>{new Date(r.createdAt).toLocaleString("fi-FI")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default AdminPanel;