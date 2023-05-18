import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import ContactForm from "components/ContactForm";
import Filter from "components/Filter";
import ContactList from "components/ContactList";

import { ContactsTitle, Container, Title } from './App.styled';


function App() {

    const [contacts, setContacts] = useState([
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);
    
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const contactsStorage = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contactsStorage);
        
        if (parsedContacts) {
            setContacts(parsedContacts)
        } else {
            return;
        }
    }, []);


    useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


   const addContact = ({ name, number }) => {
        const findName = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
        if (findName) {
            return alert(`${name} is already in contacts.`);
        }

        const findNumber = contacts.find(contact => contact.number === number);
        if (findNumber) {
            return alert(`This phone number is already in use.`);
        };

        const newContact = {
            id: nanoid(),
            name,
            number,
        };

        setContacts(contacts => [...contacts, newContact]);
   };
    
    function deleteContact(contactId) {
        console.log(contactId);
        setContacts(contacts => contacts.filter(contact => contact.id !== contactId)
        );
    };

    const handleFilter = e => {
        setFilter(e.currentTarget.value)
    };

     const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

        const visibleContacts = filterContacts();

        return (
            <Container>
                <section title="Phonebook">
                    <Title>Phonebook</Title>
                    <ContactForm onSubmit={addContact} />
                </section>
                <section title="Contacts">
                    <ContactsTitle>Contacts</ContactsTitle>
                    <Filter value={filter} onChange={handleFilter} />
                    <ContactList
                        contacts={visibleContacts}
                        onDeleteContact={deleteContact}
                    />
                </section>
            </Container>
        );
};

export default App;

