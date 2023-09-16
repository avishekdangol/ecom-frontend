import { Card } from 'antd';
import AppLayout from '@/layouts/Layout';
import ItemsRow from '@/components/reusables/ItemsRow';
import Jumbotron from '@/components/reusables/Jumbotron';

function Home() {
  const items = new Array(4).fill().map((arr, index) => ({
    title: 'Nike Air',
    price: 180.00,
    previousPrice: 249.00,
    colors: index % 3 ? ['bg-[#fff]', 'bg-[#df6e44]', 'bg-[#000]'] : ['bg-[#000]', 'bg-[#ae64f0]'],
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

      {/* Top Picks */}
      <section className="mx-20 my-20">
        <h2 className="text-xl mb-4">Top Picks For You</h2>
        <ItemsRow items={items} />
      </section>

      {/* Jumbotron */}
      <Jumbotron
        title="TOP QUALITY"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti numquam sunt ut alias aliquam sapiente tenetur rem dolore, officiis placeat minus ratione dignissimos labore tempora error harum quidem rerum odio."
        button="Call To Action"
        backgroundColor="#ffd7a8"
        image="https://images.unsplash.com/photo-1600774236989-a383d15c2e8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
      />

      {/* Trending */}
      <section className="mx-20 my-20">
        <h2 className="text-xl mb-4">Trending Now</h2>
        <ItemsRow items={items} />
      </section>
    </AppLayout>
  );
}

export default Home;