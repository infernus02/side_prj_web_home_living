import React, { useState } from 'react';
import AdminNavbarLayout from '../../layout/AdminNavbarLayout';
import Pagination from '../../components/Pagination';
import '../../../assets/css/blogs-management.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

interface Blog {
  id: number;
  title: string;
  author: string;
  category: string;
  views: number;
  status: 'published' | 'draft';
  createdDate: string;
}

const BlogsManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: 'Cách chọn sofa phù hợp cho phòng khách',
      author: 'Nguyễn Văn A',
      category: 'Trang trí',
      views: 1250,
      status: 'published',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Xu hướng nội thất 2024',
      author: 'Trần Thị B',
      category: 'Xu hướng',
      views: 2100,
      status: 'published',
      createdDate: '2024-01-14'
    },
    {
      id: 3,
      title: 'Bảo vệ và bảo dưỡng nội thất gỗ',
      author: 'Phạm Văn C',
      category: 'Hướng dẫn',
      views: 890,
      status: 'published',
      createdDate: '2024-01-13'
    },
    {
      id: 4,
      title: 'Thiết kế phòng ngủ hiện đại',
      author: 'Lê Thị D',
      category: 'Thiết kế',
      views: 450,
      status: 'draft',
      createdDate: '2024-01-12'
    },
    {
      id: 5,
      title: 'Không gian làm việc tại nhà',
      author: 'Hoàng Văn E',
      category: 'Hướng dẫn',
      views: 1680,
      status: 'published',
      createdDate: '2024-01-11'
    },
    {
      id: 6,
      title: 'Màu sắc trong nội thất',
      author: 'Võ Thị F',
      category: 'Trang trí',
      views: 320,
      status: 'draft',
      createdDate: '2024-01-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState<{
    title: string;
    author: string;
    category: string;
    status: 'published' | 'draft';
  }>({
    title: '',
    author: '',
    category: '',
    status: 'draft'
  });

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleAddBlog = () => {
    setEditingBlog(null);
    setFormData({ title: '', author: '', category: '', status: 'draft' });
    setShowModal(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      category: blog.category,
      status: blog.status
    });
    setShowModal(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: 'all' | 'published' | 'draft') => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handleSaveBlog = () => {
    if (!formData.title || !formData.author || !formData.category) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (editingBlog) {
      setBlogs(blogs.map(b =>
        b.id === editingBlog.id
          ? {
              ...b,
              title: formData.title,
              author: formData.author,
              category: formData.category,
              status: formData.status
            }
          : b
      ));
      toast.success('Cập nhật bài viết thành công');
    } else {
      const newBlog: Blog = {
        id: Math.max(...blogs.map(b => b.id), 0) + 1,
        title: formData.title,
        author: formData.author,
        category: formData.category,
        views: 0,
        status: formData.status,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setBlogs([...blogs, newBlog]);
      toast.success('Thêm bài viết thành công');
    }
    setShowModal(false);
  };

  const handleDeleteBlog = (id: number) => {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa bài viết này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.isConfirmed) {
        setBlogs(blogs.filter(b => b.id !== id));
        toast.success('Xóa bài viết thành công');
      }
    });
  };

  return (
    <AdminNavbarLayout>
      <div className="products-management">
        <div className="management-header">
          <h1>Quản Lý Blog</h1>
          <button className="btn-add-product" onClick={handleAddBlog}>
            <i className="fa-solid fa-plus"></i> Thêm Bài Viết
          </button>
        </div>

        <div className="management-filters">
          <div className="search-box">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
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
            <option value="published">Đã xuất bản</option>
            <option value="draft">Nháp</option>
          </select>
        </div>

        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Tác giả</th>
                <th>Danh mục</th>
                <th>Lượt xem</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBlogs.length > 0 ? (
                paginatedBlogs.map(blog => (
                  <tr key={blog.id}>
                    <td className="product-name">{blog.title}</td>
                    <td>{blog.author}</td>
                    <td>{blog.category}</td>
                    <td>{blog.views.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${blog.status === 'published' ? 'active' : 'inactive'}`}>
                        {blog.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                      </span>
                    </td>
                    <td>{blog.createdDate}</td>
                    <td className="product-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditBlog(blog)}
                        title="Chỉnh sửa"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteBlog(blog.id)}
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
                    Không tìm thấy bài viết
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredBlogs.length > 0 && (
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
                <h2>{editingBlog ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Tiêu đề</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Nhập tiêu đề"
                  />
                </div>

                <div className="form-group">
                  <label>Tác giả</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Nhập tên tác giả"
                  />
                </div>

                <div className="form-group">
                  <label>Danh mục</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Nhập danh mục"
                  />
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="draft">Nháp</option>
                    <option value="published">Đã xuất bản</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button className="btn-save" onClick={handleSaveBlog}>
                  {editingBlog ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminNavbarLayout>
  );
};

export default BlogsManagement;
