import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function Auth() {
  const { authType } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto bg-default">
      <div className={`border rounded-xl shadow drop-shadow-lg h-[450px] bg-white p-4 ${authType === 'login' ? 'w-80' : 'w-2/5'}`}>
        <Link to="/">
          <img className="logo cursor-pointer mx-auto mb-8" src="assets/images/logo.png" width={150} alt="" />
        </Link>

        { authType === 'login'
          ? <Login />
          : <Register />}
      </div>
    </div>
  );
}

export default Auth;
