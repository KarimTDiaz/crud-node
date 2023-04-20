const fetchData = async (url, method) => {
  const request = await fetch(url, {
    method: method
  });
  const data = await request.json();
  return data;
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
    fragment.append(userName, button, deleteButton);
  });
  document.body.append(fragment);
};

const printDetails = user => {
  const fragment = document.createDocumentFragment();
  const userName = document.createElement('h2');
  userName.textContent = user.name;
  const userEmail = document.createElement('p');
  userEmail.textContent = user.email;
  fragment.append(userName, userEmail);
  document.body.append(fragment);
};
const users = async () => {
  const users = await fetchData('http://localhost:3000/api/users', 'GET');
  printUsers(users);
};
const details = async (id, ev) => {
  console.log(ev.target.textContent);
  if (ev.target.textContent === 'details') {
    const user = await fetchData(
      'http://localhost:3000/api/users/' + id,
      'GET'
    );
    printDetails(user);
  } else if (ev.target.textContent === 'Delete') {
    fetchData('http://localhost:3000/api/users/' + id, 'DELETE');
  }
};

users();

document.body.addEventListener('click', ev => {
  if (ev.target.dataset.id) {
    details(ev.target.dataset.id, ev);
  }
});
