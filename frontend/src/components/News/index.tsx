import { FC } from 'react';
import { Link } from 'react-router-dom';

interface NewsItemProps {
  imageUrl: string;
  date: string;
  title: string;
  href: string;
}

const NewsItem: FC<NewsItemProps> = ({ imageUrl, date, title, href }) => (
  <div className="flex mb-4">
    <div className="w-24 mr-4">
      <img
        src={imageUrl}
        alt={title}
        className="rounded-md shadow-inner max-h-24 object-contain"
      />
    </div>
    <div>
      <p className="text-gray-400 text-xs">{date}</p>
      <Link to={href} className="text-blue-500 font-bold hover:text-purple-500">
        {title}
      </Link>
    </div>
  </div>
);

export default NewsItem;
