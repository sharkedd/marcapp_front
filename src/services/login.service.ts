import axios from 'axios';
import { AxiosError } from 'axios';
import useTokenStore from '../stores/tokenStore';
import useUserStore from '../stores/useStore';

interface ResponseDto {
  birthday: string;
  email: string;
  exp: number;
  firstName: string;
  iat: number;
  id: number;  
  lastName: string;
  role: string;
}

interface ErrorResponse {
  message: string;
  statusCode: number;
}
async function guardarToken(token: string) {
  useTokenStore.getState().setToken(token); //para que no sea reactivo (Sólo se actualice cuando se llame a la función)
}

async function guardarUsuario(authToken: string) {
  try {
    const endpoint: string = `${process.env.EXPO_PUBLIC_MS_USER_URL}/auth/profile`;
    const response2 = await axios.post<ResponseDto | ErrorResponse>(endpoint, {}, {
        headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
        }
      });
      const userStore = useUserStore.getState(); //para que no sea reactivo (Sólo se actualice cuando se llame a la función)
      const user = response2.data as ResponseDto;
      userStore.setId(user.id);
      userStore.setFirstName(user.firstName);
      userStore.setLastName(user.lastName);
      userStore.setEmail(user.email);
      userStore.setBirthday(user.birthday);
      userStore.setRole(user.role);
      console.log('Rol del usuario: ', user.role);
      
      return { success: true }    
    
  } catch (error: unknown) {
    console.log("Token inválido en profile Service")
    return { success: false, message: 'Token inválido' };
  }
}

const loginService = async (payload: { email: string; password: string }) => {
  try {
    const endpoint: string = `${process.env.EXPO_PUBLIC_MS_USER_URL}/auth/login`;
    const response = await axios.post(endpoint, {
      email: payload.email,
      pass: payload.password
    });
    
    if(response?.status === 200) {
      console.log("Token recibido:", response.data.access_token);
      await guardarToken(response.data.access_token);
      await guardarUsuario(response.data.access_token);
      return { success: true};
    } else {
      console.log("Error del servidor")
      return { success: false, message: 'Error del servidor' };
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (Array.isArray(error.response.data.message)) {
              // Si es un array de mensajes, podrías combinarlos en un solo mensaje o manejarlos como necesites
              const errorMessage = error.response.data.message.join(', ');
              return { success: false, message: errorMessage };
            } else {
              // Si es un solo mensaje
              return { success: false, message: error.response.data.message };
            }
          case 500:
            return { success: false, message: 'Error del servidor (Code: 500)' };
          default:
            console.error(`Error ${error.response.status}: ${error.response.data}`);
        }
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
    } 
    return { success: false, message: 'Error desconocido' };
  }
};
export default loginService;
