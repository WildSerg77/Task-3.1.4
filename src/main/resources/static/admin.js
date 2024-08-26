const adminPrintNameAndRoles = document.getElementById("admin-print-name-and-roles");
const usersTable = document.querySelector(".users-table");

const currentUser = async () => {
    try {
        const resp = await fetch("http://localhost:8080/api/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!resp.ok) {
            throw new Error('Ошибка сети');
        }

        const user = await resp.json();

        if (user != null) {
            adminPrintNameAndRoles.innerHTML = `
                <p class="d-inline font-weight-bold">${user.username} с ролью 
                    ${user.roles.map(role => role.name === "ROLE_USER" ? "Пользователь" : "Администратор").join(', ')}</p>
                        `;
        }
    } catch (error) {
        console.error('Ошибка распознавания пользователя:', error);
    }
};

currentUser();

const iterateUsers = (users) => {
    if (users.length > 0) {
        let userTempData = '';
        users.forEach((user) => {
            userTempData += `
                <tr>
                    <td> ${user.id} </td>
                    <td> ${user.name} </td>
                    <td> ${user.age} </td>
                    <td> ${user.email} </td>
                    <td> ${user.username} </td>
                    <td> ${user.roles.map((role) => role.name === "ROLE_USER" ? "Пользователь" : "Администратор").join(', ')} </td>
                    <td> <button type="button" class="btn btn-info" id="btn-edit-modal-call" data-toggle="modal" data-target="modal-edit"
                    data-id="${user.id}">Изменить</button></td>
                    <td> <button type="button" class="btn btn-danger" id="btn-delete-modal-call" 
                    data-id="${user.id}">Удалить</button></td>
                </tr>
        `
        })
        usersTable.innerHTML = userTempData;
    }
}
const getAllUsers = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/admin", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка сети');
        }

        const data = await response.json();
        iterateUsers(data);
    } catch (error) {
        console.error('Ошибка распознавания пользователя:', error);
    }
};

getAllUsers();