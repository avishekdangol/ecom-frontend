import { Row, Col } from "antd";

import Container from "@/components/reusables/container";

const Featured = () => {
  return (
    <>
      <Container>
        <Row>
            <Col span={12}>
                this featured picture
            </Col>
            <Col span={12}>
                 this featured picture
            </Col>
        </Row>
      </Container>
    </>
  );
};


export default Featured;
