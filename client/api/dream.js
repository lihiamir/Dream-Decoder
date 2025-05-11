/** @format */
const server = "localhost:5000";

async function uploadDreamAudio(token, data) {
  try {
    const response = await fetch(`http://${server}/api/dreams/submit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: data,
      });

    return response;

  } catch (error) {
    console.error("Error uploading dream:", error);
    return {ok : false }
  }
};

async function uploadDreamText(token, data) {
  try {
    const response = await fetch(`http://${server}/api/dreams/submit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: data,
      });

    return response;

  } catch (error) {
    console.error("Error uploading dream:", error);
    return {ok : false }
  }
};

    export { uploadDreamAudio, uploadDreamText };