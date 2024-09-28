document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginPage = document.getElementById('login-page');
    const mainPage = document.getElementById('main-page');
    const logoutButton = document.getElementById('logout');
    const loadingOverlay = document.getElementById('loading-overlay');
    const coinImage = document.querySelector('.coin-image');

    let mainBalance = 5000456.00;
    let savingsBalance = 3073589.00;
    let transferHistory = [];

    function updateAccountDisplays() {
        document.getElementById('checking-balance').textContent = `$${mainBalance.toFixed(2)}`;
        document.getElementById('savings-balance').textContent = `$${savingsBalance.toFixed(2)}`;
    }

    function updateMastercardDisplay() {
        const mastercardElement = document.querySelector('.mastercard');
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const greeting = hours < 12 ? 'GOOD MORNING' : 'WELCOME';

        mastercardElement.innerHTML = `
            <div class="card-content">
                <div class="card-header">
                    <div class="card-greeting">${greeting} RANDY</div>
                    <div class="card-logo">
                        <i class="fab fa-cc-mastercard"></i>
                    </div>
                </div>
                <div class="card-number">**** **** **** 4532</div>
                <div class="card-info">
                    <div class="card-holder">RANDY BLACKSON</div>
                    <div class="card-expiry">VALID THRU: 23/05/26</div>
                </div>
                <div class="card-date">${currentTime.toLocaleDateString()}</div>
            </div>
        `;
    }

    function generateTransferHistory() {
        const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams', 'Charlie Brown'];
        const startDate = new Date('2023-01-01');
        const endDate = new Date();

        for (let i = 0; i < 100; i++) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomAmount = Math.floor(Math.random() * 9000) + 1000;
            const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

            transferHistory.push({
                date: randomDate.toISOString().split('T')[0],
                name: randomName,
                amount: Math.random() > 0.5 ? randomAmount : -randomAmount
            });
        }

        transferHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    function populateRecentTransactions() {
        const recentTransactionsTable = document.getElementById('recent-transactions').querySelector('tbody');
        recentTransactionsTable.innerHTML = '';
        transferHistory.slice(0, 5).forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.name}</td>
                <td class="${transaction.amount < 0 ? 'negative' : 'positive'}">$${Math.abs(transaction.amount).toFixed(2)}</td>
            `;
            recentTransactionsTable.appendChild(row);
        });
    }

    function showLoadingAndCoin() {
        loadingOverlay.style.display = 'flex';
        coinImage.style.opacity = '1';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            coinImage.style.opacity = '0';
            mainPage.style.display = 'flex';
        }, 3000);
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'randyblack1234' && password === 'iloveGilson23') {
            loginPage.style.display = 'none';
            showLoadingAndCoin();
            updateAccountDisplays();
            updateMastercardDisplay();
            generateTransferHistory();
            populateRecentTransactions();
            initializeBitcoinChart();
            initializeSpendingChart();
            populateStockPortfolio();
        } else {
            alert('Invalid username or password');
        }
    });

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        mainPage.style.display = 'none';
        loginPage.style.display = 'flex';
    });

    document.querySelectorAll('nav a, aside a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
                document.getElementById(targetPage).classList.add('active');
            }
        });
    });

    // Currency Converter
    document.getElementById('currency-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;
        
        // In a real application, you would use an API to get live exchange rates
        const exchangeRates = {
            USD: 1,
            EUR: 0.84,
            GBP: 0.72,
            JPY: 110.14
        };

        const convertedAmount = (amount * exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(2);
        document.getElementById('conversion-result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    });

    // Bitcoin Chart
    function initializeBitcoinChart() {
        const ctx = document.getElementById('bitcoinChart').getContext('2d');
        const labels = Array.from({length: 30}, (_, i) => `Day ${i + 1}`);
        const data = Array.from({length: 30}, () => Math.floor(Math.random() * 10000) + 30000);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: data,
                    borderColor: '#ffa500',
                    backgroundColor: 'rgba(255, 165, 0, 0.1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            color: '#ffffff'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#ffffff'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }

    // Spending Chart
    function initializeSpendingChart() {
        const ctx = document.getElementById('spendingChart').getContext('2d');
        const data = {
            labels: ['Groceries', 'Utilities', 'Entertainment', 'Transportation', 'Healthcare'],
            datasets: [{
                label: 'Monthly Spending',
                data: [500, 300, 200, 150, 100],
                backgroundColor: [
                    'rgba(255, 165, 0, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 165, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        };

        new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#ffffff'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Monthly Spending Distribution',
                        color: '#ffffff'
                    }
                }
            }
        });
    }

    // Stock Portfolio
    function populateStockPortfolio() {
        const stockTable = document.getElementById('stock-table').querySelector('tbody');
        const stocks = [
            { symbol: 'AAPL', company: 'Apple Inc.', shares: 100, price: 145.86 },
            { symbol: 'GOOGL', company: 'Alphabet Inc.', shares: 50, price: 2680.21 },
            { symbol: 'AMZN', company: 'Amazon.com Inc.', shares: 20, price: 3486.90 },
            { symbol: 'MSFT', company: 'Microsoft Corporation', shares: 75, price: 289.67 },
            { symbol: 'FB', company: 'Facebook, Inc.', shares: 60, price: 336.51 }
        ];

        stocks.forEach(stock => {
            const row = document.createElement('tr');
            const totalValue = (stock.shares * stock.price).toFixed(2);
            row.innerHTML = `
                <td>${stock.symbol}</td>
                <td>${stock.company}</td>
                <td>${stock.shares}</td>
                <td>$${stock.price.toFixed(2)}</td>
                <td>$${totalValue}</td>
            `;
            stockTable.appendChild(row);
        });
    }
});
