import { isAxiosError } from "axios";
import api from "../axios";
import type { IUser, UserHandle } from "../../interfaces/userInterface";

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
export const updateProfileAction = async (formData: IUser) => {
  try {
    const { data } = await api.patch<{ message: string }>(
      "/api/user",
      formData
    );

    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message);
    }
  }
};

export const uploadImageProfileAction = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await api.post("/api/user/image", formData);

    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // Si el backend devuelve un mensaje de error
      throw new Error(error.response.data?.message);
    }
  }
};
export const getUserHandleAction = async (handle: string) => {
  try {
    const { data } = await api(`/api/user/${handle}`);
    return data.user as UserHandle;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message);
    }
  }
};

export const searchByHandleAction = async (handle: string) => {
  try {
    const response = await api.post<{ message: string }>("/api/user/search", {
      handle,
    });
    const data= response.data.message
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message);
    }

  }
};
