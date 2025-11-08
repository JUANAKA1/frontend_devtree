import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUser, ProfileForm } from "../../interfaces/userInterface";
import {
  updateProfileAction,
  uploadImageProfileAction,
} from "../../api/actions/DevTreeAction";
import { toast } from "sonner";
import type { ChangeEvent } from "react";

export function Profile() {
  const queryClient = useQueryClient();
  const data: IUser = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });
  const updateProfileMutation = useMutation({
    mutationFn: updateProfileAction,
    onError: (error) => {
      toast.error(error.message, {
        style: { color: "red" },
      });
    },
    onSuccess: (data) => {
      toast.success(data, {
        style: { color: "green" },
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const uploadImageMutation = useMutation({
    mutationFn: uploadImageProfileAction,
    onError: (error) => {
      toast.error(error.message, {
        style: { color: "red" },
      });
    },
    onSuccess: (data) => {
      toast.success(data, {
        style: { color: "green" },
      });
      queryClient.setQueryData(["user"], (prevData: IUser) => {
        return {
          ...prevData,
          image: data.image,
        };
      });
    },
  });
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };
  const handleUserProfileForm = (formData: ProfileForm) => {
    const user = queryClient.getQueryData<IUser>(["user"])!;
    user.handle = formData.handle;
    user.description = formData.description;
    updateProfileMutation.mutate(user);
  };
  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: "El nombre de usuario es obligatorio",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description", {
            required: "La descripcion es obligatoria",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="image">Imagen:</label>
        <input
          id="image"
          type="file"
          name="image"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
}
