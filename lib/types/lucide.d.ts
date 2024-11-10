declare module 'lucide-react' {
  import { ComponentType } from 'react';

  interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export const HeartIcon: ComponentType<IconProps>;
  export const PencilIcon: ComponentType<IconProps>;
  export const Trash2Icon: ComponentType<IconProps>;
  export const PlusIcon: ComponentType<IconProps>;
  export const LogOutIcon: ComponentType<IconProps>;
  export const Chrome: ComponentType<IconProps>;
  export const Check: ComponentType<IconProps>;
  export const ChevronDown: ComponentType<IconProps>;
  export const ChevronUp: ComponentType<IconProps>;
} 