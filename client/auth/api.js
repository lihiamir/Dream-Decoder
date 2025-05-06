/** @format */
const server = "localhost:5000";


async function checkRegister(token) {
    const response = await fetch(`http://${server}/api/auth/register`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `${token}`,
      }});

    if (!response.ok) {
      alert("error registering user");
    } else {
        let result = await res.text();
        return JSON.parse(result);
    }
  };

  async function checkLogin(token) {
    const response = await fetch(`http://${server}/api/auth/login`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `${token}`,
      }});

    if (!response.ok) {
        alert("error registering user");
    } else {
        let result = await res.text();
        return JSON.parse(result);;
    }
  };


  export { checkRegister, checkLogin };