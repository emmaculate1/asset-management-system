import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState('admin'); // 'admin' or 'user'

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === 'admin' ? 'user' : 'admin'));
  };

  const user = {
    role,
    name: role === 'admin' ? 'John Admin' : 'Hello, Jane!',
    avatar: role === 'admin' ? 'https://ui-avatars.com/api/?name=John+Admin&background=0D8ABC&color=fff' : 'https://ui-avatars.com/api/?name=Jane+Doe&background=ffb3b3&color=fff',
  };

  return (
    <UserContext.Provider value={{ user, toggleRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
