const request = require('request-promise');

const db = require('../db/db.js');
const logger = require('../lib/logger');

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
  } catch(error) {
    logger.error(error);
  }
  return users;
}

fetchUsers().then(users => {
  await db.insert('users', users);
}).catch(error => logger.error(error));