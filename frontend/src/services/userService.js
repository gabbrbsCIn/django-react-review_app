import api from "./api";
import { ACCESS_TOKEN } from "./constants";

const getUser = async (setUser, setIsLoading) => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        const response = await api.get('/users/get_user/');
        setUser({
          username: response.data.username,
          user_id: response.data.user_id,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  export default getUser;