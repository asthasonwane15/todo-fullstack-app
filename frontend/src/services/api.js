const BASE_URL = "http://localhost:5000/api";

export const signup = async (userData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTodos = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/todos`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createTodo = async (
  title
) => {
  try {
    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/todos`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTodo = async (
  id
) => {
  try {
    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateTodo = async (id, title) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const toggleTodo = async (
  id,
  completed
) => {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/todos/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      },
      body: JSON.stringify({
        completed,
      }),
    }
  );

  return response.json();
};