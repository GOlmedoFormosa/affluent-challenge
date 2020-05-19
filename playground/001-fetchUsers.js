const request = require('request-promise');

const db = require('../src/db/db.js');

const url = 'https://reqres.in/api/users';

const fetchUsers = async() => {
  let users = [];
  try {
    let currentPage = 1;
    while(true) {
      const response = await request(`${url}?page=${currentPage}`);
      const result = JSON.parse(response);
      
      // check if I can merge the results
      if(result.data && Array.isArray(result.data)) {
        users = [...users, ...result.data];
      } 

      // check more items
      if( result.total_pages && result.total_pages === currentPage ||
          !result.data || 
          (result.data && result.data.length === 0)
        ) {
        break;
      }
      
      // go to the next page
      currentPage++;
    }
    await db.insert('users', users);
  } catch(error) {
    console.log('error', error);
  }
  // console.log('users', users);
  return users;
}

fetchUsers();