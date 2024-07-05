import { Addon } from "./types/ProductModel";

export function groupAddons(addons: Addon[]) {
  const addonsWithGroup = addons.map((addon) => {
    if (!addon.group_addon) {
      return {
        ...addon,
        group_addon: "addons",
      };
    }

    return addon;
  });

  const groupedAddons = addonsWithGroup.reduce((groups, addon) => {
    const key = addon.group_addon;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(addon);

    return groups;
  }, {});

  return groupedAddons;
}
