import React, { useState } from 'react';
import AdminNavbarLayout from '../../layout/AdminNavbarLayout';
import Pagination from '../../components/Pagination';
import '../../../assets/css/products-management.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import defaultImage from '../../../assets/images/default.jpg';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  createdDate: string;
}

const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Ghế sofa da cao cấp',
      category: 'Sofa',
      price: 15000000,
      stock: 25,
      status: 'active',
      image: defaultImage,
      createdDate: '2024-01-10'
    },
    {
      id: 2,
      name: 'Bàn ăn gỗ tự nhiên',
      category: 'Bàn',
      price: 8500000,
      stock: 15,
      status: 'active',
      image: defaultImage,
      createdDate: '2024-01-09'
    },
    {
      id: 3,
      name: 'Tủ kệ gỗ sồi',
      category: 'Tủ',
      price: 12000000,
      stock: 8,
      status: 'active',
      image: defaultImage,
      createdDate: '2024-01-08'
    },
    {
      id: 4,
      name: 'Giường ngủ cao cấp',
      category: 'Giường',
      price: 18000000,
      stock: 0,
      status: 'inactive',
      image: defaultImage,
      createdDate: '2024-01-07'
    },
    {
      id: 5,
      name: 'Tủ quần áo gỗ',
      category: 'Tủ',
      price: 9500000,
      stock: 12,
      status: 'active',
      image: defaultImage,
      createdDate: '2024-01-06'
    },
    {
      id: 6,
      name: 'Bàn làm việc',
      category: 'Bàn',
      price: 5000000,
      stock: 20,
      status: 'active',
      image: defaultImage,
      createdDate: '2024-01-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    price: string;
    stock: string;
    status: 'active' | 'inactive';
  }>({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active'
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: '', price: '', stock: '', status: 'active' });
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status
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

  const handleSaveProduct = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              price: parseInt(formData.price),
              stock: parseInt(formData.stock),
              status: formData.status
            }
          : p
      ));
      toast.success('Cập nhật sản phẩm thành công');
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        status: formData.status,
        image: defaultImage,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setProducts([...products, newProduct]);
      toast.success('Thêm sản phẩm thành công');
    }
    setShowModal(false);
  };

  const handleDeleteProduct = (id: number) => {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.isConfirmed) {
        setProducts(products.filter(p => p.id !== id));
        toast.success('Xóa sản phẩm thành công');
      }
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <AdminNavbarLayout>
      <div className="products-management">
        <div className="management-header">
          <h1>Quản Lý Sản Phẩm</h1>
          <button className="btn-add-product" onClick={handleAddProduct}>
            <i className="fa-solid fa-plus"></i> Thêm Sản Phẩm
          </button>
        </div>

        <div className="management-filters">
          <div className="search-box">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
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
            <option value="active">Đang bán</option>
            <option value="inactive">Ngừng bán</option>
          </select>
        </div>

        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt={product.name} className="product-image" />
                    </td>
                    <td className="product-name">{product.name}</td>
                    <td>{product.category}</td>
                    <td className="product-price">{formatCurrency(product.price)}</td>
                    <td>
                      <span className={`stock-badge ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${product.status}`}>
                        {product.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                      </span>
                    </td>
                    <td>{product.createdDate}</td>
                    <td className="product-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditProduct(product)}
                        title="Chỉnh sửa"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteProduct(product.id)}
                        title="Xóa"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="no-data">
                    Không tìm thấy sản phẩm
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredProducts.length > 0 && (
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
                <h2>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập tên sản phẩm"
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

                <div className="form-row">
                  <div className="form-group">
                    <label>Giá (VND)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Nhập giá"
                    />
                  </div>

                  <div className="form-group">
                    <label>Tồn kho</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="Nhập số lượng"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="active">Đang bán</option>
                    <option value="inactive">Ngừng bán</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button className="btn-save" onClick={handleSaveProduct}>
                  {editingProduct ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminNavbarLayout>
  );
};

export default ProductsManagement;
