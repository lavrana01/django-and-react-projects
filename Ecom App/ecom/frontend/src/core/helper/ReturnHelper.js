import {API} from '../../backend'


export const orderReturn =(userId,token,returnData) =>{
    console.log(userId)
    const formData = new FormData();
    for (const name in returnData){
        formData.append(name,returnData[name])
    }
    return fetch(`${API}order/return/${userId}/${token}`,{
    method:"POST",
    headers: {
        Accept: "application/json"
    },
    body: formData
})
.then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .catch((err) => {
    console.error(err);
    throw err; // Rethrow the error for further handling
  });
}
