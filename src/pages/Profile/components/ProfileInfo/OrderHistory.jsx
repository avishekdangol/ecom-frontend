import { signal } from '@preact/signals-react';
import { Avatar, List, Card } from 'antd';

const orders = signal([
  {
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e9d41cd4-a2c5-4ca7-a3aa-f4bf597658d0/custom-nike-air-force-1-mid-by-you-shoes.png',
    title: 'Nike Air Jordan',
    price: 7500,
    quantity: 2,
  },
]);
const orderDescription = (item) => (
  <p>
    {'Rs. '}
    {item.price}
    {' '}
    x
    {' '}
    {item.quantity}
  </p>
);

function OrderHistory() {
  return (
    <Card>
      <h4>Order History</h4>

      <List
        pagination={{
          position: 'bottom',
          align: 'end',
          pageSize: 3,
          onChange: (page) => {
            console.log(page);
          },
        }}
        dataSource={orders.value}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image ?? ''}>{!item.image && item.name.charAt(0)}</Avatar>}
              title={item.title}
              description={orderDescription(item)}
            />
            <p>
              Rs.
              {' '}
              {item.price * item.quantity}
            </p>
          </List.Item>
        )}
      />
    </Card>
  );
}

export default OrderHistory;
