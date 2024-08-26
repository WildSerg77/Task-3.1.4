const userDataTable      = document.getElementById("user-data-table");
const userPrintNameAndRole = document.getElementById("user-print-name-and-role");

const currentUser = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка сети');
        }

        const user = await response.json();

        if (user != null) {
            const roleName = user.roles.map(role => role.name === "ROLE_USER" ? "Пользователь" : "Администратор").join(', ');

            userDataTable.innerHTML = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.username}</td>
                    <td>${roleName}</td>
                </tr>
            `;

            userPrintNameAndRole.innerHTML = `
                <p class="d-inline font-weight-bold">${user.username} с ролью ${roleName}</p>
            `;
        }
    } catch (error) {
        console.error('Ошибка распознавания пользователя:', error);
    }
};

currentUser();