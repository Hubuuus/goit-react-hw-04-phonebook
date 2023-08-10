import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

import css from "./App.module.css";

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("storageContacts")) ?? [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ]
  );

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("storageContacts", JSON.stringify(contacts));
  }, [contacts]);

  const updateContact = contact => {
    searchContacts(contacts, contact.name) == 0
      ? setContacts(prev => [...prev, contact])
      : alert(`${contact.name} is already in contacts`);
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const searchChange = evt => {
    setFilter(evt.target.value);
  };

  const searchContacts = (arr, el) => {
    const normalizedCase = el.toLowerCase();
    return arr.filter(contact => contact.name.toLowerCase().includes(normalizedCase));
  };

  const filtered = searchContacts(contacts, filter);
  return (
    <div className={css.App}>
      <h1 className={css.App_h1}>Phonebook</h1>
      <ContactForm
        updateContact={updateContact}
        contacts={contacts}
        searchContacts={searchContacts}
      />
      <h2 className={css.App_h2}>Contact</h2>
      <Filter searchChange={searchChange} />
      <ContactList contacts={contacts} filtered={filtered} deleteContact={deleteContact} />
    </div>
  );
};

export default App;

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  searchContacts: PropTypes.func,
};
