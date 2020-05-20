const fetchDates = async() => {
  try {
    const response = await (await fetch('/api/v1/dates')).json();
    const { data: { dates }} = response;
    return dates;
  } catch(error) {
    console.log('error', error);
  }
}

const createRowItem = (dateData) => {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${dateData.id}</td>`;
  row.innerHTML += `<td>${dateData.date}</td>`; 
  row.innerHTML += `<td>${dateData.commissionsTotal}</td>`; 
  row.innerHTML += `<td>${dateData.salesNet}</td>`; 
  row.innerHTML += `<td>${dateData.leadsNet}</td>`; 
  row.innerHTML += `<td>${dateData.clicks}</td>`; 
  row.innerHTML += `<td>${dateData.epc}</td>`; 
  row.innerHTML += `<td>${dateData.impressions}</td>`; 
  row.innerHTML += `<td>${dateData.cr}</td>`; 
  return row;
}

const loadRows = async () => {
  try {
    const dates = await fetchDates();
    const tableTBody = document.querySelector('#myTable tbody');
    const fragment = document.createDocumentFragment();
    dates.forEach(dateData => {
      fragment.appendChild(createRowItem(dateData));
    });
    tableTBody.appendChild(fragment);
  } catch(error) {
    console.log('error', error);
  }
}

