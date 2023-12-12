import { Switch } from 'antd';
import { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import AppLayout from '@/layouts/Layout';
import Carousel from '@/components/carousel';
import ItemsRow from '@/components/reusables/ItemsRow';
import Jumbotron from '@/components/reusables/Jumbotron';

function Home() {
  const items = new Array(4).fill().map((arr, index) => ({
    id: index,
    title: 'Nike Air',
    price: 180.0,
    previousPrice: 249.0,
    colors:
      index % 3
        ? ['bg-[#fff]', 'bg-[#df6e44]', 'bg-[#000]']
        : ['bg-[#000]', 'bg-[#ae64f0]'],
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e9d41cd4-a2c5-4ca7-a3aa-f4bf597658d0/custom-nike-air-force-1-mid-by-you-shoes.png',
    isNew: !!(index % 2),
    isHot: !!(index % 3),
  }));

  const slides = [
    {
      id: 1,
      image: '/assets/sliders/slide1.jpg',
      content: null,
    },
    {
      id: 2,
      image: '/assets/sliders/slide2.jpg',
      content: null,
    },
    {
      id: 3,
      image: '/assets/sliders/slide1.jpg',
      content: null,
    },
  ];
  const [profilerEnabled, setProfilerEnabled] = useState(localStorage.getItem('enable-profiler'));
  const toggleProfiler = (value) => {
    setProfilerEnabled(value);
    localStorage.setItem('enable-profiler', value ? 1 : 0);
  };

  return (
    <AppLayout>
      <div className="absolute right-0 top-50 z-10">
        <label
          htmlFor="profiler"
          className="mr-1 cursor-pointer"
        >
          Profiler
        </label>
        <Switch
          id="profiler"
          defaultChecked={Number(profilerEnabled)}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={toggleProfiler}
        />
      </div>

      <Carousel
        slides={slides}
        dotsOffset={4}
      />

      {/* Top Picks */}
      <section className="mx-20 my-20">
        <ItemsRow sectionTitle="Top Picks For You" items={items} carousel />
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
        <ItemsRow sectionTitle="Trending Now" items={items} carousel />
      </section>
    </AppLayout>
  );
}

export default Home;
