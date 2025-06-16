/** @format */
const server = "172.18.67.131:5000";


async function checkRegister(token) {
    const response = await fetch(`http://${server}/api/auth/register`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      }});

    if (!response.ok) {
      alert("error registering user");
    } else {
        let result = await response.text();
        return JSON.parse(result);
    }
  };

async function checkLogin(token) {
  const response = await fetch(`http://${server}/api/auth/login`, {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    }});

  if (!response.ok) {
    alert("error login user");
  } else {
    let result = await response.text();
    return JSON.parse(result);;
  }
};

async function getUserDisplayName(token) {
  const response = await fetch(`http://${server}/api/auth/user`, {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    }});

  if (!response.ok) {
    alert("error getting user display name");
  } else {
    let result = await response.text();
    return JSON.parse(result);
  }
};

async function setPreferences(token, background, interpretationStyle) {
  const response = await fetch(`http://${server}/api/profile/setup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      background,
      interpretationStyle,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    alert(result.error || 'Failed to save profile');
  }
};


  export { checkRegister, checkLogin, getUserDisplayName, setPreferences };