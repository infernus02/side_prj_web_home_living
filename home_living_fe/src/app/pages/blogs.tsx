import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/blogs.css';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const BlogsPage: React.FC = () => {
  const [blogs] = React.useState<Blog[]>([
    {
      id: 1,
      title: 'Cách Trang Trí Phòng Khách Theo Phong Cách Hiện Đại',
      excerpt: 'Khám phá những cách trang trí phòng khách đẹp và tinh tế với những xu hướng hiện đại nhất.',
      content: 'Chi tiết về cách trang trí phòng khách...',
      author: 'Nguyễn Văn A',
      date: '2024-01-15',
      category: 'Trang Trí',
      image: 'https://via.placeholder.com/400x250?text=Living+Room',
      readTime: '5 phút'
    },
    {
      id: 2,
      title: 'Thiết Kế Phòng Ngủ Nhỏ Gọn Nhưng Đầy Đủ Tiện Nghi',
      excerpt: 'Bí quyết để tối ưu không gian phòng ngủ nhỏ mà vẫn thoải mái và đẹp mắt.',
      content: 'Chi tiết về thiết kế phòng ngủ...',
      author: 'Trần Thị B',
      date: '2024-01-12',
      category: 'Phòng Ngủ',
      image: 'https://via.placeholder.com/400x250?text=Bedroom',
      readTime: '6 phút'
    },
    {
      id: 3,
      title: 'Bếp Hiện Đại: Từ Thiết Kế Đến Vật Liệu Hoàn Hảo',
      excerpt: 'Những gợi ý về thiết kế và chọn lựa vật liệu cho một bếp hiện đại và tiện lợi.',
      content: 'Chi tiết về thiết kế bếp...',
      author: 'Lê Văn C',
      date: '2024-01-10',
      category: 'Nhà Bếp',
      image: 'https://via.placeholder.com/400x250?text=Kitchen',
      readTime: '7 phút'
    },
    {
      id: 4,
      title: 'Phòng Tắm Sang Trọng: Yếu Tố Không Thể Bỏ Qua',
      excerpt: 'Hướng dẫn tạo ra một phòng tắm sang trọng với những chi tiết nhỏ đặc biệt.',
      content: 'Chi tiết về thiết kế phòng tắm...',
      author: 'Phạm Thị D',
      date: '2024-01-08',
      category: 'Phòng Tắm',
      image: 'https://via.placeholder.com/400x250?text=Bathroom',
      readTime: '5 phút'
    },
    {
      id: 5,
      title: 'Xu Hướng Nội Thất 2024: Màu Sắc và Chất Liệu',
      excerpt: 'Những xu hướng màu sắc và chất liệu nổi bật nhất trong năm 2024.',
      content: 'Chi tiết về xu hướng nội thất...',
      author: 'Hoàng Văn E',
      date: '2024-01-05',
      category: 'Trang Trí',
      image: 'https://via.placeholder.com/400x250?text=Trends+2024',
      readTime: '8 phút'
    },
    {
      id: 6,
      title: 'Cách Chọn Đèn Trang Trí Cho Từng Không Gian',
      excerpt: 'Các loại đèn trang trí và cách lựa chọn phù hợp với từng phòng trong nhà.',
      content: 'Chi tiết về chọn lựa đèn...',
      author: 'Võ Thị F',
      date: '2024-01-02',
      category: 'Trang Trí',
      image: 'https://via.placeholder.com/400x250?text=Lighting',
      readTime: '6 phút'
    }
  ]);

  const [filteredBlogs, setFilteredBlogs] = React.useState<Blog[]>(blogs);
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  const categories = ['All', ...Array.from(new Set(blogs.map(blog => blog.category)))];

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter(blog => blog.category === category));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="blogs-page">
      <section className="blogs-hero">
        <div className="container">
          <h1>Blog & Tin Tức</h1>
          <p>Khám phá những chia sẻ và mẹo vặt về trang trí nội thất</p>
        </div>
      </section>

      <section className="blogs-section">
        <div className="container">
          <div className="blogs-wrapper">
            {/* Sidebar */}
            <aside className="blogs-sidebar">
              <div className="sidebar-widget">
                <h3>Danh Mục</h3>
                <ul className="category-list">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryFilter(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3>Bài Viết Nổi Bật</h3>
                <ul className="featured-list">
                  {blogs.slice(0, 3).map(blog => (
                    <li key={blog.id}>
                      <Link to={`/blog/${blog.id}`} className="featured-item">
                        <img src={blog.image} alt={blog.title} />
                        <div>
                          <p className="featured-title">{blog.title}</p>
                          <span className="featured-date">{formatDate(blog.date)}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3>Theo Dõi Chúng Tôi</h3>
                <div className="social-links">
                  <a href="#" title="Facebook"><i className="fa-brands fa-facebook"></i></a>
                  <a href="#" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
                  <a href="#" title="Twitter"><i className="fa-brands fa-twitter"></i></a>
                  <a href="#" title="YouTube"><i className="fa-brands fa-youtube"></i></a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="blogs-content">
              {filteredBlogs.length > 0 ? (
                <div className="blogs-grid">
                  {filteredBlogs.map(blog => (
                    <article key={blog.id} className="blog-card">
                      <div className="blog-image">
                        <img src={blog.image} alt={blog.title} />
                        <span className="blog-category">{blog.category}</span>
                      </div>
                      <div className="blog-body">
                        <div className="blog-meta">
                          <span className="blog-date">
                            <i className="fa-solid fa-calendar"></i> {formatDate(blog.date)}
                          </span>
                          <span className="blog-read-time">
                            <i className="fa-solid fa-clock"></i> {blog.readTime}
                          </span>
                        </div>
                        <h3 className="blog-title">
                          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                        </h3>
                        <p className="blog-excerpt">{blog.excerpt}</p>
                        <div className="blog-footer">
                          <span className="blog-author">
                            <i className="fa-solid fa-user"></i> {blog.author}
                          </span>
                          <Link to={`/blog/${blog.id}`} className="read-more">
                            Đọc Tiếp <i className="fa-solid fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>Không có bài viết nào trong danh mục này.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogsPage;
