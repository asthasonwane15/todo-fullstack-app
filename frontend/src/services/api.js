const BASE_URL = "http://localhost:5000/api";

export const signup = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup Failed");
    }

    return data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login Failed");
    }

    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const getTodos = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to Fetch Todos");
    }

    return data;
  } catch (error) {
    console.error("Get Todos Error:", error);
    throw error;
  }
};

export const createTodo = async (title, token) => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to Create Todo");
    }

    return data;
  } catch (error) {
    console.error("Create Todo Error:", error);
    throw error;
  }
};