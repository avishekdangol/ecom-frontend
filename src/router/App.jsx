import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import routes from './routes';

function App() {
  const [profilerEnabled, setProfilerEnabled] = useState(localStorage.getItem('enable-profiler'));
  const toggleProfiler = (value) => {
    setProfilerEnabled(value);
    localStorage.setItem('enable-profiler', value ? 1 : 0);
  };

  return (
    <>
      <div className="absolute right-0 mt-[70px] z-10">
        <label
          htmlFor="profiler"
          className="mr-1 cursor-pointer"
        >
          Profiler
        </label>
        <Switch
          id="profiler"
          defaultChecked={Number(profilerEnabled)}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={toggleProfiler}
        />
      </div>

      <Routes>
        {
        routes.map((route) => (
          <Route key={route.name} path={route.path} element={route.element}>
            {
              route.middleware?.length ? (
                <Route index element={route.component} />
              ) : ''
            }
          </Route>
        ))
      }
      </Routes>
    </>
  );
}

export default App;
