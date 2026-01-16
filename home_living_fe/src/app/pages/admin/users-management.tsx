import React, { useState } from 'react';
import AdminNavbarLayout from '../../layout/AdminNavbarLayout';
import Pagination from '../../components/Pagination';
import '../../../assets/css/users-management.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdDate: string;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      role: 'admin',
      status: 'active',
      createdDate: '2024-01-10'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0912345678',
      role: 'user',
      status: 'active',
      createdDate: '2024-01-09'
    },
    {
      id: 3,
      name: 'Phạm Văn C',
      email: 'phamvanc@email.com',
      phone: '0923456789',
      role: 'user',
      status: 'active',
      createdDate: '2024-01-08'
    },
    {
      id: 4,
      name: 'Lê Thị D',
      email: 'lethid@email.com',
      phone: '0934567890',
      role: 'user',
      status: 'inactive',
      createdDate: '2024-01-07'
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      phone: '0945678901',
      role: 'user',
      status: 'active',
      createdDate: '2024-01-06'
    },
    {
      id: 6,
      name: 'Võ Thị F',
      email: 'vothif@email.com',
      phone: '0956789012',
      role: 'user',
      status: 'active',
      createdDate: '2024-01-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
  }>({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active'
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', phone: '', role: 'user', status: 'active' });
    setShowModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    });
    setShowModal(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: 'all' | 'active' | 'inactive') => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (editingUser) {
      setUsers(users.map(u =>
        u.id === editingUser.id
          ? {
              ...u,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              role: formData.role,
              status: formData.status
            }
          : u
      ));
      toast.success('Cập nhật người dùng thành công');
    } else {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      toast.success('Thêm người dùng thành công');
    }
    setShowModal(false);
  };

  const handleDeleteUser = (id: number) => {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa người dùng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.isConfirmed) {
        setUsers(users.filter(u => u.id !== id));
        toast.success('Xóa người dùng thành công');
      }
    });
  };

  return (
    <AdminNavbarLayout>
      <div className="products-management">
        <div className="management-header">
          <h1>Quản Lý Người Dùng</h1>
          <button className="btn-add-product" onClick={handleAddUser}>
            <i className="fa-solid fa-plus"></i> Thêm Người Dùng
          </button>
        </div>

        <div className="management-filters">
          <div className="search-box">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value as any)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Ngừng hoạt động</option>
          </select>
        </div>

        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map(user => (
                  <tr key={user.id}>
                    <td className="product-name">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`status-badge ${user.role === 'admin' ? 'active' : 'inactive'}`}>
                        {user.role === 'admin' ? 'Admin' : 'Người dùng'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                      </span>
                    </td>
                    <td>{user.createdDate}</td>
                    <td className="product-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditUser(user)}
                        title="Chỉnh sửa"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Xóa"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="no-data">
                    Không tìm thấy người dùng
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredUsers.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Tên người dùng</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập tên người dùng"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập email"
                  />
                </div>

                <div className="form-group">
                  <label>Điện thoại</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Vai trò</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    >
                      <option value="user">Người dùng</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                      <option value="active">Đang hoạt động</option>
                      <option value="inactive">Ngừng hoạt động</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button className="btn-save" onClick={handleSaveUser}>
                  {editingUser ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminNavbarLayout>
  );
};

export default UsersManagement;
