// Initial mock users
const mockUsers = [
    { id: 1, name: "Admin", email: "admin@gmail.com", password: "admin123", role: "admin" },
    { id: 2, name: "John Doe", email: "john@gmail.com", password: "john123", role: "employee" },
    { id: 3, name: "Dennis Ofosu", email: "dennis@gmail.com", password: "dennis123", role: "employee" },
];

// Save mock users to localStorage if not already set
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(mockUsers));
}

// Function to get users from localStorage
export const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
};

// Function to save users to localStorage
export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};
