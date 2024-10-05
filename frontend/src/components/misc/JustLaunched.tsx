// import { useTranslation } from 'react-i18next';
import { BiGift, BiShoppingBag } from 'react-icons/bi';
import Block from '../Block';
import Button from '../Button';
import NewsItem from '../News';

const JustLaunched = () => {
  //   const { t } = useTranslation();

  return (
    // <div className="p-6 py-8 md:py-10 lg:py-12 bg-fuchsia-600 text-gray-50">
    //   <div className="container mx-auto">
    //     <div className="flex flex-col lg:flex-row items-center justify-between">
    //       <h2 className="text-center w-full text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold">
    //         {t('home.hero')}
    //       </h2>
    //     </div>
    //   </div>
    // </div>

    <div>
      <Block title="Latest Offers" icon={BiGift} color="orange">
        {/*  News Items */}
        <NewsItem
          imageUrl="https://placehold.co/600x400"
          date="01/10/2024"
          title="Offer 1"
          href="/offer/1"
        />
        {/*  More News Items */}
      </Block>

      <Block title="New Products" icon={BiShoppingBag} color="green" dashed>
        <NewsItem
          imageUrl="https://placehold.co/600x400"
          date="01/10/2024"
          title="Product 1"
          href="/product/1"
        />
        {/*  More News Items */}
      </Block>

      <Button
        color="purple"
        size="large"
        onClick={() => alert('Button clicked!')}
      >
        Click me
      </Button>
    </div>
  );
};

export default JustLaunched;
