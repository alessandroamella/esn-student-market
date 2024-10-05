import { FC, ReactNode } from 'react';
import type { IconType } from 'react-icons';

interface BlockProps {
  title: string;
  icon?: IconType;
  color?: 'blue' | 'purple' | 'orange' | 'green' | 'dark-blue';
  children: ReactNode;
  dashed?: boolean;
}

const Block: FC<BlockProps> = ({
  title,
  icon: Icon,
  color = 'blue',
  dashed = false,
  children,
}) => {
  return (
    <div
      className={`w-full esn-block bg-${color}-200 p-4 mb-4 relative ${
        dashed ? 'border-t border-dashed' : ''
      } border-gray-300`}
    >
      <div className="block-header mb-4 relative">
        <div className="block-title flex items-center gap-2 px-4">
          {Icon && <Icon />}
          <h2 className="inline-block ml-2 text-black dark:text-white font-bold text-sm uppercase bg-${color}-500 py-2.5 rounded-l">
            {title}
          </h2>
        </div>
      </div>
      <div className="block-content text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default Block;
