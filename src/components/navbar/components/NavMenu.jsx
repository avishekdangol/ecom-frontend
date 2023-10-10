import { Button, Dropdown , Row , Col , Space} from "antd";
import { HiMenuAlt4 } from "react-icons/hi";

function NavMenu() {
  const items = [
    {
      key: "1",
      label: (
        <Row>
           <Col span={12} className="w-96 h-96">
             <div className="p-5">
               <ul>
                 <h4>title name</h4>
                 <li><a href="/">nav menu</a></li>
                 <li>nav menu</li>
                 <li>nav menu</li>
                 <li>nav menu</li>
               </ul>
             </div>
           </Col>
          <Col span={12}>
          <div className="p-5">
               <ul>
                 <h4>title name</h4>
                 <li><a href="/">nav menu</a></li>
                 <li>nav menu</li>
                 <li>nav menu</li>
                 <li>nav menu</li>
               </ul>
             </div>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomLeft" trigger="click" arrow>
      <Button className="flex items-center justify-center" shape="round">
        <HiMenuAlt4 className="me-1" />
        Menu
      </Button>
    </Dropdown>
  );
}

export default NavMenu;
