import env from "react-dotenv";

export const postRequest = async (url, payload) => {
  return fetch(env.API_URL + url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      mode: "cors",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(async (data) => {
      return await data;
    })
    .catch((error) => console.warn(error));
};

export const postRequestWithAuth = async (url, payload) => {
  return fetch(env.API_URL + url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(async (data) => {
      return await data;
    })
    .catch((error) => console.warn(error));
};

export const getRequest = async (url, payload) => {
  return fetch(env.API_URL + url, {
    method: "get",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      let datas = await data;
      //console.log('here1')
      if (datas?.detail) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/signin";
      }

      return await data;
    })
    .catch((error) => {
      console.warn(error);
      console.log("here2");
    });
};

export const getRequestNoAuth = async (url, payload) => {
  return fetch(env.API_URL + url, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      return await data;
    })
    .catch((error) => {
      console.warn(error);
      console.log("here2");
    });
};

export const getByIdRequest = async (url, payload) => {
  return fetch(env.API_URL + url + `/${payload}`, {
    method: "get",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      return await data;
    })
    .catch((error) => console.warn(error));
};

export const putRequest = async (url, payload) => {
  return fetch(env.API_URL + url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(async (data) => {
      console.log("aa", data);
      return await data;
    })
    .catch((error) => console.warn(error));
};

export const putRequestNoAuth = async (url, payload) => {
  return fetch(env.API_URL + url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(async (data) => {
      console.log("aa", data);
      return await data;
    })
    .catch((error) => console.warn(error));
};

export const patchRequest = async (url, payload) => {
  return fetch(env.API_URL + url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(async (data) => {
      console.log("aa", data);
      return await data;
    })
    .catch((error) => console.warn(error));
};

export const patchRequestNoAuth = async (url, payload) => {
  return fetch(env.API_URL + url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(async (data) => {
      console.log("aa", data);
      return await data;
    })
    .catch((error) => console.warn(error));
};

export const deleteRequest = async (url, payload) => {
  return fetch(env.API_URL + url, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      return await data;
    })
    .catch((error) => console.warn(error));
};
