const fs = require("fs");
const path = require("path");
const shortId = require("shortid");
const { promises: fsPromise } = fs;

const contactsPath = path.join(__dirname, "db", "contacts.json"); 

async function listContacts() {
	try {
		return await fsPromise.readFile(contactsPath).then((data) => {
			console.table(JSON.parse(data));
			return JSON.parse(data);
		});
	} catch (err) {
		errHandle(err);
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		const contact = contacts.find(
			({ id }) => id.toString() === contactId.toString()
		);
		console.table(contact);
	} catch (err) {
		errHandle(err);
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();

		const newList = contacts.filter(
			({ id }) => id.toString() !== contactId.toString()
		);

		await fsPromise.writeFile(contactsPath, JSON.stringify(newList));
	} catch (err) {
		errHandle(err);
	}
}

async function addContact(name, email, phone) {
	try {
		let contacts = await listContacts();
		const newContacts = {
			id: shortId.generate(),
			name,
			email,
			phone,
		};
		contacts.push(newContacts);
		await fsPromise.writeFile(contactsPath, JSON.stringify(contacts));
	} catch (err) {
		errHandle(err);
	}
}

function errHandle(error) {
	console.log(error.message);
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};