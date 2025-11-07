import { Navigate } from "react-router";

import { useQuery } from "@tanstack/react-query";
import { DevTree } from "./DevTree";
import { getUserAction } from "../../api/actions/DevTreeAction";


export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUserAction,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (data) return <DevTree data={data} />;
}
