import { Link, Outlet } from "react-router";
import { Toaster } from "sonner";
import NavigationTabs from "../../components/NavegationTabs";
import type { IUser } from "../../interfaces/userInterface";
import { useEffect, useState } from "react";
import type { SocialNetwork } from "../../interfaces/socialInterface";
import { DevTreeLink } from "../components/DevTreeLink";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { Header } from "../components/Header";
type DevTreeProps = {
  data: IUser;
};
export const DevTree = ({ data }: DevTreeProps) => {
  const [enableLinks, setEnableLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  );

  useEffect(() => {
    setEnableLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    );
  }, [data]);
  const queryClient = useQueryClient();
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active && over) {
      const prevIndex = enableLinks.findIndex((link) => link.id === active.id);
      const newIndex = enableLinks.findIndex((link) => link.id === over.id);
      const order = arrayMove(enableLinks, prevIndex, newIndex);
      setEnableLinks(order);

      const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter(
        (item: SocialNetwork) => !item.enabled
      );
      const links = order.concat(disabledLinks);

      queryClient.setQueryData(["user"], (prevData: IUser) => {
        return {
          ...prevData,
          links: JSON.stringify(links),
        };
      });
    }
  };
  return (
    <>
      <Header />
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />

          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil {data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-4xl text-center text-white">{data.handle}</p>
              {data.image && (
                <img
                  src={data.image}
                  alt={`Imagen de perfil ${data.name}`}
                  className="max-w-[250px] mx-auto  "
                />
              )}
              <p className="text-center text-lg font-black text-white"></p>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                {data.description}
                <div className="mt-20 flex flex-col gap-5">
                  <SortableContext
                    items={enableLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enableLinks.map((link) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
};
