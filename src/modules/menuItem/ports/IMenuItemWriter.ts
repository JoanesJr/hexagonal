import { IWriter } from "@/shared/base/IWriter";
import { CreateMenuItemDTO, UpdateMenuItemDTO } from "../domain/dto";
import { MenuItem } from "../domain/menuItem";

export interface IMenuItemWriter extends IWriter<CreateMenuItemDTO, UpdateMenuItemDTO, MenuItem> {};