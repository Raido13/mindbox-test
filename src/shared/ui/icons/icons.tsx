import React from 'react';
import arrowIcon from '@shared/ui/assets/icons/arrow.svg?url';
import checkboxIcon from '@shared/ui/assets/icons/checkbox.svg?url';
import { SVGProps } from 'react';
import { ReactSVG } from 'react-svg';

export type TIcon = SVGProps<SVGSVGElement> & {
  iconName: 'arrow' | 'checkbox';
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  className?: string;
};

const iconMap = {
  arrow: arrowIcon,
  checkbox: checkboxIcon,
};

export const Icon = ({ iconName, width, height, style, className }: TIcon) => {
  const svgIconPath = iconMap[iconName];

  return (
    <ReactSVG
      src={svgIconPath}
      className={className}
      beforeInjection={(svg) => {
        if (width) svg.setAttribute('width', width.toString());
        if (height) svg.setAttribute('height', height.toString());
      }}
      style={style}
    />
  );
};
