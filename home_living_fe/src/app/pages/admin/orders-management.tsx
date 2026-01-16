import React, { useState } from 'react';
import AdminNavbarLayout from '../../layout/AdminNavbarLayout';
import Pagination from '../../components/Pagination';
import '../../../assets/css/orders-management.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

interface Order {
  id: number;
  orderCode: string;
  customer: string;
  email: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdDate: string;
}

const OrdersManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderCode: 'ORD001',
      customer: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      amount: 2500000,
      status: 'completed',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      orderCode: 'ORD002',
      customer: 'Trần Thị B',
      email: 'tranthib@email.com',
      amount: 1800000,
      status: 'pending',
      createdDate: '2024-01-14'
    },
    {
      id: 3,
      orderCode: 'ORD003',
      customer: 'Phạm Văn C',
      email: 'phamvanc@email.com',
      amount: 3200000,
      status: 'processing',
      createdDate: '2024-01-14'
    },
    {
      id: 4,
      orderCode: 'ORD004',
      customer: 'Lê Thị D',
      email: 'lethid@email.com',
      amount: 950000,
      status: 'completed',
      createdDate: '2024-01-13'
    },
    {
      id: 5,
      orderCode: 'ORD005',
      customer: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      amount: 4100000,
      status: 'cancelled',
      createdDate: '2024-01-13'
    },
    {
      id: 6,
      orderCode: 'ORD006',
      customer: 'Võ Thị F',
      email: 'vothif@email.com',
      amount: 1500000,
      status: 'pending',
      createdDate: '2024-01-12'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

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

  const handleStatusChange = (id: number, newStatus: Order['status']) => {
    setOrders(orders.map(o =>
      o.id === id ? { ...o, status: newStatus } : o
    ));
    toast.success('Cập nhật trạng thái đơn hàng thành công');
  };

  const handleDeleteOrder = (id: number) => {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa đơn hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.isConfirmed) {
        setOrders(orders.filter(o => o.id !== id));
        toast.success('Xóa đơn hàng thành công');
      }
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'processing':
        return 'Đang xử lý';
      case 'pending':
        return 'Chờ xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <AdminNavbarLayout>
      <div className="products-management">
        <div className="management-header">
          <h1>Quản Lý Đơn Hàng</h1>
        </div>

        <div className="management-filters">
          <div className="search-box">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
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
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map(order => (
                  <tr key={order.id}>
                    <td className="product-name">{order.orderCode}</td>
                    <td>{order.customer}</td>
                    <td>{order.email}</td>
                    <td className="product-price">{formatCurrency(order.amount)}</td>
                    <td>
                      <select
                        className={`status-badge ${getStatusColor(order.status)}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        style={{ cursor: 'pointer', border: 'none', padding: '6px 12px', borderRadius: '20px' }}
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>
                    <td>{order.createdDate}</td>
                    <td className="product-actions">
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteOrder(order.id)}
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
                    Không tìm thấy đơn hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredOrders.length > 0 && (
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

export default OrdersManagement;
