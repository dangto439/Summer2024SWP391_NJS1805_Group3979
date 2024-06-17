import "./index.scss";

function Intro() {
  return (
    <div className="intro">
      <h1>Chào Mừng Đến Với DatSan3979</h1>
      <p>
        Nền tảng đặt lịch sân cầu lông hiện đại và tiện lợi nhất dành cho mọi
        tín đồ yêu thích bộ môn cầu lông.
      </p>
      <img
        src="https://thethaodonga.com/wp-content/uploads/2022/06/hinh-anh-cau-long-dep-2.png"
        alt="Badminton Court"
        className="main-image"
      />

      <section className="about-us">
        <h2>Về Chúng Tôi</h2>
        <p>
          3979 được xây dựng với mục tiêu kết nối cộng đồng người chơi cầu lông
          và các sân cầu lông chất lượng trên khắp cả nước. Với sự hỗ trợ của
          công nghệ tiên tiến, chúng tôi cung cấp một giải pháp toàn diện để bạn
          có thể tận hưởng những trận cầu thú vị mà không phải lo lắng về việc
          tìm sân.
        </p>
        <img
          src="https://cdn.shopvnb.com/uploads/images/tin_tuc/hinh-anh-vot-cau-long-1-1687828854.webp"
          alt="About Us"
          className="section-image"
        />
      </section>

      <section className="features">
        <h2>Tính Năng Nổi Bật</h2>
        <ul>
          <li>
            <strong>Dễ Dàng Tìm Kiếm:</strong> Chỉ cần vài thao tác đơn giản,
            bạn có thể dễ dàng tìm kiếm các sân cầu lông gần bạn với thông tin
            chi tiết về vị trí, giá cả, và tiện ích.
          </li>
          <li>
            <strong>Đặt Lịch Nhanh Chóng:</strong> Chọn sân, chọn giờ và đặt
            lịch ngay lập tức. Bạn sẽ nhận được xác nhận đặt sân qua email hoặc
            tin nhắn SMS, giúp bạn hoàn toàn yên tâm về lịch trình của mình.
          </li>
          <li>
            <strong>Đánh Giá và Nhận Xét:</strong> Xem đánh giá và nhận xét từ
            người dùng khác để lựa chọn sân tốt nhất. Bạn cũng có thể để lại
            phản hồi sau khi sử dụng sân để giúp cải thiện chất lượng dịch vụ.
          </li>
          <li>
            <strong>Quản Lý Lịch Trình:</strong> Dễ dàng quản lý và theo dõi
            lịch sử đặt sân của bạn. Thay đổi hoặc hủy lịch trình nhanh chóng
            nếu có kế hoạch đột xuất.
          </li>
          <li>
            <strong>Ưu Đãi và Khuyến Mãi:</strong> Thường xuyên cập nhật các ưu
            đãi và chương trình khuyến mãi hấp dẫn dành cho người dùng 3979.
          </li>
        </ul>
        <img
          src="https://png.pngtree.com/thumb_back/fw800/background/20210831/pngtree-badminton-grass-badminton-racket-on-green-background-image_772542.jpg"
          alt="Features"
          className="section-image"
        />
      </section>

      <section className="why-choose">
        <h2>Tại Sao Chọn DatSan3979?</h2>
        <ul>
          <li>
            <strong>Đa Dạng Lựa Chọn:</strong> Hàng trăm sân cầu lông trên khắp
            cả nước được tích hợp trên nền tảng của chúng tôi, mang đến cho bạn
            nhiều lựa chọn phù hợp với nhu cầu và sở thích.
          </li>
          <li>
            <strong>Tiết Kiệm Thời Gian:</strong> Với giao diện thân thiện và dễ
            sử dụng, bạn có thể hoàn tất việc đặt sân chỉ trong vài phút.
          </li>
          <li>
            <strong>Hỗ Trợ Tận Tình:</strong> Đội ngũ hỗ trợ khách hàng của
            chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn trong
            quá trình đặt sân.
          </li>
        </ul>
        <img
          src="https://thethao365.com.vn/Data/upload/images/Product/Caulong/kich-thuoc-san-cau-long.jpg"
          alt="Why Choose Us"
          className="section-image"
        />
      </section>

      <section className="contact">
        <h2>Liên Hệ</h2>
        <p>
          Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, xin vui lòng liên hệ với
          chúng tôi qua email:{" "}
          <a href="mailto:datsan79@gmail.com">datsan79@gmail.com</a> hoặc
          hotline: <a href="tel:09 35 245 xxx">09 35 245 xxx</a>.
        </p>
        <img
          src="https://sonsanepoxy.vn/wp-content/uploads/2023/07/lap-dat-he-thong-den-chieu-san-cau-long.jpg"
          alt="Contact Us"
          className="section-image"
        />
      </section>

      <p className="thanks">
        Cảm ơn bạn đã tin tưởng và lựa chọn DatSan3979! Chúc bạn có những giây
        phút vui vẻ và thú vị với môn thể thao yêu thích.
      </p>
    </div>
  );
}

export default Intro;
