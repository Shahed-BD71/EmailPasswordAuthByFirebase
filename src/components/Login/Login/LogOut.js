import React from 'react';

const LogOut = ({handleLogOut}) => {
  return (
    <section>
      <nav>
        <h3>Welcome</h3>
        <button onClick={handleLogOut}>Logout</button>
      </nav>
    </section>
  );
};

export default LogOut;