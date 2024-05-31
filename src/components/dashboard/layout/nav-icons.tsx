import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { UsersThree as UsersThreeIcon, TreeStructure as TreeStructureIcon } from '@phosphor-icons/react/dist/ssr';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { Vault as VaultIcon } from '@phosphor-icons/react/dist/ssr/Vault';
import { MapPin as MapPinIcon } from '@phosphor-icons/react/dist/ssr/MapPin';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  vault: VaultIcon,
  treeStructure: TreeStructureIcon,
  mappin: MapPinIcon,
  user: UserIcon,
  users: UsersThreeIcon,
} as Record<string, Icon>;
