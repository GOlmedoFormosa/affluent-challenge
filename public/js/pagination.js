const rowsPerPage = 10;
const tr = [];

const paginationButtons = (page, pages) => {
  /* this variables will disable the "Prev" button on 1st page and "next" button on the last one */
  const prev = page === 1 ? 'disabled' : '';
  const next = page === pages ? 'disabled' : '';
  // create prev button
  let buttons = `<input type='button' value='&lt;&lt; Prev' onclick='sort(${page - 1},${pages})' ${prev}>`;
  // add validation when there are a lot of pages
  if(pages > 5) {
    if(page !== 1)
      buttons += `<input type='button' id="id${1}" value="${1}" onclick='sort(${1}, ${pages})'>...`;
    buttons += `<input type='button' id="id${page}" value="${page}" onclick='sort(${page}, ${pages})'>`;
    if(page !== pages)
      buttons += `...<input type='button' id="id${pages}" value="${pages}" onclick='sort(${pages}, ${pages})'>`;
  } else {
  // create buttons for every page
    for (let i = 1; i <= pages; i++) {
      buttons += `<input type='button' id="id${i}" value="${i}" onclick='sort(${i}, ${pages})'>`;
    }
  }
  // create next button
  buttons += `<input type='button' value='Next &gt;&gt;' onclick='sort(${page + 1}, ${pages})' ${next}>`;
  return buttons;
}

const sort = (page, pages) => {
  let rows = '';
  // calculate which row will be the first to start mapping
  const loopStarter = (rowsPerPage * page) - rowsPerPage;
  // map rows of the current page
  for (let i = loopStarter; i < (loopStarter + rowsPerPage); i++) {
    if(tr[i]) rows += tr[i];
  }
  // get tbody to populate it with the rows
  const tableTBody = document.querySelector('#myTable tbody');
  // populate the rows
  tableTBody.innerHTML = rows;
  // create the pagination buttons
  document.getElementById("table-buttons").innerHTML = paginationButtons(page, pages);
  // CSS Stuff
  document.getElementById("id" + page).setAttribute("class","active");
}

const addPagination = () => {
  try {
    // get tbody to get all rows
    const tableTBody = document.querySelector('#myTable tbody');
    // get total rows
    const totalRows = tableTBody.rows.length;
    // calculate quantity of pages
    const pages = Math.ceil(totalRows / rowsPerPage);
    // if I have more than one page I add the functionality
    if(pages > 1) {
      // populate an array of tr that is kind of a state
      for (let index = 0; index < totalRows; index++) {
        tr[index] = tableTBody.rows[index].outerHTML;
      }
      // create container of buttons and add container below the table
      const tableButtons = document.createElement('div');
      tableButtons.id = 'table-buttons';
      const table = document.getElementById('myTable');
      table.insertAdjacentElement('afterend', tableButtons);
      // sort rows
      sort(1, pages);
    }
  } catch (error) {
    console.log('error', error);
  }
}
