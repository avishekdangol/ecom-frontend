import AppLayout from '@/layouts/Layout';
import ItemsRow from '@/components/reusables/ItemsRow';

function Products() {
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
    isWishlisted: false
  }));

  return (
    <AppLayout>
      <div className="w-full h-[320px]">
        <img className="w-full h-full object-cover" src="/assets/sliders/slide1.jpg" alt="" />
      </div>

      {/* Products List */}
      <section className="mx-20 my-8">
        <ItemsRow sectionTitle="Category Name" items={items} />
      </section>
    </AppLayout>
  );
}

export default Products;
