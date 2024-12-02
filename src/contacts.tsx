import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// Define the Contact type
interface Contact {
  id: string;
  createdAt: number;
  first?: string;
  last?: string;
}

export async function getContacts(query?: string): Promise<Contact[]> {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: Contact[] | null = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact(): Promise<Contact> {
  await fakeNetwork();
  const id: string = Math.random().toString(36).substring(2, 9);
  const contact: Contact = { id, createdAt: Date.now() };
  const contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts); // This should correctly resolve to Promise<void>
  return contact;
}

export async function getContact(id: string): Promise<Contact | null> {
  await fakeNetwork(`contact:${id}`);
  const contacts: Contact[] | null = await localforage.getItem("contacts");
  const contact = contacts?.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(
  id: string,
  updates: Partial<Contact>,
): Promise<Contact> {
  await fakeNetwork();
  const contacts: Contact[] | null = await localforage.getItem("contacts");

  // Ensure contacts is not null
  if (!contacts) throw new Error("No contacts found");

  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error(`No contact found for ${id}`);

  Object.assign(contact, updates);
  await set(contacts); // This should correctly resolve to Promise<void>
  return contact;
}

export async function deleteContact(id: string): Promise<boolean> {
  const contacts: Contact[] | null = await localforage.getItem("contacts");

  // Ensure contacts is not null
  if (!contacts) return false;

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts); // This should correctly resolve to Promise<void>
    return true;
  }
  return false;
}

// Set function should return Promise<void>
async function set(contacts: Contact[]): Promise<void> {
  await localforage.setItem("contacts", contacts); // Ensure this returns Promise<void>
}

// Fake a cache so we don't slow down stuff we've already seen
let fakeCache: { [key: string]: boolean } = {};

async function fakeNetwork(key?: string): Promise<void> {
  if (!key) {
    fakeCache = {};
    return; // Return early if key is undefined
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
