import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Megaphone, 
  Clock, 
  CheckCircle2, 
  Globe, 
  Contact, 
  FileText, 
  Shield 
} from 'lucide-react';
import './styles/Sidebar.css'

const Sidebar = () => {
  const navItems = [
    { 
      path: "/ads-dashboard", 
      icon: <Megaphone className="icon" />, 
      label: "Ads" 
    },
    { 
      path: "/pending-dashboard", 
      icon: <Clock className="icon" />, 
      label: "Pending Ads" 
    },
    { 
      path: "/approved-dashboard", 
      icon: <CheckCircle2 className="icon" />, 
      label: "Approved Ads" 
    },
    { 
      path: "/websites-dashboard", 
      icon: <Globe className="icon" />, 
      label: "Websites" 
    }
  ];

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <Link to='/dashboard' className="sidebar-header">
        <LayoutDashboard className="icon" />
        <h2 className="title">Yepper</h2>
      </Link>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive ? 'active' : ''
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="sidebar-footer">
        {[ 
          { path: '/contact', icon: <Contact className="icon" />, label: 'Contact' },
          { path: '/terms', icon: <FileText className="icon" />, label: 'Terms' },
          { path: '/privacy', icon: <Shield className="icon" />, label: 'Privacy' }
        ].map((link) => (
          <Link 
            key={link.path} 
            to={link.path} 
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
