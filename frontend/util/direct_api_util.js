export const createDirect = direct => {
  return $.ajax({
    method: "POST",
    url: "api/directs",
    data: { direct }
  });
};

export const fetchDirect = id => {
  return $.ajax({
    method: "GET",
    url: `api/directs/${id}`
  });
};

export const fetchAllDirects = () => {
  return $.ajax({
    method: "GET",
    url: `api/directs`
  });
};

export const updateDirect = direct => {
  return $.ajax({
    method: "PATCH",
    url: `api/directs/${direct.id}`,
    data: { direct }
  });
};