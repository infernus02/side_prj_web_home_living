import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  fullContent?: string;
}

const BlogDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock blog data - trong thực tế sẽ lấy từ API
  const allBlogs: Blog[] = [
    {
      id: 1,
      title: 'Cách Trang Trí Phòng Khách Theo Phong Cách Hiện Đại',
      excerpt: 'Khám phá những cách trang trí phòng khách đẹp và tinh tế với những xu hướng hiện đại nhất.',
      content: 'Chi tiết về cách trang trí phòng khách...',
      author: 'Nguyễn Văn A',
      date: '2024-01-15',
      category: 'Trang Trí',
      image: 'https://via.placeholder.com/800x400?text=Living+Room',
      readTime: '5 phút',
      fullContent: `Phòng khách là nơi tiếp khách và là trung tâm của ngôi nhà. Việc trang trí phòng khách theo phong cách hiện đại không chỉ tạo ra một không gian đẹp mắt mà còn phản ánh phong cách sống của chủ nhân.

Dưới đây là những hướng dẫn chi tiết:

1. Chọn Màu Sắc Hợp Lý
Đối với phong cách hiện đại, bạn nên chọn những màu sắc trung tính như trắng, xám, đen hoặc những màu pastel nhẹ nhàng. Những màu này giúp tạo ra một không gian thoáng đãng và tinh tế.

2. Chọn Nội Thất Thích Hợp
Nội thất hiện đại thường có những đường nét đơn giản, gọn gàng nhưng vẫn giữ được sự thoải mái. Chọn sofa với thiết kế đơn giản, bàn cà phê hình học hoặc những tủ kệ tối giản.

3. Sử Dụng Ánh Sáng Hiệu Quả
Ánh sáng là một yếu tố quan trọng trong trang trí hiện đại. Sử dụng đèn treo cây, đèn tường hoặc đèn âm trần để tạo ra bầu không khí ấm áp và hiện đại.

4. Thêm Những Điểm Nhấn
Tuy phong cách hiện đại là tối giản, nhưng bạn vẫn có thể thêm những điểm nhấn qua tranh treo tường, gương trang trí hoặc những chậu cây cẩm thạch.

Hy vọng những gợi ý trên sẽ giúp bạn tạo ra một phòng khách đẹp và hiện đại!`
    },
    {
      id: 2,
      title: 'Thiết Kế Phòng Ngủ Nhỏ Gọn Nhưng Đầy Đủ Tiện Nghi',
      excerpt: 'Bí quyết để tối ưu không gian phòng ngủ nhỏ mà vẫn thoải mái và đẹp mắt.',
      content: 'Chi tiết về thiết kế phòng ngủ...',
      author: 'Trần Thị B',
      date: '2024-01-12',
      category: 'Phòng Ngủ',
      image: 'https://via.placeholder.com/800x400?text=Bedroom',
      readTime: '6 phút',
      fullContent: `Phòng ngủ nhỏ không có nghĩa là bạn phải hy sinh sự thoải mái. Với những mẹo thông minh, bạn có thể tối ưu hóa không gian và tạo ra một phòng ngủ vừa đẹp vừa tiện nghi.

Những hướng dẫn cụ thể:

1. Chọn Giường Phù Hợp Với Kích Thước Phòng
Đối với phòng ngủ nhỏ, hãy chọn giường với kích thước vừa đủ. Hãy cân nhắc sử dụng giường tồn trữ với những ngăn kéo dưới để tiết kiệm không gian.

2. Tối Ưu Hóa Tường
Sử dụng những chiếc kệ treo tường để lưu trữ những vật dụng cần thiết mà không chiếm nhiều diện tích sàn.

3. Lựa Chọn Màu Sắc Sáng
Những màu sắc sáng như trắng, kem hoặc nhẹ giúp phòng trông rộng hơn.

4. Sử Dụng Gương
Gương lớn có thể giúp phản chiếu ánh sáng và tạo cảm giác phòng rộng hơn.

5. Tối Giản Hóa Đồ Đạc
Chỉ giữ những vật dụng cần thiết sẽ giúp phòng ngủ trông gọn gàng và thoáng đãng hơn.`
    },
    {
      id: 3,
      title: 'Bếp Hiện Đại: Từ Thiết Kế Đến Vật Liệu Hoàn Hảo',
      excerpt: 'Những gợi ý về thiết kế và chọn lựa vật liệu cho một bếp hiện đại và tiện lợi.',
      content: 'Chi tiết về thiết kế bếp...',
      author: 'Lê Văn C',
      date: '2024-01-10',
      category: 'Nhà Bếp',
      image: 'https://via.placeholder.com/800x400?text=Kitchen',
      readTime: '7 phút',
      fullContent: `Bếp là trái tim của ngôi nhà, nơi những bữa ăn ngon được chuẩn bị. Thiết kế một bếp hiện đại không chỉ giúp nấu ăn trở nên dễ dàng hơn mà còn tạo ra một không gian tuyệt vời.

Chi tiết về thiết kế bếp:

1. Sắp Xếp Hợp Lý
Sắp xếp bếp theo hình tam giác hoặc tuyến tính để tối ưu hóa quy trình nấu ăn.

2. Chọn Vật Liệu Bền Vững
Bàn mặt bếp nên chọn những vật liệu bền như granite, quartz hoặc gỗ xử lý đặc biệt.

3. Sử Dụng Không Gian Thẳng Đứng
Sử dụng những tủ bếp cao đến trần để tối đa hóa không gian lưu trữ.

4. Lựa Chọn Thiết Bị Hiện Đại
Những thiết bị nhà bếp hiện đại không chỉ đẹp mà còn tiết kiệm năng lượng.

5. Thiết Kế Hệ Thống Thông Gió
Một hệ thống hút mùi tốt là rất quan trọng để giữ không gian bếp sạch sẽ.`
    },
    {
      id: 4,
      title: 'Phòng Tắm Sang Trọng: Yếu Tố Không Thể Bỏ Qua',
      excerpt: 'Hướng dẫn tạo ra một phòng tắm sang trọng với những chi tiết nhỏ đặc biệt.',
      content: 'Chi tiết về thiết kế phòng tắm...',
      author: 'Phạm Thị D',
      date: '2024-01-08',
      category: 'Phòng Tắm',
      image: 'https://via.placeholder.com/800x400?text=Bathroom',
      readTime: '5 phút',
      fullContent: `Phòng tắm là nơi bạn bắt đầu và kết thúc ngày. Một phòng tắm sang trọng và thoải mái có thể cải thiện đáng kể chất lượng cuộc sống hàng ngày.

Các yếu tố quan trọng:

1. Chọn Vòi Nước Chất Lượng
Vòi nước không chỉ phải hoạt động tốt mà còn phải có thiết kế đẹp.

2. Sử Dụng Gạch Chất Lượng Cao
Những viên gạch được lựa chọn kỹ càng sẽ tạo ra một phòng tắm thành phố.

3. Lựa Chọn Bồn Tắm Hoặc Vòi Sen
Bồn tắm sang trọng hoặc vòi sen mưa có thể tạo ra một trải nghiệm tuyệt vời.

4. Ánh Sáng Thích Hợp
Ánh sáng tốt là rất quan trọng - hãy chọn đèn chống nước có thể điều chỉnh.

5. Tổ Chức Và Lưu Trữ
Những kệ tường và tủ tích hợp có thể giữ phòng tắm gọn gàng.`
    },
    {
      id: 5,
      title: 'Xu Hướng Nội Thất 2024: Màu Sắc và Chất Liệu',
      excerpt: 'Những xu hướng màu sắc và chất liệu nổi bật nhất trong năm 2024.',
      content: 'Chi tiết về xu hướng nội thất...',
      author: 'Hoàng Văn E',
      date: '2024-01-05',
      category: 'Trang Trí',
      image: 'https://via.placeholder.com/800x400?text=Trends+2024',
      readTime: '8 phút',
      fullContent: `Năm 2024 mang đến những xu hướng nội thất mới mẻ và thú vị. Hãy cùng khám phá những xu hướng nổi bật.

Xu hướng màu sắc 2024:

1. Màu Xanh Lá Sâu
Màu xanh lá sâu được dự báo sẽ trở thành màu sắc chủ đạo của năm.

2. Các Sắc Độ Tự Nhiên
Những tông màu tự nhiên như beige, taupe vẫn tiếp tục phổ biến.

3. Màu Nóng
Những màu nóng như đỏ gạch, cam và vàng nâu cũng đang tăng lên.

Xu hướng chất liệu:

1. Chất Liệu Bền Vững
Những chất liệu thân thiện với môi trường như gỗ tái chế và linen đang nổi lên.

2. Velvet
Velvet vẫn là một lựa chọn yêu thích cho nội thất sang trọng.

3. Rattan và Wicker
Các chất liệu tự nhiên như mây và rattan thêm ấm áp vào không gian.`
    },
    {
      id: 6,
      title: 'Cách Chọn Đèn Trang Trí Cho Từng Không Gian',
      excerpt: 'Các loại đèn trang trí và cách lựa chọn phù hợp với từng phòng trong nhà.',
      content: 'Chi tiết về chọn lựa đèn...',
      author: 'Võ Thị F',
      date: '2024-01-02',
      category: 'Trang Trí',
      image: 'https://via.placeholder.com/800x400?text=Lighting',
      readTime: '6 phút',
      fullContent: `Đèn trang trí không chỉ cung cấp ánh sáng mà còn là một phần quan trọng của trang trí nội thất.

Đèn cho phòng khách:

1. Đèn Treo Cây
Đèn treo cây tạo ra bầu không khí ấm áp và lãng mạn.

2. Đèn Tường
Đèn tường giúp tạo ra ánh sáng gián tiếp ấn tượng.

Đèn cho phòng ngủ:

1. Đèn Đầu Giường
Đèn đầu giường cần có cường độ sáng vừa phải để đọc sách trước khi ngủ.

2. Đèn Âm Trần
Đèn âm trần tạo ra ánh sáng nhẹ và thoải mái.

Đèn cho phòng tắm:

1. Đèn Chống Nước
Đèn phòng tắm phải chống nước và có cường độ sáng cao.

2. Đèn Gương
Đèn gương giúp chiếu sáng bề mặt gương tốt.

Lợi Ích Của Đèn LED:
- Tiết kiệm năng lượng
- Tuổi thọ dài
- Nhiều lựa chọn màu sắc`
    }
  ];

  const blog = allBlogs.find(b => b.id === parseInt(id || '0'));

  if (!blog) {
    return (
      <main className="blog-details-page">
        <div className="container">
          <div className="not-found">
            <h2>Bài viết không tìm thấy</h2>
            <Link to="/blog" className="btn-back">Quay lại danh sách bài viết</Link>
          </div>
        </div>
      </main>
    );
  }

  // Get related blogs
  const relatedBlogs = allBlogs
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="blog-details-page">
      <div className="blog-hero">
        <div className="container">
          <Link to="/blog" className="breadcrumb">← Quay lại</Link>
          <h1>{blog.title}</h1>
        </div>
      </div>

      <div className="container">
        <div className="blog-details-wrapper">
          {/* Main Content */}
          <article className="blog-article">
            <img src={blog.image} alt={blog.title} className="blog-featured-image" />

            <div className="blog-meta-info">
              <span className="meta-item">
                <i className="fa-solid fa-user"></i> {blog.author}
              </span>
              <span className="meta-item">
                <i className="fa-solid fa-calendar"></i> {formatDate(blog.date)}
              </span>
              <span className="meta-item">
                <i className="fa-solid fa-clock"></i> {blog.readTime}
              </span>
              <span className="meta-item category-badge">{blog.category}</span>
            </div>

            <div className="blog-content">
              {blog.fullContent ? (
                blog.fullContent.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>{blog.content}</p>
              )}
            </div>

            <div className="blog-footer-actions">
              <div className="blog-tags">
                <span className="tag">{blog.category}</span>
                <span className="tag">Nội Thất</span>
                <span className="tag">Trang Trí</span>
              </div>
              <div className="blog-share">
                <span>Chia sẻ:</span>
                <a href="#" className="share-btn facebook" title="Facebook"><i className="fa-brands fa-facebook"></i></a>
                <a href="#" className="share-btn twitter" title="Twitter"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="share-btn pinterest" title="Pinterest"><i className="fa-brands fa-pinterest"></i></a>
                <a href="#" className="share-btn copy" title="Sao chép liên kết"><i className="fa-solid fa-link"></i></a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <h3>Bài Viết Liên Quan</h3>
              <ul className="related-posts">
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map(relatedBlog => (
                    <li key={relatedBlog.id}>
                      <Link to={`/blog/${relatedBlog.id}`}>
                        <img src={relatedBlog.image} alt={relatedBlog.title} />
                        <div>
                          <p className="related-title">{relatedBlog.title}</p>
                          <span className="related-date">{formatDate(relatedBlog.date)}</span>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <p className="no-related">Không có bài viết liên quan</p>
                )}
              </ul>
            </div>

            <div className="sidebar-widget">
              <h3>Theo Dõi</h3>
              <div className="social-links">
                <a href="/" title="Facebook" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-facebook"></i></a>
                <a href="/" title="Instagram" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-instagram"></i></a>
                <a href="/" title="Twitter" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-twitter"></i></a>
                <a href="/" title="YouTube" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>

            <div className="sidebar-widget newsletter">
              <h3>Đăng Ký Bản Tin</h3>
              <p>Nhận những bài viết mới nhất hàng tuần</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email của bạn" required />
                <button type="submit">Đăng Ký</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BlogDetailsPage;
