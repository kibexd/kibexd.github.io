document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const customerInfo = document.getElementById('customer-info');

    if (!localStorage.getItem('loggedIn')) {
        window.location.href = '/login.html';
    }

    // Fetch user data from the API
    fetchUserData().then(user => {
        document.getElementById('user-name').textContent = user.Name;
        document.getElementById('user-email').textContent = user.Email;
        document.getElementById('user-role').textContent = user.Role;
    }).catch(error => {
        console.error('Error loading user data:', error);
    });

    // Fetch customer data from the API
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

// Function to fetch user data from the API
async function fetchUserData() {
    try {
        const response = await fetch('https://<your-business-central-url>/ODataV4/yourPublisher_yourGroup_yourVersion/CustomUserAPI?$filter=Name eq \'' + localStorage.getItem('username') + '\'', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), // Use token if required
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        return data.value[0]; // Assuming the API returns an array
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Function to fetch customer data from the API
async function fetchCustomerData() {
    try {
        const response = await fetch('https://<your-business-central-url>/ODataV4/yourPublisher_yourGroup_yourVersion/CustomUserAPI', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), // Use token if required
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch customer data');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}