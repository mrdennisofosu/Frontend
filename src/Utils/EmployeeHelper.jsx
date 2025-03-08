export const fetchDepartments = () => {
  try {
    const storedDepartments = localStorage.getItem("departments");

    if (!storedDepartments) {
      return []; // Return an empty array if no departments are found
    }

    const departments = JSON.parse(storedDepartments);

    return { success: true, data: departments };
  } catch (error) {
    console.error("Error fetching departments:", error);
    return { success: false, error: "Failed to fetch departments" };
  }
};
