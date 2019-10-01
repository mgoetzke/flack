export const signup = (formUser) => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: {
      user: {
        username: formUser.username,
        password: formUser.password,
        email: formUser.email,
        display_name: formUser.display_name
      }
    }
  });
}

export const login = formUser => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user: { username: formUser.username, password: formUser.password } }
  });
};

export const logout = () => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session"
  });
};