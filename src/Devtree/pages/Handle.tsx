import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { getUserHandleAction } from "../../api/actions/DevTreeAction";
import { HandleData } from "../components/HandleData";

export const Handle = () => {
  const params = useParams();

  const handle = params.handle!;
  const {data, error , isLoading} = useQuery({
    queryFn: () => getUserHandleAction(handle),
    queryKey: ["handle", handle],
  });
  if (isLoading) return <div>Cargando...</div>;
  if (error) return <Navigate to={"/404"} />;

if (data)return<HandleData data={data} />
};
