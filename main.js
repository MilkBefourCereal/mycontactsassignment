// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

// Variables
let contacts = loadContact();
displayContacts();


function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === 'display-email') {
    displayByEmail();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = '';
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getContact(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
}

function addContact() {
  let contactName = prompt("Enter contact name");
  let contactEmail = prompt("Enter contact email");
  let contactNumber = prompt("Enter contact phone number");
  let contactCountry = prompt("Enter contact country");
  let index = findByEmail(contactEmail);
  if (index === -1){
  contacts.push(newContact(contactName, contactEmail, contactNumber, contactCountry))
  } else {
    alert(`Contact with that email was found at position ${index}.`)
  }
  saveContact();
  displayContacts();  
}


function removeContact() {
  let removeEmail = prompt("Enter email of contact")
    let index = findByEmail(removeEmail)
    contacts.splice(index, 1);
    saveContact();
    displayContacts();
  } 


function displayByName() {
  let outputStr = '';
  outputEl.innerHTML = "";
  let index = prompt("Enter name of contact");
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.includes(index)) {
    outputStr += getContact(contacts[i], i);
    outputEl.innerHTML = outputStr;
  } 
}
}

function displayByCountry() {
  let outputStr = '';
  outputEl.innerHTML = "";
  let index = prompt("Enter country of contact");
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].country.includes(index)) {
    outputStr += getContact(contacts[i], i);
    outputEl.innerHTML = outputStr;
  } 
}
}

function displayByEmail() {
  let outputStr = '';
  outputEl.innerHTML = "";
  let index = prompt("Enter email of contact");
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email.includes(index)) {
    outputStr += getContact(contacts[i], i);
    outputEl.innerHTML = outputStr;
  } 
} 
}


function findByEmail(email) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email === email) {
      return i;
    } 
  }
  return -1;

}


function loadContact() {
  let contactStr = localStorage.getItem('contacts');
  return JSON.parse(contactStr) ?? [];
}

function saveContact() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function newContact(name,email,number,country) {
  return {
    name: name,
    email: email,
    number: number,
    country: country
  };
}

function getContact(contact, i) {
    return `
    <div>
    ${i}: ${contact.name} <br>
     ${contact.email} <br>
     ${contact.number} ${contact.country}
    </div>
    `;
  }
