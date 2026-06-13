import { loginUser } from "@/lib/firebase";
import instance from "@/api/axiosInstance";

export const AuthServices = {
  login: async (data: {
    email: string;
    password: string;
  }) => {   
    try {
      // Get Firebase ID token
      const idToken = await loginUser(data.email, data.password);
      // Send token to backend
      const response = await instance.post(
        "/users/auth/login",
        { idToken }
      );
      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  }, 
    register: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await instance.post("/users/auth/register", data);
    return res.data;
  },
};