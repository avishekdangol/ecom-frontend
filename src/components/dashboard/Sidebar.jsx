import { Link } from 'react-router-dom';
import sidebarMenuList from './sidebarMenuList';
import '@/scss/sidebar.scss';

const isActive = (pathname) => (window.location.pathname === pathname ? 'active' : '');

function Sidebar() {
  return (
    <div className="dashboard-sidebar">
      {
        sidebarMenuList.map((item) => (
          <Link
            to={item.path}
            key={item.path}
          >
            <div className={`sidebar-item flex items-center p-4 ${isActive(item.path)}`}>
              <div className="text-xl mb-1">
                {item.icon}
              </div>
              <h6 className="ml-1">{item.title}</h6>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default Sidebar;
