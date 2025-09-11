// src/components/ui/DropdownMenu/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Fachada pública para el sistema DropdownMenu.
 *              - v2.0.0: Refactorizado para usar alias de ruta absolutos,
 *                resolviendo los errores de compilación `Module not found`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { Menu } from "@/components/ui/DropdownMenu/Menu";
import { Trigger } from "@/components/ui/DropdownMenu/Trigger";
import { Content } from "@/components/ui/DropdownMenu/Content";
import { Item } from "@/components/ui/DropdownMenu/Item";
import { Label } from "@/components/ui/DropdownMenu/Label";
import { Separator } from "@/components/ui/DropdownMenu/Separator";
import { Group } from "@/components/ui/DropdownMenu/Group";

// Se re-exportan los componentes con sus nombres públicos y canónicos.
export const DropdownMenu = Menu;
export const DropdownMenuTrigger = Trigger;
export const DropdownMenuContent = Content;
export const DropdownMenuItem = Item;
export const DropdownMenuLabel = Label;
export const DropdownMenuSeparator = Separator;
export const DropdownMenuGroup = Group;
// src/components/ui/DropdownMenu/index.ts
