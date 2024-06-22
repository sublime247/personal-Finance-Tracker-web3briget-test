document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const transactionsList = document.getElementById('transactions-list');
    const chartCanvas = document.getElementById('chart');
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let chart;

    transactionForm.addEventListener('submit', event => {
        event.preventDefault();

        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);

        const transaction = { type, category, amount };
        transactions.push(transaction);

        localStorage.setItem('transactions', JSON.stringify(transactions));

        addTransactionToList(transaction);
        updateChart();
        transactionForm.reset();
    });

    function addTransactionToList(transaction) {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.innerHTML = `${transaction.category}: <span>$${transaction.amount.toFixed(2)}</span>`;
        transactionsList.appendChild(li);
    }

    function updateChart() {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

        if (chart) {
            chart.destroy();
        }

        const ctx = chartCanvas.getContext('2d');
        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Income', 'Expense'],
                datasets: [{
                    data: [income, expense],
                    backgroundColor: ['#2ecc71', '#e74c3c']
                }]
            }
        });
    }

    transactions.forEach(addTransactionToList);
    updateChart();
});
