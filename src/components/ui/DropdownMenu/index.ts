// src/components/ui/DropdownMenu/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para el sistema DropdownMenu.
 *              - v1.1.0: Se añaden las extensiones de archivo `.js` para una
 *                compatibilidad máxima con la resolución de módulos de Node.js (ESM).
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { Menu } from "./Menu.js";
import { Trigger } from "./Trigger.js";
import { Content } from "./Content.js";
import { Item } from "./Item.js";
import { Label } from "./Label.js";
import { Separator } from "./Separator.js";
import { Group } from "./Group.js";

export const DropdownMenu = Menu;
export const DropdownMenuTrigger = Trigger;
export const DropdownMenuContent = Content;
export const DropdownMenuItem = Item;
export const DropdownMenuLabel = Label;
export const DropdownMenuSeparator = Separator;
export const DropdownMenuGroup = Group;
// src/components/ui/DropdownMenu/index.ts
