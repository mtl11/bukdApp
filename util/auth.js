import axios from "axios";
const APIKey = "AIzaSyCttFPH3tkX_cN5XObiFHCc9ZXtc8FJWOM";

export async function createUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + APIKey,
    {
        email: email,
        password: password,
        returnSecureToken: true
    }
  );
}

export async function authenticateUser(email, password) {
    console.log("Hello")
    const response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + APIKey,
      {
          email: email,
          password: password,
          returnSecureToken: true
      }
    );
     console.log(response.data);
  }
