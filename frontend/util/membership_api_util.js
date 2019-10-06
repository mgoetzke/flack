export const createMembership = membership => {
  return $.ajax({
    method: "POST",
    url: "api/membership",
    data: { membership }
  });
};

export const destroyMembership = id => {
  return $.ajax({
    method: "DELETE",
    url: `api/memberships/${id}`
  });
};

export const fetchMembership = id => {
  return $.ajax({
    method: "GET",
    url: `api/memberships/${id}`
  });
};

export const fetchMemberships = () => {
  return $.ajax({
    method: "GET",
    url: `api/memberships`
  });
};
