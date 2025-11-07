import { isAxiosError } from "axios";
import api from "../axios";
import type { IUser, ProfileForm } from "../../interfaces/userInterface";

export const getUserAction = async (): Promise<IUser> => {
  try {
    const { data } = await api<{ user: IUser }>("/api/user");
    return data.user;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // Si el backend devuelve un mensaje de error
      throw new Error(
        error.response.data?.message || "Error al obtener el usuario"
      );
    }
    // Error genérico si no es un AxiosError
    throw new Error("Error desconocido al obtener el usuario");
  }
};
export const updateProfileAction = async (
  formData: ProfileForm
): Promise<string> => {
  try {
    const { data } = await api.patch<{ message: string }>(
      "/api/user",
      formData
    );
    console.log(data);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // Si el backend devuelve un mensaje de error
      throw new Error(error.response.data?.message);
    }
    // Error genérico si no es un AxiosError
    throw new Error("Error desconocido al obtener el usuario");
  }
};

export const uploadImageProfileAction = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await api.post(
      "/api/user/image",
      formData
    );
    
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // Si el backend devuelve un mensaje de error
      throw new Error(error.response.data?.message);
    }
    // Error genérico si no es un AxiosError
    throw new Error("Error desconocido al obtener el usuario");
  }
};
