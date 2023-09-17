import { Input, Button } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUser, BiLock } from 'react-icons/bi';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <Button type="primary" className="primary-btn block my-6   w-full">
        Register
      </Button>

      <p className="text-xs">
        Already have an account?
        {' '}
        <Link
          to="/login"
          className="inline text-blue-700 underline hover:text-blue-500 hover:no-underline"
        >
          Login.
        </Link>
      </p>
    </>
  );
}

export default Register;
