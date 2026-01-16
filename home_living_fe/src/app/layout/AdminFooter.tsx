import React from 'react';

const AdminFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer">
      <p>&copy; {currentYear} Home Living. All rights reserved.</p>
    </footer>
  );
};

export default AdminFooter;
