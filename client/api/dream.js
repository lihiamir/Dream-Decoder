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
      },
      body: data,
    });

    const result = await response.json();
    return result
    
  } catch (error) {
    console.error('Upload failed:', error);
  }
};


async function getAllDreams(token) {
  try {
    const response = await fetch(`http://${server}/api/dreams/my-dreams`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error fetching dreams:', error);
  }
}

async function getDreamById(token, id) {
  try {
    const response = await fetch(`http://${server}/api/dreams/my-dreams/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }});
      
    const result = await response.json();
    return result;
  }
  catch (error) {
    console.error('Error fetching dream by ID:', error);
  }
}

export { uploadDreamAudio, uploadDreamText, sendClarifications, getAllDreams, getDreamById };