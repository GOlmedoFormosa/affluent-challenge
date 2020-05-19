const request = require('request-promise');
const url = 'https://reqres.in/api/users';

const fetchUsers = async() => {
  let users = [];
  try {
    let hasMoreData = true;
    let currentPage = 1;
    while(hasMoreData) {
      const response = await request(`${url}?page=${currentPage}`);
      const result = JSON.parse(response);
      if( result.total_pages && result.total_pages === currentPage ||
          !result.data || 
          (result.data && result.data.length === 0)
        ) {
        hasMoreData = false;
      } else {
        currentPage++;
      }
      users = [...users, ...result.data];
    }
  } catch(error) {
    console.log('error', error);
  }
  return users;
}

fetchUsers();