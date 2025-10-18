import { icons } from 'lucide-react';
import React from 'react'
type ChoseRoleProps={
  industry:string
  description?:string,
  icon?: React.ElementType | undefined;
  className?: string;
  onClick?: () => void;
  iconStyle?: string;

}

export default function ChoseRole({industry,description, iconStyle,  icon: Icon, className = '', onClick}:ChoseRoleProps) {
  return (
    <div onClick={onClick} className={className}>
      {Icon&& <Icon className={iconStyle} />}
      <div className='flex flex-col'>
        <h3>{industry}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
