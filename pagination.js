const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
const itemsPerPage = 10;

let currentPage = 1;
let totalItems = 0;
let totalPages = 0;

// Fetch Pokemon data with limit and offset based on the current page
async function fetchData() {
  const offset = (currentPage - 1) * itemsPerPage;
  const urlWithParams = `${apiUrl}?limit=${itemsPerPage}&offset=${offset}`;

  console.log(`Fetching data for Page ${currentPage}`);
  console.log(`API URL: ${urlWithParams}`);

  try {
    const response = await fetch(urlWithParams);
    const result = await response.json();

    totalItems = result.count;
    totalPages = Math.ceil(totalItems / itemsPerPage);

    console.log(`Total Pokemon: ${totalItems}`);
    console.log(`Total Pages: ${totalPages}`);
    console.log('Fetched Results:', result.results);

    displayItems(result.results);
    updatePageInfo();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Display Pokemon list
function displayItems(items) {
  const listElement = document.getElementById('item-list');
  listElement.innerHTML = '';

  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `#${(currentPage - 1) * itemsPerPage + index + 1} - ${item.name}`;
    listElement.appendChild(li);
  });
}

// Update pagination information and buttons
function updatePageInfo() {
  console.log(`Updating page info: Page ${currentPage} of ${totalPages}`);

  document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById('prev-btn').disabled = currentPage === 1;
  document.getElementById('next-btn').disabled = currentPage === totalPages;
}

// Event listeners
document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    console.log(`Prev clicked. New currentPage: ${currentPage}`);
    fetchData();
  } else {
    console.log('Already on the first page.');
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    console.log(`Next clicked. New currentPage: ${currentPage}`);
    fetchData();
  } else {
    console.log('Already on the last page.');
  }
});

// Initial fetch
fetchData();
