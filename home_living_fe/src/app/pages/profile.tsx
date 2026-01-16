import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/profile.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  avatar: string;
  joinDate: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    address: '123 Đường ABC',
    city: 'Hà Nội',
    district: 'Quận 1',
    ward: 'Phường 1',
    avatar: 'https://via.placeholder.com/150',
    joinDate: '2024-01-10'
  });

  const [formData, setFormData] = useState(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData(profile);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(profile);
  };

  const handleSaveProfile = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setProfile(formData);
    setIsEditing(false);
    toast.success('Cập nhật thông tin cá nhân thành công');
  };

  const handleChangePassword = () => {
    Swal.fire({
      title: 'Đổi mật khẩu',
      html: `
        <div style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Mật khẩu hiện tại</label>
            <input type="password" id="currentPassword" class="swal2-input" placeholder="Nhập mật khẩu hiện tại" style="width: 100%;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Mật khẩu mới</label>
            <input type="password" id="newPassword" class="swal2-input" placeholder="Nhập mật khẩu mới" style="width: 100%;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Xác nhận mật khẩu</label>
            <input type="password" id="confirmPassword" class="swal2-input" placeholder="Xác nhận mật khẩu" style="width: 100%;">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Đổi mật khẩu',
      cancelButtonText: 'Hủy',
      preConfirm: () => {
        const currentPassword = (document.getElementById('currentPassword') as HTMLInputElement).value;
        const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

        if (!currentPassword || !newPassword || !confirmPassword) {
          Swal.showValidationMessage('Vui lòng điền đầy đủ thông tin');
          return false;
        }

        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage('Mật khẩu mới không khớp');
          return false;
        }

        if (newPassword.length < 6) {
          Swal.showValidationMessage('Mật khẩu mới phải có ít nhất 6 ký tự');
          return false;
        }

        return true;
      }
    }).then(result => {
      if (result.isConfirmed) {
        toast.success('Đổi mật khẩu thành công');
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Đăng xuất',
      text: 'Bạn có chắc chắn muốn đăng xuất?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('currentUser');
        toast.success('Đã đăng xuất');
        navigate('/login');
      }
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Thông Tin Cá Nhân</h1>
          <p>Quản lý thông tin tài khoản của bạn</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <img src={profile.avatar} alt={profile.name} />
              <p className="profile-name">{profile.name}</p>
              <p className="profile-email">{profile.email}</p>
              <p className="profile-join-date">Tham gia từ {profile.joinDate}</p>
            </div>

            <div className="profile-actions">
              <button className="btn-action" onClick={handleEditClick}>
                <i className="fa-solid fa-edit"></i> Chỉnh sửa thông tin
              </button>
              <button className="btn-action" onClick={handleChangePassword}>
                <i className="fa-solid fa-key"></i> Đổi mật khẩu
              </button>
              <button className="btn-action logout" onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt"></i> Đăng xuất
              </button>
            </div>
          </div>

          <div className="profile-main">
            {!isEditing ? (
              <div className="profile-info">
                <div className="info-section">
                  <h2>Thông Tin Cơ Bản</h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Họ và tên</label>
                      <p>{profile.name}</p>
                    </div>
                    <div className="info-item">
                      <label>Email</label>
                      <p>{profile.email}</p>
                    </div>
                    <div className="info-item">
                      <label>Số điện thoại</label>
                      <p>{profile.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h2>Địa Chỉ</h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Địa chỉ</label>
                      <p>{profile.address}</p>
                    </div>
                    <div className="info-item">
                      <label>Thành phố</label>
                      <p>{profile.city}</p>
                    </div>
                    <div className="info-item">
                      <label>Quận/Huyện</label>
                      <p>{profile.district}</p>
                    </div>
                    <div className="info-item">
                      <label>Phường/Xã</label>
                      <p>{profile.ward}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-edit">
                <div className="edit-section">
                  <h2>Chỉnh Sửa Thông Tin Cơ Bản</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Họ và tên *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Nhập email"
                      />
                    </div>
                    <div className="form-group">
                      <label>Số điện thoại *</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>
                </div>

                <div className="edit-section">
                  <h2>Chỉnh Sửa Địa Chỉ</h2>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Địa chỉ</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ"
                      />
                    </div>
                    <div className="form-group">
                      <label>Thành phố</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Nhập thành phố"
                      />
                    </div>
                    <div className="form-group">
                      <label>Quận/Huyện</label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="Nhập quận/huyện"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phường/Xã</label>
                      <input
                        type="text"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        placeholder="Nhập phường/xã"
                      />
                    </div>
                  </div>
                </div>

                <div className="edit-actions">
                  <button className="btn-save" onClick={handleSaveProfile}>
                    <i className="fa-solid fa-check"></i> Lưu thay đổi
                  </button>
                  <button className="btn-cancel" onClick={handleCancelEdit}>
                    <i className="fa-solid fa-times"></i> Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
