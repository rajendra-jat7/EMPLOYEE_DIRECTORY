let employees = JSON.parse(localStorage.getItem('employees')) || [];
const editData = JSON.parse(localStorage.getItem('editEmployee'));

if (editData) {
  document.getElementById('firstName').value = editData.firstName;
  document.getElementById('lastName').value = editData.lastName;
  document.getElementById('email').value = editData.email;
  document.getElementById('department').value = editData.department;
  document.getElementById('role').value = editData.role;
}

function saveEmployee(e) {
  e.preventDefault();

  const newEmp = {
    id: editData ? editData.id : Date.now(),
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    department: document.getElementById('department').value.trim(),
    role: document.getElementById('role').value.trim(),
  };

  if (!/\S+@\S+\.\S+/.test(newEmp.email)) {
    alert('Invalid email format');
    return;
  }

  if (editData) {
    employees = employees.map((e) => (e.id === newEmp.id ? newEmp : e));
  } else {
    employees.push(newEmp);
  }

  localStorage.setItem('employees', JSON.stringify(employees));
  localStorage.removeItem('editEmployee');
  window.location.href = 'index.html';
}

function cancelForm() {
  localStorage.removeItem('editEmployee');
  window.location.href = 'index.html';
}
