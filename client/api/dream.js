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
      
    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Error uploading dream:", error);
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
        body: JSON.stringify(data),
      });

    const result = await response.json();  
    return result;

  } catch (error) {
    console.error("Error uploading dream:", error);
  }
};

async function sendClarifications(token, data) {
  try {
    const response = await fetch(`http://${server}/api/dreams/clarify`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      },
      body: data
    });

    const result = await response.json();
    return result
    
  } catch (error) {
    console.error('Upload failed:', error);
  }

};

    export { uploadDreamAudio, uploadDreamText, sendClarifications };