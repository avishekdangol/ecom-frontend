import { Card } from "antd";
import AppLayout from "@/layouts/Layout";

const Home = () => {
  return (
    <>
      <AppLayout>
        <Card>
          <h1 className="text-xl">This is Main Content</h1>
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
