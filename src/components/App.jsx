import React, { useEffect, useState } from "react";
import shortid from "shortid";
import { createForm } from "./Form/Form";
import { FilterLabel } from "./Filter/Filter";
import { PhoneBook } from "./phonebook/PhoneBook.jsx";

export const App = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const contactsLocalStorage = JSON.parse(localStorage.getItem("contacts"));

    if (contactsLocalStorage) {
      setContacts(contactsLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = (evt) => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      case "filter":
        setFilter(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert("This contact already exists.");
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    setContacts([...contacts, newContact]);
    setName("");
    setNumber("");
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };

  const getFilteredContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      {createForm(handleChange, handleSubmit, name, number)}
      <FilterLabel handleFilter={handleFilter} />
      <PhoneBook contacts={filteredContacts} handleDelete={handleDelete} />
    </div>
  );
};
