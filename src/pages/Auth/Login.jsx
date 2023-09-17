import { Input, Checkbox, Button } from 'antd';
import { useState } from 'react';
import { BiUser, BiLock } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <Input
        value={email}
        className="mb-4"
        placeholder="Email"
        prefix={<BiUser />}
        onChange={handleEmailChange}
      />
      <Input
        value={password}
        className="mb-4"
        placeholder="Password"
        prefix={<BiLock />}
        onChange={handlePasswordChange}
      />
      <Checkbox onChange={() => setRemember(!remember)}>Remember Me</Checkbox>

      <Button type="primary" className="primary-btn block my-6 w-full">
        Login
      </Button>

      <p className="text-xs">
        Don&apos;t have an account?
        {' '}
        <Link
          to="/register"
          className="inline text-blue-700 underline hover:text-blue-500 hover:no-underline"
        >
          Create one.
        </Link>
      </p>
    </>
  );
}

export default Login;
