/**
 * Math.random should be unique because of its seeding algorithm.
 * Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
 */
export const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * This function waits for a specified time and returns.
 * @param {*} timeout 
 */
export const wait = (timeout) => {
   return new Promise((resolve, reject)=>{
       setTimeout(() => resolve(), timeout);
   })
}