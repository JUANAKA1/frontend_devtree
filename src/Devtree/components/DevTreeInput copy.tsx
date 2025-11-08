import type { DevTreeLink } from "../../interfaces/socialInterface";
import { Switch } from "@headlessui/react";

type DevTreeInputProps = {
  item: DevTreeLink;
  handleUrlChamge: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnabledChange: (name: string) => void;
};

export const DevTreeInput = ({
  item,
  handleUrlChamge,
  handleEnabledChange,
}: DevTreeInputProps) => {
  return (
    <div className="bg-white shadow-sm p-5 flex items-center gap-3">
      <div
        className="w-12 h-12 bg-cover"
        style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
      ></div>
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-lg"
        value={item.url}
        onChange={handleUrlChamge}
        name={item.name}
      />
      <Switch
        checked={item.enabled}
        onChange={() => handleEnabledChange(item.name)}
        className={`${item.enabled ? "bg-blue-600" : "bg-gray-200"}
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2
          border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span
          className={`${item.enabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};
