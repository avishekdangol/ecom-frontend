import {
  Card, Row, Col, Button,
} from 'antd';
import PropTypes from 'prop-types';

function Jumbotron({
  title, backgroundColor, image, description, button, height,
}) {
  const jumboStyle = {
    backgroundColor, width: '100vw', height, padding: 0,
  };
  return (
    <Card
      bordered={false}
      style={jumboStyle}
      bodyStyle={{ padding: 0 }}
    >
      <Row>
        <Col span={12} className="flex flex-col px-24 justify-center">
          <h2 className="text-[48px] mb-4">{ title }</h2>
          <p>{ description }</p>

          <div>
            { button ? (
              <Button
                className="secondary-btn mt-8"
                shape="round"
              >
                {button}
              </Button>
            ) : ''}
          </div>
        </Col>
        <Col span={12}>
          <div className="float-right" style={{ height }}>
            <img className="object-contain h-full w-full" src={image} alt="" />
          </div>
        </Col>
      </Row>
    </Card>
  );
}

Jumbotron.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  button: PropTypes.string,
  backgroundColor: PropTypes.string,
  image: PropTypes.string.isRequired,
  height: PropTypes.string,
};

Jumbotron.defaultProps = {
  description: '',
  backgroundColor: null,
  button: null,
  height: '540px',
};

export default Jumbotron;
