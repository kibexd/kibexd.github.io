document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const customerInfo = document.getElementById('customer-info');

    if (!localStorage.getItem('loggedIn')) {
        window.location.href = '/login.html';
    }

    // Simulated API call to fetch customer data
    fetchCustomerData().then(customers => {
        customerInfo.innerHTML = customers.map(customer => `
            <div class="customer-card">
                <p><strong>No:</strong> ${customer.No}</p>
                <p><strong>Name:</strong> ${customer.Name}</p>
                <p><strong>Search Name:</strong> ${customer['Search Name']}</p>
                <p><strong>Name 2:</strong> ${customer['Name 2']}</p>
                <p><strong>Credit Limit (LCY):</strong> ${customer['Credit Limit (LCY)']}</p>
            </div>
        `).join('');
    }).catch(error => {
        customerInfo.innerHTML = `<p class="error">Error loading customer data: ${error.message}</p>`;
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        window.location.href = '/login.html';
    });
});

// Simulated function to fetch customer data (replace with actual API call)
function fetchCustomerData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { No: '001', Name: 'John Doe', 'Search Name': 'JDOE', 'Name 2': 'JD', 'Credit Limit (LCY)': '5000' },
                { No: '002', Name: 'Jane Smith', 'Search Name': 'JSMITH', 'Name 2': 'JS', 'Credit Limit (LCY)': '3000' },
                { No: '003', Name: 'Alice Johnson', 'Search Name': 'AJOHNSON', 'Name 2': 'AJ', 'Credit Limit (LCY)': '4000' }
            ]);
        }, 1000);
    });
}