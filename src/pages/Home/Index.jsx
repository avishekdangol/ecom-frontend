import { Card } from 'antd';
import AppLayout from '@/layouts/Layout';
import ItemsRow from './components/ItemsRow';

function Home() {
  const items = new Array(4).fill().map((arr, index) => ({
    title: 'Nike Air',
    price: 180.00,
    previousPrice: 249.00,
    colors: index % 3 ? ['#fff', '#df6e44', '#000'] : ['#000', '#ae64f0'],
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e9d41cd4-a2c5-4ca7-a3aa-f4bf597658d0/custom-nike-air-force-1-mid-by-you-shoes.png',
    isNew: index % 2,
    isHot: index % 3,
  }));

  return (
    <AppLayout>
      <Card className="mb-8">
        <h1 className="text-xl">This is Main Content</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          numquam sunt ut alias aliquam sapiente tenetur rem dolore, officiis
          placeat minus ratione dignissimos labore tempora error harum quidem
          rerum odio.
        </p>
      </Card>

      <ItemsRow items={items} />
    </AppLayout>
  );
}

export default Home;
