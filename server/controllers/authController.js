import { createContext, useEffect, useState } from 'react';

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      const accessToken = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('accessToken='));

      if (accessToken) {
        const token = accessToken.split('=')[1];
        const parsedUser = parseUserFromToken(token);
        setUser(parsedUser);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
