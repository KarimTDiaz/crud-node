const userContainer = document.getElementById('users');
const inputElement = document.getElementById('input');
const formElement = document.getElementById('form');
const formNewUserElement = document.getElementById('form-add');

let userId;
const fetchData = async (url, ...options) => {
  try {
    const request = await fetch(url, ...options);
    const data = await request.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
const printUsers = users => {
  const fragment = document.createDocumentFragment();
  users.forEach(user => {
    const userName = document.createElement('h2');
    userName.textContent = user.name;
    const button = document.createElement('button');
    button.textContent = 'details';
    button.dataset.id = user.userId;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.id = user.userId;
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.dataset.id = user.userId;
    editButton.dataset.name = user.name;
    fragment.append(userName, button, deleteButton, editButton);
  });
  userContainer.append(fragment);
};

const printDetails = user => {
  const fragment = document.createDocumentFragment();
  const userName = document.createElement('h2');
  userName.textContent = user.name;
  const userEmail = document.createElement('p');
  userEmail.textContent = user.email;
  fragment.append(userName, userEmail);
  userContainer.append(fragment);
};
const users = async () => {
  const users = await fetchData('http://localhost:3000/api/users', {
    method: 'GET'
  });
  printUsers(users);
};

const details = async (id, ev) => {
  if (ev.target.textContent === 'details') {
    const user = await fetchData('http://localhost:3000/api/users/' + id, {
      method: 'GET'
    });
    printDetails(user);
  } else if (ev.target.textContent === 'Delete') {
    const user = fetchData('http://localhost:3000/api/users/' + id, {
      method: 'DELETE'
    });
  }
};

const editUser = name => {
  inputElement.value = name;
};
const updateUser = async () => {
  await fetchData('http://localhost:3000/api/users/' + userId, {
    method: 'PATCH',
    body: JSON.stringify({ name: inputElement.value }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  });
};
const createUser = async (name, email) => {
  await fetchData('http://localhost:3000/api/users', {
    method: 'POST',
    body: JSON.stringify({ name, email }),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  });
};
document.body.addEventListener('click', ev => {
  if (ev.target.dataset.id) {
    details(ev.target.dataset.id, ev);
  }
  if (ev.target.textContent === 'Edit') {
    editUser(ev.target.dataset.name);
    userId = ev.target.dataset.id;
  }
});

formElement.addEventListener('submit', ev => {
  ev.preventDefault();
  updateUser();
});

formNewUserElement.addEventListener('submit', ev => {
  ev.preventDefault();
  createUser(ev.target.name.value, ev.target.email.value);
});
users();
