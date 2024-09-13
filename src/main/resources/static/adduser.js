const addUserForm         = document.querySelector(".add-user-form");
const addName     = document.getElementById("add-name");
const addAge      = document.getElementById("add-age");
const addEmail    = document.getElementById("add-email");
const addUsername = document.getElementById("add-username");
const addPassword = document.getElementById("add-password");
const addRoles    = document.getElementById("add-roles");
const usersList = document.getElementById("nav-users-tab")

function getRolesFromAddForm() {
    let roles = Array.from(addRoles.selectedOptions)
        .map(option => option.value);
    let rolesToAdd = [];
    if (roles.includes("ROLE_USER")) {
        let role1 = {
            id: 1,
            name: "Пользователь"
        }
        rolesToAdd.push(role1);
    }
    if (roles.includes("ROLE_ADMIN")) {
        let role2 = {
            id: 2,
            name: "Администратор"
        }
        rolesToAdd.push(role2);
    }
    return rolesToAdd;
}

addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
        name: addName.value,
        age: addAge.value,
        email: addEmail.value,
        username: addUsername.value,
        password: addPassword.value,
        roles: getRolesFromAddForm()
    };

    try {
        const response = await fetch("http://localhost:8080/api/admin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Ошибка сети');
        }

        usersList.click();
 //       location.reload();
    } catch (error) {
        console.error('Ошибка добавления пользователя:', error);
    }
});