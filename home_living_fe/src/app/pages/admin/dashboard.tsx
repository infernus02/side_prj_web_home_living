import React from 'react';
import AdminNavbarLayout from '../../layout/AdminNavbarLayout';
import { LineChart, BarChart, PieChart } from '../../components/Charts';
import '../../../assets/css/admin.css';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

interface RecentOrder {
  id: number;
  customer: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

const AdminDashboard: React.FC = () => {
  const stats: DashboardStats = {
    totalUsers: 1234,
    totalProducts: 567,
    totalOrders: 2891,
    totalRevenue: 125000000
  };

  const recentOrders: RecentOrder[] = [
    {
      id: 1001,
      customer: 'Nguyễn Văn A',
      amount: 2500000,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 1002,
      customer: 'Trần Thị B',
      amount: 1800000,
      date: '2024-01-14',
      status: 'pending'
    },
    {
      id: 1003,
      customer: 'Phạm Văn C',
      amount: 3200000,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 1004,
      customer: 'Lê Thị D',
      amount: 950000,
      date: '2024-01-13',
      status: 'pending'
    },
    {
      id: 1005,
      customer: 'Hoàng Văn E',
      amount: 4100000,
      date: '2024-01-13',
      status: 'cancelled'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Đang xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <AdminNavbarLayout>
      {/* Stats Cards */}
      <section className="stats-section">
        <h2>Thống Kê Chung</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng Khách Hàng</p>
              <p className="stat-value">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon products">
              <i className="fa-solid fa-box"></i>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng Sản Phẩm</p>
              <p className="stat-value">{stats.totalProducts.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orders">
              <i className="fa-solid fa-list"></i>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng Đơn Hàng</p>
              <p className="stat-value">{stats.totalOrders.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <i className="fa-solid fa-chart-bar"></i>
            </div>
            <div className="stat-content">
              <p className="stat-label">Tổng Doanh Thu</p>
              <p className="stat-value">{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="orders-section">
        <div className="section-header">
          <h2>Đơn Hàng Gần Đây</h2>
          <a href="/" onClick={(e) => e.preventDefault()} className="view-all">
            Xem tất cả →
          </a>
        </div>

        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Khách Hàng</th>
                <th>Ngày Đặt</th>
                <th>Số Tiền</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td className="order-id">#{order.id}</td>
                  <td className="customer-name">{order.customer}</td>
                  <td className="order-date">{formatDate(order.date)}</td>
                  <td className="order-amount">{formatCurrency(order.amount)}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="order-actions">
                    <button className="action-btn view" title="Xem chi tiết">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button className="action-btn edit" title="Chỉnh sửa">
                      <i className="fa-solid fa-edit"></i>
                    </button>
                    <button className="action-btn delete" title="Xóa">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <div className="charts-grid">
          <div className="chart-card">
            <LineChart
              title="Doanh Thu Theo Tháng"
              data={{
                labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
                datasets: [
                  {
                    label: 'Doanh Thu (Triệu VND)',
                    data: [12, 19, 15, 25, 22, 30],
                    borderColor: '#ff6b5b',
                    backgroundColor: 'rgba(255, 107, 91, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ff6b5b',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                  }
                ]
              }}
            />
          </div>

          <div className="chart-card">
            <BarChart
              title="Số Đơn Hàng Theo Danh Mục"
              data={{
                labels: ['Sofa', 'Bàn', 'Tủ', 'Giường', 'Ghế'],
                datasets: [
                  {
                    label: 'Số Đơn Hàng',
                    data: [45, 38, 52, 41, 35],
                    backgroundColor: [
                      'rgba(255, 107, 91, 0.8)',
                      'rgba(102, 126, 234, 0.8)',
                      'rgba(240, 147, 251, 0.8)',
                      'rgba(79, 172, 254, 0.8)',
                      'rgba(250, 112, 154, 0.8)'
                    ],
                    borderColor: [
                      '#ff6b5b',
                      '#667eea',
                      '#f093fb',
                      '#4facfe',
                      '#fa709a'
                    ],
                    borderWidth: 1,
                    borderRadius: 6
                  }
                ]
              }}
            />
          </div>

          <div className="chart-card">
            <PieChart
              title="Tỷ Lệ Trạng Thái Đơn Hàng"
              data={{
                labels: ['Hoàn thành', 'Đang xử lý', 'Đã hủy'],
                datasets: [
                  {
                    data: [65, 25, 10],
                    backgroundColor: [
                      'rgba(212, 237, 218, 1)',
                      'rgba(255, 243, 205, 1)',
                      'rgba(248, 215, 218, 1)'
                    ],
                    borderColor: [
                      '#155724',
                      '#856404',
                      '#721c24'
                    ],
                    borderWidth: 2
                  }
                ]
              }}
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <h2>Hành Động Nhanh</h2>
        <div className="actions-grid">
          <button className="action-card">
            <i className="fa-solid fa-plus"></i>
            <span>Thêm Sản Phẩm</span>
          </button>
          <button className="action-card">
            <i className="fa-solid fa-plus"></i>
            <span>Thêm Danh Mục</span>
          </button>
          <button className="action-card">
            <i className="fa-solid fa-plus"></i>
            <span>Thêm Bài Blog</span>
          </button>
          <button className="action-card">
            <i className="fa-solid fa-download"></i>
            <span>Xuất Báo Cáo</span>
          </button>
        </div>
      </section>
    </AdminNavbarLayout>
  );
};

export default AdminDashboard;
