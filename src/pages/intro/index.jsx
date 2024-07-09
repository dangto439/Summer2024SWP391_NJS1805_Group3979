import "./index.scss";

function Intro() {
  return (
    <div className="introduction">
      <div className="introduction__img-left">
        <img src="https://i.pinimg.com/564x/4a/1e/f6/4a1ef631d7af7819ce1a64de5f66b618.jpg" alt="" />
      </div>
      <div className="introduction__information">
        <h1>Chào Mừng Đến Với DatSan79</h1>
        <p>
          Nền tảng đặt lịch sân cầu lông hiện đại và tiện lợi nhất dành cho mọi
          tín đồ yêu thích bộ môn cầu lông. DatSan79 mang đến cho bạn trải nghiệm
          tuyệt vời với các tính năng độc đáo và dễ sử dụng, giúp bạn dễ dàng tìm
          kiếm và đặt lịch sân cầu lông nhanh chóng và tiện lợi.
        </p>

        <section className="about-us">
          <h2>Về Chúng Tôi</h2>
          <p>
            DatSan79 được xây dựng với mục tiêu kết nối cộng đồng người chơi cầu
            lông và các sân cầu lông chất lượng trên khắp cả nước. Với sự hỗ trợ
            của công nghệ tiên tiến, chúng tôi cung cấp một giải pháp toàn diện để
            bạn có thể tận hưởng những trận cầu thú vị mà không phải lo lắng về
            việc tìm sân. Hãy tham gia cộng đồng của chúng tôi để trải nghiệm
            những trận cầu hấp dẫn và giao lưu với các tín đồ cầu lông khác.
          </p>
        </section>

        <section className="features">
          <h2>Tính Năng Nổi Bật</h2>
          <ul>
            <li>
              <strong>Dễ Dàng Tìm Kiếm:</strong> Chỉ cần vài thao tác đơn giản,
              bạn có thể dễ dàng tìm kiếm các sân cầu lông gần bạn với thông tin
              chi tiết về vị trí, giá cả, và tiện ích. Tính năng này giúp bạn tiết
              kiệm thời gian và công sức khi tìm kiếm sân phù hợp.
            </li>
            <li>
              <strong>Đặt Lịch Nhanh Chóng:</strong> Chọn sân, chọn giờ và đặt
              lịch ngay lập tức. Bạn sẽ nhận được xác nhận đặt sân qua email hoặc
              tin nhắn SMS, giúp bạn hoàn toàn yên tâm về lịch trình của mình.
              Không cần phải lo lắng về việc có sân trống hay không.
            </li>
            <li>
              <strong>Đánh Giá và Nhận Xét:</strong> Xem đánh giá và nhận xét từ
              người dùng khác để lựa chọn sân tốt nhất. Bạn cũng có thể để lại
              phản hồi sau khi sử dụng sân để giúp cải thiện chất lượng dịch vụ.
              Những đánh giá này giúp cộng đồng người chơi có cái nhìn tổng quan
              hơn về chất lượng các sân cầu lông.
            </li>
            <li>
              <strong>Quản Lý Lịch Trình:</strong> Dễ dàng quản lý và theo dõi
              lịch sử đặt sân của bạn. Thay đổi hoặc hủy lịch trình nhanh chóng
              nếu có kế hoạch đột xuất. Tính năng này giúp bạn luôn kiểm soát
              được lịch trình chơi cầu lông của mình một cách linh hoạt.
            </li>
            <li>
              <strong>Ưu Đãi và Khuyến Mãi:</strong> Thường xuyên cập nhật các ưu
              đãi và chương trình khuyến mãi hấp dẫn dành cho người dùng DatSan79.
              Những ưu đãi này giúp bạn tiết kiệm chi phí và có thêm động lực để
              tham gia nhiều trận cầu thú vị hơn.
            </li>
          </ul>
        </section>

        <section className="why-choose">
          <h2>Tại Sao Chọn DatSan79?</h2>
          <ul>
            <li>
              <strong>Đa Dạng Lựa Chọn:</strong> Hàng trăm sân cầu lông trên khắp
              cả nước được tích hợp trên nền tảng của chúng tôi, mang đến cho bạn
              nhiều lựa chọn phù hợp với nhu cầu và sở thích. Bạn có thể dễ dàng
              tìm được sân cầu lông gần nhất hoặc sân có tiện ích tốt nhất.
            </li>
            <li>
              <strong>Tiết Kiệm Thời Gian:</strong> Với giao diện thân thiện và dễ
              sử dụng, bạn có thể hoàn tất việc đặt sân chỉ trong vài phút. Không
              cần phải gọi điện hay đến trực tiếp, chỉ cần vài cú click là bạn đã
              có thể đặt sân thành công.
            </li>
            <li>
              <strong>Hỗ Trợ Tận Tình:</strong> Đội ngũ hỗ trợ khách hàng của
              chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn trong
              quá trình đặt sân. Chúng tôi cam kết mang đến cho bạn trải nghiệm
              dịch vụ tốt nhất và luôn lắng nghe phản hồi từ khách hàng để ngày
              càng hoàn thiện hơn.
            </li>
          </ul>
        </section>

        <section className="contact-intro">
          <h2>Liên Hệ</h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, xin vui lòng liên hệ với
            chúng tôi qua email:{" "}
            <a href="mailto:datsan79@gmail.com">datsan79@gmail.com</a> hoặc
            hotline: <a href="tel:09 35 245 xxx">09 35 245 xxx</a>. Đội ngũ hỗ trợ
            khách hàng của chúng tôi luôn sẵn sàng giúp đỡ bạn.
          </p>
        </section>

        <p className="thanks">
          Cảm ơn bạn đã tin tưởng và lựa chọn DatSan79! Chúc bạn có những giây
          phút vui vẻ và thú vị với môn thể thao yêu thích. Chúng tôi luôn nỗ lực
          để mang đến cho bạn trải nghiệm tốt nhất và rất mong nhận được sự ủng hộ
          từ bạn.
        </p>
      </div>
      {/* <div className="introduction__img-right">
        <img src="https://i.pinimg.com/564x/b2/d7/51/b2d751501bc7e5f25a5f7d99516df84c.jpg" alt="" />
      </div> */}
    </div>
  );
}

export default Intro;
