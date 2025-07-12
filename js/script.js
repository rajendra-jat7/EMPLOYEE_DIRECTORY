if (!localStorage.getItem('employees')) {
  localStorage.setItem('employees', JSON.stringify([]));
}

let employees = JSON.parse(localStorage.getItem('employees')) || [];
let filters = { name: '', department: '', role: '' };

function renderEmployees() {
  const container = document.getElementById('employeeList');
  const search = document.getElementById('searchInput').value.toLowerCase();
  const sort = document.getElementById('sortSelect').value;
  const show = parseInt(document.getElementById('showCount').value);

  let filtered = employees.filter(
    (emp) =>
      (`${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search) ||
        emp.email.toLowerCase().includes(search)) &&
      emp.firstName.toLowerCase().includes(filters.name) &&
      emp.department.toLowerCase().includes(filters.department) &&
      emp.role.toLowerCase().includes(filters.role)
  );

  if (sort === 'firstName') {
    filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sort === 'department') {
    filtered.sort((a, b) => a.department.localeCompare(b.department));
  }

  container.innerHTML = '';
  filtered.slice(0, show).forEach((emp) => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });
}

function deleteEmployee(id) {
  if (confirm('Delete this employee?')) {
    employees = employees.filter((e) => e.id !== id);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderEmployees();
  }
}

function editEmployee(id) {
  const emp = employees.find((e) => e.id === id);
  localStorage.setItem('editEmployee', JSON.stringify(emp));
  window.location.href = 'form.html';
}

function applyFilters() {
  filters.name = document.getElementById('filterName').value.toLowerCase();
  filters.department = document
    .getElementById('filterDept')
    .value.toLowerCase();
  filters.role = document.getElementById('filterRole').value.toLowerCase();
  renderEmployees();
}

function resetFilters() {
  filters = { name: '', department: '', role: '' };
  document.getElementById('filterName').value = '';
  document.getElementById('filterDept').value = '';
  document.getElementById('filterRole').value = '';
  renderEmployees();
}

function toggleFilter() {
  const sidebar = document.getElementById('filterSidebar');
  sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
}

document
  .getElementById('searchInput')
  .addEventListener('input', renderEmployees);
document
  .getElementById('sortSelect')
  .addEventListener('change', renderEmployees);
document
  .getElementById('showCount')
  .addEventListener('change', renderEmployees);

renderEmployees();
