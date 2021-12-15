const { v4 } = require('uuid');

const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        throw error;
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find((item) => item.id === contactId);

        if (!contact) {
            throw new Error(`Contact with id = ${contactId} not found`);
        }
        return contact;
    } catch (error) {
        throw error;
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const checkID = () =>
            contacts.some((item) => item.id === Id) ? checkID(id + 1) : id;

        const newContact = {
            id: v4(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact;
    } catch (error) {
        throw error;
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.findIndex(
            (item) => item.id === contactId,
        );

        if (contact === -1) {
            throw new Error(`Contact with id = ${contactId} not found`);
        }

        const deleteContact = await contacts.splice(contact, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));

        return deleteContact;
    } catch (error) {
        throw error;
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };