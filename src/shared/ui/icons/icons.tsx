import icons from '@shared/ui/assets/icons/icons.svg';
import { SVGProps } from 'react';

export type TIcon = SVGProps<SVGSVGElement> & {
  iconName: string;
};

export const Icon = ({ iconName, ...props }: TIcon) => (
  <svg {...props}>
    <use href={`${icons}#${iconName}`} />
  </svg>
);