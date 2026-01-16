import React, { useState } from 'react';
import AdminNavbarLayout from '../../layout/AdminNavbarLayout';
import '../../../assets/css/settings.css';
import { toast } from 'react-toastify';

interface Settings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  storeCity: string;
  storeCountry: string;
  currency: string;
  language: string;
  maintenanceMode: boolean;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    storeName: 'Home Living',
    storeEmail: 'info@homeliving.com',
    storePhone: '1900-xxxx',
    storeAddress: '123 Đường ABC',
    storeCity: 'Hà Nội',
    storeCountry: 'Việt Nam',
    currency: 'VND',
    language: 'vi',
    maintenanceMode: false
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Cài đặt đã được lưu thành công');
    }, 1000);
  };

  return (
    <AdminNavbarLayout>
      <div className="products-management">
        <div className="management-header">
          <h1>Cài Đặt Hệ Thống</h1>
        </div>

        <div className="settings-container">
          <div className="settings-section">
            <h2>Thông Tin Cửa Hàng</h2>
            <div className="settings-form">
              <div className="form-group">
                <label>Tên cửa hàng</label>
                <input
                  type="text"
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên cửa hàng"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="storeEmail"
                  value={settings.storeEmail}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                />
              </div>

              <div className="form-group">
                <label>Điện thoại</label>
                <input
                  type="text"
                  name="storePhone"
                  value={settings.storePhone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="storeAddress"
                  value={settings.storeAddress}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Thành phố</label>
                  <input
                    type="text"
                    name="storeCity"
                    value={settings.storeCity}
                    onChange={handleInputChange}
                    placeholder="Nhập thành phố"
                  />
                </div>

                <div className="form-group">
                  <label>Quốc gia</label>
                  <input
                    type="text"
                    name="storeCountry"
                    value={settings.storeCountry}
                    onChange={handleInputChange}
                    placeholder="Nhập quốc gia"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2>Cài Đặt Chung</h2>
            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Tiền tệ</label>
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleInputChange}
                  >
                    <option value="VND">VND (Đồng Việt Nam)</option>
                    <option value="USD">USD (Đô la Mỹ)</option>
                    <option value="EUR">EUR (Euro)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Ngôn ngữ</label>
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleInputChange}
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleInputChange}
                  />
                  <span>Bật chế độ bảo trì</span>
                </label>
                <p className="help-text">Khi bật, chỉ admin mới có thể truy cập trang web</p>
              </div>
            </div>
          </div>

          <div className="settings-actions">
            <button
              className="btn-save"
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              {isSaving ? 'Đang lưu...' : 'Lưu Cài Đặt'}
            </button>
          </div>
        </div>
      </div>
    </AdminNavbarLayout>
  );
};

export default Settings;
