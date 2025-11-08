import { useEffect, useState } from "react";
import { social } from "../../data/social";
import { isValue } from "../../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileAction } from "../../api/actions/DevTreeAction";
import type { IUser } from "../../interfaces/userInterface";
import type { SocialNetwork } from "../../interfaces/socialInterface";
import { DevTreeInput } from "../components/DevTreeInput copy";

export const LinkTree = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);
  const queryClient = useQueryClient();
  const user: IUser = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfileAction,
    onError: (error) => {
      toast.error(error.message, {
        style: {
          color: "red",
        },
      });
    },
    onSuccess: () => {
      toast.success("Actualizado correctamente", {
        style: {
          color: "green",
        },
      });
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });
    setDevTreeLinks(updatedData);
  }, []);

  const handleUrlChamge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updadteLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevTreeLinks(updadteLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnabledChange = (socialNetword: string) => {
    const updadteLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetword) {
        if (isValue(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no valida", {
            style: {
              color: "red",
            },
          });
        }
      }
      return link;
    });
    setDevTreeLinks(updadteLinks);
    let updatedItems: SocialNetwork[] = [];
    const selectedSocialLinks = updadteLinks.find(
      (link) => link.name === socialNetword
    );
    if (selectedSocialLinks?.enabled) {
      const id = links.filter((link) => link.id).length + 1;
      if (links.some((link) => link.name === socialNetword)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetword) {
            return { ...link, id: id, enabled: true };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectedSocialLinks,
          id,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetword
      );
      updatedItems = links.map((link) => {
        if (link.name === socialNetword) {
          return { ...link, id: 0, enabled: false };
        } else if (
          link.id > indexToUpdate &&
          indexToUpdate !== 0 &&
          link.id === 1
        ) {
          return { ...link, id: link.id - 1 };
        } else {
          return link;
        }
      });
    }

    queryClient.setQueryData(["user"], (prevData: IUser) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };
  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChamge={handleUrlChamge}
            handleEnabledChange={handleEnabledChange}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
          onClick={() => mutate(queryClient.getQueryData(["user"])!)}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  );
};
