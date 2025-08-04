// // import React from "react";
// // import Calendar from "./Calendar";

// // const CalendarPage = () => {
// //   return (
// //     <div className="card shadow-sm">
// //       <div className="card-body">
// //         <Calendar />
// //       </div>
// //     </div>
// //   );
// // };

// // export default CalendarPage;

// //otettu react-router käyttöön 25.6. selkeyttääkseni rakennetta, kun alan tekemään ulkoasua

// import React, { useState } from "react";
// import Calendar from "../Calendar"; 
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";


// const CalendarPage = () => {
//   const [selectedEvent, setSelectedEvent] = useState(null);

// // function App() {
// //   const [selectedEvent, setSelectedEvent] = useState(null);

//   return (
//     <div className="container-fluid mt-4">
//       <div className="row">
//         {/* Kalenteri vasemmalle */}
//         <div className="col-md-8">
//           <Calendar setSelectedEvent={setSelectedEvent} />
//         </div>

//         {/* Ilmoittautuminen oikealle */}
//         <div className="col-md-4">
//           {selectedEvent ? (
//             <div className="card p-3 shadow-sm">
//               <h4>{selectedEvent.title}</h4>
//               <p>
//                 <strong>Aika:</strong>{" "}
//                 {new Date(selectedEvent.start).toLocaleString()} –{" "}
//                 {new Date(selectedEvent.end).toLocaleString()}
//               </p>

//               <form>
//                 <div className="mb-3">
//                   <label className="form-label">Nimi</label>
//                   <input type="text" className="form-control" required />
//                 </div>
//                 <button className="btn btn-primary" type="submit">
//                   Ilmoittaudu
//                 </button>
//                 <button
//                   className="btn btn-secondary ms-2"
//                   type="button"
//                   onClick={() => setSelectedEvent(null)}
//                 >
//                   Peruuta
//                 </button>
//               </form>
//             </div>
//           ) : (
//             <div className="text-muted">Valitse tapahtuma kalenterista</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CalendarPage;


import React, { useState } from "react";
import Calendar from "../Calendar";

const CalendarPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="container mt-4">
      <Calendar setSelectedEvent={setSelectedEvent} />
    </div>
  );
};

export default CalendarPage;