export const createMembership = membership => {
  return $.ajax({
    method: "POST",
    url: "api/memberships",
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

export const fetchChannelMemberships = channelId => {
  return $.ajax({
    method: "GET",
    url: `api/memberships`,
    data: { channelId }
  });
};

export const fetchDirectMemberships = directId => {
  return $.ajax({
    method: "GET",
    url: `api/memberships`,
    data: { directId }
  });
};
