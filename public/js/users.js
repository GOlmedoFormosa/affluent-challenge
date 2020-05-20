const fetchUsers = async() => {
  try {
    const response = await (await fetch('/api/v1/users')).json();
    const { data: { users }} = response;
    return users;
  } catch(error) {
    console.log('error', error);
  }
}

const createRowItem = (user) => {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${user.id}</td>`;
  row.innerHTML += `<td>${user.email}</td>`; 
  row.innerHTML += `<td>${user.first_name}</td>`; 
  row.innerHTML += `<td>${user.last_name}</td>`; 
  row.innerHTML += `<td>${user.avatar}</td>`; 
  return row;
}

const loadRows = async () => {
  try {
    const users = await fetchUsers();
    const tableTBody = document.querySelector('#myTable tbody');
    const fragment = document.createDocumentFragment();
    users.forEach(user => {
      fragment.appendChild(createRowItem(user));
    });
    tableTBody.appendChild(fragment);
  } catch(error) {
    console.log('error', error);
  }
}

