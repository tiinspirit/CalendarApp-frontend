//importit
import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fi } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventComponent from "./components/eventComponent";
import 'bootstrap/dist/css/bootstrap.min.css';



//constit on monet
const locales = {
  fi: fi,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: fi }),
  getDay,
  locales,
});

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [user, setUser] = useState(null); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [location, setLocation] = useState("");
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [description, setDescription] = useState(""); 
const [currentDate, setCurrentDate] = useState(new Date());

const formats = {
  weekdayFormat: (date, culture, localizer) => {
    const fullName = localizer.format(date, 'eeee', culture); 
    return fullName.slice(0, 2); 
  }
};



  useEffect(() => {
  fetch("http://localhost:5000/auth/me", {
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) {
        // Pakotettu uudelleenohjaus kirjautumiseen jos tarvis
        window.location.href = "http://localhost:5000/auth/google";
        return;
      }
      return res.json();
    })
    .then(data => {
      if (data) {
        // console.log("Kirjautunut käyttäjä:", data);
        setUser(data);
      }
    })
    .catch(err => {
      console.error("Virhe käyttäjätiedoissa:", err);         //catch-error ja pakotus etusivulle
      window.location.href = "http://localhost:5000/auth/google";
    });
}, []);

//hakee käyttäjän omat tiedot (once logged in)
useEffect(() => {
  if (user && !user.isAdmin) {
    fetch("http://localhost:5000/registrations/mine", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setMyRegistrations(data))
      .catch(err => console.error("Omia ilmoittautumisia ei pystytty hakemaan:", err));
  }
}, [user]);



  // hakee tapahtumat backendistä
  useEffect(() => {
    fetch("http://localhost:5000/events", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
  const parsedEvents = data.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));
  setEvents(parsedEvents);
})
      .catch(err => console.error("Virhe haettaessa tapahtumia:", err));
  }, []);

  // uusi tapahtuma handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          start: new Date(start),
          end: new Date(end),
          description,
          location,
        })
      });

      if (res.ok) {
        const newEvent = await res.json();
        setEvents(prev => [...prev, {
             ...newEvent,
              start: new Date(newEvent.start),
              end: new Date(newEvent.end)
        }]);

        setTitle("");
        setStart("");
        setEnd("");
        setDescription("");
       
      } else {
        const msg = await res.text();
        alert("Virhe lisättäessä tapahtumaa: " + msg);
      }
    } catch (err) {
      console.error("Virhe:", err);
    }
  };



  
  //uloskirjautuminen (chatGPT)
const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:5000/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      window.location.href = "/"; 
    } else {
      alert("Uloskirjautuminen epäonnistui");
    }
  } catch (err) {
    console.error("Uloskirjautumisvirhe:", err);
    alert("Yhteysvirhe palvelimeen.");
  }
};

//otettu pois kun tein oman admin-sivun 26.6. (tajusin tehtävänannossa lukevan min. 3 sivun sivusto)
// //admin-näkymä
// const [registrations, setRegistrations] = useState([]);

// useEffect(() => {
//   if (user?.isAdmin) {
//     fetch("http://localhost:5000/registrations", {
//       credentials: "include",
//       })
//       .then(res => res.json())
//       .then(data => setRegistrations(data))
//       .catch(err => console.error("Ilmoittautumisten haku epäonnistui:", err));
//       }
// },[user]);



// tapahtuman poistaminen

const handleDelete = async (event) => {
  if (user?.isAdmin && !window.confirm(`Poistetaanko tapahtuma "${event.title}"?`)) return;

  try {
    const res = await fetch(`http://localhost:5000/events/${event._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setEvents(prev => prev.filter(e => e._id !== event._id));
    } else {
      alert("Poistaminen epäonnistui");
    }
  } catch (err) {
    console.error("Virhe poistettaessa tapahtumaa:", err);
    alert("Virhe tapahtuman poistamisessa");
  }
};


//tarkistetaan kirjautuminen
  if (user === null) {
    return <p>Tarkistetaan kirjautumista...</p>;
  }
  return (
    <div style={{ padding: "20px" }}>



{/* Itse kalenterin sisältö */}
      {/* <h2 className="mb-3">Kalenteri</h2> */}
      <h1 className="display-2">Vapaaehtoisten ilmoittautumiskalenteri</h1>

{/* uusi nappi joka vie admin-paneeliin */}
{user?.isAdmin && (
  <button className="btn btn-info me-2" onClick={() => window.location.href = "/admin"}>
  Katso ilmoittautuneet
</button>
)}

{/* Uloskirjautuminen */}
<button className="btn btn-outline-danger" onClick={handleLogout}>
  Kirjaudu ulos
</button>

      
          {/* tapahtuman lisäys */}
      {user?.isAdmin && (
  <>
    <h3 className="display-7">Lisää tapahtuma (vain admin)</h3>
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Otsikko"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      </div>


{/* aloitus- ja loppumisajoille omat kentät */}
<div className="form-group">
  <label>Aloitusaika:</label>
  <input
    type="datetime-local"
    className="form-control"
    value={start}
    onChange={(e) => setStart(e.target.value)}
    required
  />
</div>

<div className="form-group">
  <label>Loppumisaika:</label>
  <input
    type="datetime-local"
    className="form-control"
    value={end}
    onChange={(e) => setEnd(e.target.value)}
    required
  />
</div>


      <div className="form-group">
        <label>Paikka:</label>
        <input
        type="text"
        className="form-control"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Tapahtuman osoitetiedot "

        required
        />
      </div>

      {/* Lisätiedot-kenttä */}
      <div className="form-group">
        <label>Lisätiedot:</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Kirjoita tapahtuman lisätiedot"
        />
      </div>

      {/* <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      /> */}
      <button type="submit">Lisää</button>
    </form>
  </>
)}


      

      {!user?.isAdmin && (
        <p>Olet kirjautunut sisään</p>
      )}

      <BigCalendar
      culture="fi"
       localizer={localizer}
       formats={formats}
        events={events}
       onSelectEvent={(event) => {
       if (user?.isAdmin) return; // adminille ei avaudu mittään
      setSelectedEvent(event);   // muille avataan popup
      }}
        views={["month", "week", "day"]}
        step={60}
        showMultiDayTimes
        defaultView="month"
        date={currentDate}
        onNavigate={(date) => {
        setCurrentDate(date);  //tämä rivi päivittää kk-näkymän ehkä
        }}
        style={{ height: "80vh" }}
        onDoubleClickEvent={(event) => {
         if (user?.isAdmin) {
          handleDelete(event);
    }
  }}
        components={{
          event: EventComponent
        }}
        
      />

  {selectedEvent && (
<div style={{
 position: "fixed",
  top: "20%",
 left: "30%",
 width: "40%",
 background: "white",
 border: "1px solid gray",
 padding: "20px",
 zIndex: 1000
 }}>


  <h3>{selectedEvent.title}</h3>
{selectedEvent.description && (
      <p><strong>Lisätiedot:</strong> {selectedEvent.description}</p>
    )}

{selectedEvent.location && (
  <p><strong>Paikka:</strong> {selectedEvent.location}</p>
)}

  {/* Tarkista onko käyttäjä jo ilmoittautunut tähän tapahtumaan/ jos haluaa perua */}
 {myRegistrations.some(r => r.eventId === selectedEvent._id) ? (
  <>
  <p>Olet jo ilmoittautunut tähän tapahtumaan.</p>
 <button onClick={async () => {
  const registration = myRegistrations.find(r => r.eventId === selectedEvent._id);
 if (!registration) return;

  if (!window.confirm("Haluatko varmasti perua ilmoittautumisesi?")) return;

 try {
 const res = await fetch(`http://localhost:5000/registrations/${registration._id}`, {
 method: "DELETE",
  credentials: "include",
});
if (res.ok) {
 alert("Ilmoittautuminen peruttu.");
  setMyRegistrations(prev => prev.filter(r => r._id !== registration._id));
 setSelectedEvent(null);
 } else {
 alert("Virhe peruuttaessa ilmoittautumista.");
  }
 } catch (err) {
 console.error("Peruutusvirhe:", err);
 }
  }}>
  Peru ilmoittautuminen
 </button>
  <button onClick={() => setSelectedEvent(null)} style={{ marginLeft: "10px" }}>Sulje</button>
</>
) : (
// Ilmoittautumislomake
<form onSubmit={async (e) => {
   e.preventDefault();
    try {
    if (user?.isAdmin) {
      alert("Admin ei voi ilmoittautua tapahtumiin.");
    return;
}
    const res = await fetch("http://localhost:5000/registrations", {
      method: "POST",
      headers: {                  
       "Content-Type": "application/json"                   
    },
      credentials: "include",
      body: JSON.stringify({
      eventId: selectedEvent._id,
      location                  
       })
  });
  if (res.ok) {
    alert("Ilmoittautuminen tapahtumaan onnistui!");
    const newReg = await res.json();
     setMyRegistrations(prev => [...prev, newReg]);
      setSelectedEvent(null);
      } else {
     alert("Ilmoittautuminen tapahtumaan epäonnistui");
    }
    } catch (err) {
  console.error("Ilmoittautumisvirhe:", err);
 }
}}>
  <div>
  <label>Valitse toimipaikka:</label><br />
  <label>
  <input
  type="radio"
 name="location"
 value="Pessi"
  checked={location === "Pessi"}
 onChange={(e) => setLocation(e.target.value)}
 required
/>

Pessi
</label>
<br />
<label>
<input
type="radio"
name="location"
value="Ruusulankatu"
 checked={location === "Ruusulankatu"}
onChange={(e) => setLocation(e.target.value)}
 required                          
 />
 Ruusulankatu
 </label>
</div>



<br />
{true && (
  <>
    <button className="btn btn-primary w-100 mt-2">Ilmoittaudu</button>
<button className="btn btn-outline-secondary w-100 mt-2" onClick={() => setSelectedEvent(null)}>Peruuta</button>
  </>
)}

</form>
  )}
  </div>
)}


    </div>
  );
};

export default Calendar;