
/**
* Function to call S3 API and get response as text
* @param {string} url
* @param {string} text
*/
export default function getText(url, text) {
 return new Promise((resolve, reject) => {
   let xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
   xhr.onload = () => {
     if (xhr.status === 200) {
       resolve(text + xhr.response.toString());
     } else {
       reject(xhr.status);
     }
   };

   xhr.send();
   xhr.onerror = (err) => {
     console.log("error", err);
   };
 });
}

