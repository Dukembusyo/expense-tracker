document.getElementById("addExpenseBtn").addEventListener("click", addExpense);
document.getElementById("filterCategory").addEventListener("change", filterExpenses);

let expenses = [];

function addExpense() {
    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
    const date = document.getElementById("expenseDate").value;

    if (name && !isNaN(amount) && category && date) {
        const expense = { name, amount, category, date };
        expenses.push(expense);
        renderExpenses();
        clearForm();
    }
}

function renderExpenses() {
    const tbody = document.getElementById("expenseTable");
    tbody.innerHTML = "";

    const filterCategory = document.getElementById("filterCategory").value;
    let filteredExpenses = expenses;
    if (filterCategory !== "All") {
        filteredExpenses = expenses.filter(expense => expense.category === filterCategory);
    }

    filteredExpenses.forEach((expense, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>Ksh${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateTotal();
}

function updateTotal() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById("totalAmount").textContent = `Ksh${totalAmount.toFixed(2)}`;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById("expenseName").value = expense.name;
    document.getElementById("expenseAmount").value = expense.amount;
    document.getElementById("expenseCategory").value = expense.category;
    document.getElementById("expenseDate").value = expense.date;
    deleteExpense(index);
}

function clearForm() {
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseCategory").value = "";
    document.getElementById("expenseDate").value = "";
}

function filterExpenses() {
    renderExpenses();
}