import React, { useState } from 'react';
import AdminNavbarLayout from '../../layout/AdminNavbarLayout';
import Pagination from '../../components/Pagination';
import '../../../assets/css/feedback-management.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

interface Feedback {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  rating: number;
  status: 'new' | 'read' | 'replied';
  createdDate: string;
}

const FeedbackManagement: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      subject: 'Sản phẩm tuyệt vời',
      message: 'Sản phẩm chất lượng rất tốt, giao hàng nhanh',
      rating: 5,
      status: 'new',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      subject: 'Vấn đề với đơn hàng',
      message: 'Sản phẩm bị hỏng khi giao',
      rating: 2,
      status: 'read',
      createdDate: '2024-01-14'
    },
    {
      id: 3,
      name: 'Phạm Văn C',
      email: 'phamvanc@email.com',
      subject: 'Đề xuất sản phẩm mới',
      message: 'Bạn nên bán thêm các loại ghế gaming',
      rating: 4,
      status: 'replied',
      createdDate: '2024-01-13'
    },
    {
      id: 4,
      name: 'Lê Thị D',
      email: 'lethid@email.com',
      subject: 'Hỏi về bảo hành',
      message: 'Sản phẩm có bảo hành bao lâu?',
      rating: 3,
      status: 'new',
      createdDate: '2024-01-12'
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      subject: 'Cảm ơn dịch vụ',
      message: 'Dịch vụ khách hàng rất tuyệt vời',
      rating: 5,
      status: 'read',
      createdDate: '2024-01-11'
    },
    {
      id: 6,
      name: 'Võ Thị F',
      email: 'vothif@email.com',
      subject: 'Giá cả quá cao',
      message: 'Giá sản phẩm cao hơn các cửa hàng khác',
      rating: 2,
      status: 'new',
      createdDate: '2024-01-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: any) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (id: number, newStatus: Feedback['status']) => {
    setFeedbacks(feedbacks.map(f =>
      f.id === id ? { ...f, status: newStatus } : f
    ));
    toast.success('Cập nhật trạng thái phản hồi thành công');
  };

  const handleViewFeedback = (feedback: Feedback) => {
    Swal.fire({
      title: feedback.subject,
      html: `
        <div style="text-align: left;">
          <p><strong>Từ:</strong> ${feedback.name} (${feedback.email})</p>
          <p><strong>Đánh giá:</strong> ${'⭐'.repeat(feedback.rating)}</p>
          <p><strong>Nội dung:</strong></p>
          <p>${feedback.message}</p>
        </div>
      `,
      confirmButtonText: 'Đóng'
    });
  };

  const handleDeleteFeedback = (id: number) => {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa phản hồi này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.isConfirmed) {
        setFeedbacks(feedbacks.filter(f => f.id !== id));
        toast.success('Xóa phản hồi thành công');
      }
    });
  };

  const getStatusColor = (status: Feedback['status']) => {
    switch (status) {
      case 'new':
        return 'warning';
      case 'read':
        return 'inactive';
      case 'replied':
        return 'active';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Feedback['status']) => {
    switch (status) {
      case 'new':
        return 'Mới';
      case 'read':
        return 'Đã đọc';
      case 'replied':
        return 'Đã trả lời';
      default:
        return status;
    }
  };

  return (
    <AdminNavbarLayout>
      <div className="products-management">
        <div className="management-header">
          <h1>Quản Lý Phản Hồi</h1>
        </div>

        <div className="management-filters">
          <div className="search-box">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm phản hồi..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Mới</option>
            <option value="read">Đã đọc</option>
            <option value="replied">Đã trả lời</option>
          </select>
        </div>

        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Chủ đề</th>
                <th>Đánh giá</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFeedbacks.length > 0 ? (
                paginatedFeedbacks.map(feedback => (
                  <tr key={feedback.id}>
                    <td className="product-name">{feedback.name}</td>
                    <td>{feedback.email}</td>
                    <td>{feedback.subject}</td>
                    <td>{'⭐'.repeat(feedback.rating)}</td>
                    <td>
                      <select
                        className={`status-badge ${getStatusColor(feedback.status)}`}
                        value={feedback.status}
                        onChange={(e) => handleStatusChange(feedback.id, e.target.value as Feedback['status'])}
                        style={{ cursor: 'pointer', border: 'none', padding: '6px 12px', borderRadius: '20px' }}
                      >
                        <option value="new">Mới</option>
                        <option value="read">Đã đọc</option>
                        <option value="replied">Đã trả lời</option>
                      </select>
                    </td>
                    <td>{feedback.createdDate}</td>
                    <td className="product-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => handleViewFeedback(feedback)}
                        title="Xem chi tiết"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteFeedback(feedback.id)}
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
                    Không tìm thấy phản hồi
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredFeedbacks.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </AdminNavbarLayout>
  );
};

export default FeedbackManagement;
