/* eslint-disable react-refresh/only-export-components */
export async function getAllTask() {
  const url = `https://todolistback-d9hkdzacbeezgqhn.brazilsouth-01.azurewebsites.net/api/task`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 403) {
    return response.status;
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro na requisição:", errorData);

    return response.error(404);
  }

  return await response.json();
}

export async function PostTask(dados) {
  const url = `https://todolistback-d9hkdzacbeezgqhn.brazilsouth-01.azurewebsites.net/api/task`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
  if (response.status == 403) {
    return response.status;
  }
  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }

  return await response.json();
}

export async function PutTask(id) {
  const url = `https://todolistback-d9hkdzacbeezgqhn.brazilsouth-01.azurewebsites.net/api/task/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 403) {
    return response.status;
  }
  if (!response.ok) {
    const errorData = await response;
    console.error("Erro na requisição:", errorData);
    throw new Error(
      `Network response was not ok: ${response.status} - ${response.statusText}`
    );
  }

  return await response;
}

export async function DeleteTask(id) {
  const url = `https://todolistback-d9hkdzacbeezgqhn.brazilsouth-01.azurewebsites.net/api/task/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 403) {
    return response.status;
  }
  if (!response.ok) {
    const errorData = await response;
    console.error("Erro na requisição:", errorData);
    throw new Error(
      `Network response was not ok: ${response.status} - ${response.statusText}`
    );
  }

  return await response;
}

// METODOS FETCH DAS CATEGORIAS

export async function getAllCategories() {
  const url = `https://todolistback-d9hkdzacbeezgqhn.brazilsouth-01.azurewebsites.net/api/categories`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (response.status == 403) {
    return response.status;
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro na requisição:", errorData);

    return response.error(404);
  }

  return await response.json();
}

export async function PostCategories(dados) {
  const url = `https://todolistback-d9hkdzacbeezgqhn.brazilsouth-01.azurewebsites.net/api/categories`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });
  if (response.status == 403) {
    return response.status;
  }
  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }

  return await response.json();
}

export async function DeleteCategories(id) {
  const url = `https://todolistback-d9hkdzacbeezgqhn.brazilsouth-01.azurewebsites.net/api/categories/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 403) {
    return response.status;
  }
  if (!response.ok) {
    const errorData = await response;
    console.error("Erro na requisição:", errorData);
    throw new Error(
      `Network response was not ok: ${response.status} - ${response.statusText}`
    );
  }

  return await response;
}
