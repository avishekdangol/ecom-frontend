import {
  Row, Col, Button, Input,
} from 'antd';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      <Row className="bg-gray-700 p-12">
        <Col span={12}>
          <Link to="/">
            <img className="logo cursor-pointer" src="assets/images/logo.png" width={120} alt="" />
          </Link>
          <p className="ml-4">Slogan goes here ...</p>
        </Col>

        <Col span={12}>
          <Row>
            <Col span={8}>
              <ul className="list-none">
                <li className="mb-4">
                  <a href="#.">Products</a>
                </li>
                <li className="mb-4">
                  <a href="#.">About</a>
                </li>
                <li className="mb-4">
                  <a href="#.">Terms & Conditions</a>
                </li>
                <li className="mb-4">
                  <a href="#.">Privacy Policy</a>
                </li>
              </ul>
            </Col>

            <Col span={16}>
              <h5 className="text-base">Subscribe to our newsletter</h5>
              <p>Be the first one to get our latest updates!</p>
              <div className="flex mt-4">
                <Input placeholder="Email address" />
                <Button className="secondary-btn ml-2">Subscribe</Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="flex justify-between bg-gray-800 text-white py-4 px-14">
        <p>
          Copyright &copy;
          {' '}
          {year}
        &nbsp;Superior

        </p>

        <div className="flex">
          <a className="mx-2 text-sky-700 hover:text-sky-500" href="#.">
            <BsFacebook size={20} />
          </a>

          <a className="mx-2 text-red-700 hover:text-red-500" href="#.">
            <BsInstagram size={20} />
          </a>
        </div>
      </div>
    </>
  );
}

export default AppFooter;
