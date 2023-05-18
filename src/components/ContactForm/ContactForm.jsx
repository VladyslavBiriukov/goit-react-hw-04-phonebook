import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Button, Input, Label } from './ContactForm.styled';

function ContactForm({ onSubmit }) {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'name': setName(value);
                break;
            
            case 'number': setNumber(value);
                break;
            
            default: break;
        }
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        onSubmit({name: name, number: number});
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

        return (
            <form onSubmit={handelSubmit}>
                <Label>
                    Name
                    <Input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        placeholder="Enter your name..."
                        onChange={handleChange}
                    />
                </Label>
                <Label>
                    Number
                    <Input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={number}
                        placeholder="Enter your number..."
                        onChange={handleChange}
                    />
                </Label>
                <Button type="submit">Add contact</Button>
            </form>
        );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;