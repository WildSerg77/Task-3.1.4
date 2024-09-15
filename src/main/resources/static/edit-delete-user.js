const editExitButton = document.getElementById("edit-exit-button");
const editCloseButton = document.getElementById("edit-close-button");
const editSubmitButton = document.getElementById("edit-submit-button");
const editRoles = document.getElementById("edit-roles");
const editRoleAdmin = document.getElementById("edit-role-admin");
const editRoleUser = document.getElementById("edit-role-user");

const deleteRoleAdmin = document.getElementById("delete-role-admin");
const deleteRoleUser = document.getElementById("delete-role-user");
const deleteSubmitButton = document.getElementById("delete-submit-button");
const deleteExitButton = document.getElementById("delete-exit-button");
const deleteCloseButton = document.getElementById("delete-close-button");

function getRolesFromEditForm() {
    let roles = Array.from(editRoles.selectedOptions)
        .map(option => option.value);
    let rolesToEdit = [];
    if (roles.includes("ROLE_USER")) {
        let role1 = {
            id: 1,
            name: "Пользователь"
        }
        rolesToEdit.push(role1);
    }
    if (roles.includes("ROLE_ADMIN")) {
        let role2 = {
            id: 2,
            name: "Администратор"
        }
        rolesToEdit.push(role2);
    }
    return rolesToEdit;
}

usersTable.addEventListener("click", async e => {
    e.preventDefault();
    let delButtonPressed = e.target.id === 'btn-delete-modal-call';
    let editButtonPressed = e.target.id === 'btn-edit-modal-call';

//Удаление данных

    const deleteId = document.getElementById("delete-id")
    const deleteName = document.getElementById("delete-name")
    const deleteAge = document.getElementById("delete-age")
    const deleteEmail = document.getElementById("delete-email")
    const deleteUsername = document.getElementById("delete-username")
    const deletePassword = document.getElementById("delete-password")

    if (delButtonPressed) {
        let currentUserId = e.target.dataset.id;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/${currentUserId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });

            if (!response.ok) {
                throw new Error(`Ошибка сети. Статус: ${response.status}`);
            }

            const user = await response.json();

            deleteId.value = user.id;
            deleteName.value = user.name;
            deleteAge.value = user.age;
            deleteEmail.value = user.email;
            deleteUsername.value = user.username;
            deletePassword.value = user.password;

            const deleteRoles = user.roles.map(i => i.roleName);
            deleteRoles.forEach(role => {
                if (role === "ROLE_ADMIN") {
                    deleteRoleAdmin.setAttribute('selected', "selected");
                } else if (role === "ROLE_USER") {
                    deleteRoleUser.setAttribute('selected', "selected");
                }
            });

            $('#delete-window').modal('show');
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
        }

        deleteSubmitButton.addEventListener("click", async (e) => {
            e.preventDefault();

            try {
                const response = await fetch(`http://localhost:8080/api/admin/${currentUserId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Ошибка сети. Статус: ${response.status}`);
                }

                deleteExitButton.click();
                await getAllUsers();
            } catch (error) {
                console.error('Ошибка при удалении пользователя:', error);
            }
        });
    }

//Редактирование данных

    const editId = document.getElementById("edit-id");
    const editName = document.getElementById("edit-name");
    const editAge = document.getElementById("edit-age");
    const editEmail = document.getElementById("edit-email");
    const editUsername = document.getElementById("edit-username");
    const editPassword = document.getElementById("edit-password");

    if (editButtonPressed) {
        let currentUserId = e.target.dataset.id;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/${currentUserId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });

            if (!response.ok) {
                throw new Error(`Ошибка сети. Статус: ${response.status}`);
            }

            const user = await response.json();

            editId.value = user.id;
            editName.value = user.name;
            editAge.value = user.age;
            editEmail.value = user.email;
            editUsername.value = user.username;
            editPassword.value = user.password;

            const editRoles = user.roles.map(i => i.roleName);
            editRoles.forEach(role => {
                if (role === "ROLE_ADMIN") {
                    editRoleAdmin.setAttribute('selected', "selected");
                } else if (role === "ROLE_USER") {
                    editRoleUser.setAttribute('selected', "selected");
                }
            });

            $('#edit-window').modal('show');
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
        }

        editSubmitButton.addEventListener("click", async (e) => {
            e.preventDefault();

            let user = {
                id: editId.value,
                name: editName.value,
                age: editAge.value,
                email: editEmail.value,
                username: editUsername.value,
                password: editPassword.value,
                roles: getRolesFromEditForm()
            };

            try {
                const response = await fetch(`http://localhost:8080/api/admin/${currentUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(user)
                });

                if (!response.ok) {
                    throw new Error(`Ошибка сети. Статус: ${response.status}`);
                }

                console.log(await response.json());

                editExitButton.click();
                await getAllUsers();
            } catch (error) {
                console.error('Ошибка при обновлении данных пользователя:', error);
            }
        });
    }
})

//Закрытие окна edit
let removeSelectedRolesFromEdit = () => {
    if (editRoleAdmin.hasAttribute('selected')) {
        editRoleAdmin.removeAttribute('selected')
    }
    if (editRoleUser.hasAttribute('selected')) {
        editRoleUser.removeAttribute('selected')
    }
}
editExitButton.addEventListener("click", e => {
    e.preventDefault();
    removeSelectedRolesFromEdit();
})
editCloseButton.addEventListener("click", e => {
    e.preventDefault();
    removeSelectedRolesFromEdit();
})

//Закрытие окна delete
let removeSelectedRolesFromDelete = () => {
    if (deleteRoleAdmin.hasAttribute('selected')) {
        deleteRoleAdmin.removeAttribute('selected')
    }
    if (deleteRoleUser.hasAttribute('selected')) {
        deleteRoleUser.removeAttribute('selected')
    }
}
deleteExitButton.addEventListener("click", e => {
    e.preventDefault();
    removeSelectedRolesFromDelete();
})
deleteCloseButton.addEventListener("click", e => {
    e.preventDefault();
    removeSelectedRolesFromDelete();
})