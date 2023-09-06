import { Card } from "antd";
import AppLayout from "../../layouts/layout";
import useJwt from "../../useJWT/useJwt";

const Home = () => {
  useJwt.test().then(res => {
    console.log(res)
  })
  return (
    <>
      <AppLayout>
        <Card>
          <h1>this is content</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            numquam sunt ut alias aliquam sapiente tenetur rem dolore, officiis
            placeat minus ratione dignissimos labore tempora error harum quidem
            rerum odio.
          </p>
        </Card>
      </AppLayout>
    </>
  );
};

export default Home;
