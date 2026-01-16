import React, { useState } from 'react';
import AdminNavbarLayout from '../../layout/AdminNavbarLayout';
import Pagination from '../../components/Pagination';
import '../../../assets/css/categories-management.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdDate: string;
}

const CategoriesManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Sofa',
      description: 'Các loại sofa cao cấp',
      productCount: 45,
      status: 'active',
      createdDate: '2024-01-10'
    },
    {
      id: 2,
      name: 'Bàn',
      description: 'Bàn ăn, bàn làm việc',
      productCount: 38,
      status: 'active',
      createdDate: '2024-01-09'
    },
    {
      id: 3,
      name: 'Tủ',
      description: 'Tủ kệ, tủ quần áo',
      productCount: 52,
      status: 'active',
      createdDate: '2024-01-08'
    },
    {
      id: 4,
      name: 'Giường',
      description: 'Giường ngủ cao cấp',
      productCount: 28,
      status: 'active',
      createdDate: '2024-01-07'
    },
    {
      id: 5,
      name: 'Ghế',
      description: 'Ghế ngồi, ghế công thái học',
      productCount: 35,
      status: 'active',
      createdDate: '2024-01-06'
    },
    {
      id: 6,
      name: 'Đèn',
      description: 'Đèn trang trí, đèn chiếu sáng',
      productCount: 42,
      status: 'inactive',
      createdDate: '2024-01-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    status: 'active' | 'inactive';
  }>({
    name: '',
    description: '',
    status: 'active'
  });

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || category.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', status: 'active' });
    setShowModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status
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

  const handleSaveCategory = () => {
    if (!formData.name || !formData.description) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (editingCategory) {
      setCategories(categories.map(c =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: formData.name,
              description: formData.description,
              status: formData.status
            }
          : c
      ));
      toast.success('Cập nhật danh mục thành công');
    } else {
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id), 0) + 1,
        name: formData.name,
        description: formData.description,
        productCount: 0,
        status: formData.status,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
      toast.success('Thêm danh mục thành công');
    }
    setShowModal(false);
  };

  const handleDeleteCategory = (id: number) => {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa danh mục này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.isConfirmed) {
        setCategories(categories.filter(c => c.id !== id));
        toast.success('Xóa danh mục thành công');
      }
    });
  };

  return (
    <AdminNavbarLayout>
      <div className="products-management">
        <div className="management-header">
          <h1>Quản Lý Danh Mục</h1>
          <button className="btn-add-product" onClick={handleAddCategory}>
            <i className="fa-solid fa-plus"></i> Thêm Danh Mục
          </button>
        </div>

        <div className="management-filters">
          <div className="search-box">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
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
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Số sản phẩm</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map(category => (
                  <tr key={category.id}>
                    <td className="product-name">{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.productCount}</td>
                    <td>
                      <span className={`status-badge ${category.status}`}>
                        {category.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                      </span>
                    </td>
                    <td>{category.createdDate}</td>
                    <td className="product-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditCategory(category)}
                        title="Chỉnh sửa"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteCategory(category.id)}
                        title="Xóa"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-data">
                    Không tìm thấy danh mục
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredCategories.length > 0 && (
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
                <h2>{editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Tên danh mục</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập tên danh mục"
                  />
                </div>

                <div className="form-group">
                  <label>Mô tả</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Nhập mô tả"
                  />
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

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button className="btn-save" onClick={handleSaveCategory}>
                  {editingCategory ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminNavbarLayout>
  );
};

export default CategoriesManagement;
