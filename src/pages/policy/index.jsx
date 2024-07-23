import "./index.scss";

const Policy = () => (
  <div className="business-rules">
    <div className="rule">
      <h1>Quy định</h1>
      <section className="">
        <h2>Đăng Ký Tài Khoản </h2>
        <p>
          Khi đăng ký tài khoản trên website với vai trò “Chủ Câu Lạc Bộ”, tài
          khoản cần phải được “Quản Trị Viên” phê duyệt thì mới được đăng nhập
          vào website.
        </p>
      </section>
      <section className="wallet">
        <h2>Ví </h2>
        <p>
          Số tiền nạp tối thiểu khi thực hiện chức năng Nạp Tiền & Chuyển Tiền
          là 10.000 VND.
        </p>
      </section>
      <section className="booking">
        <h2>Đặt Sân </h2>
        <ul>
          <li>
            Khi đặt sân, nếu sau 15 phút không thanh toán thì sẽ hủy Booking.
          </li>
          <li>
            Khi đặt lịch linh hoạt tại 1 câu lạc bộ, người dùng không thể tạo
            thêm 1 lịch linh hoạt mới khi lịch linh hoạt cũ vẫn còn hiệu lực.
          </li>
          <li>
            Lịch linh hoạt có hiệu lực trong 30 ngày tính từ thời gian đặt lịch.
          </li>
          <li>
            Hoàn 95% đơn giá cho 1 đơn đặt lịch trước 7 ngày (chỉ áp dụng cho
            đặt lịch ngày).
          </li>
          <li>Đặt lịch linh hoạt & cố định sẽ không được hoàn tiền.</li>
          <li>Khi đặt lịch, phải thanh toán toàn bộ 100% đơn giá.</li>
          <li>
            Nền tảng sẽ nhận 5% đơn giá trên mỗi đơn đặt lịch và chủ câu lạc bộ
            chỉ nhận được 95% còn lại.
          </li>
          <li>
            Giá của lịch linh hoạt được tính theo công thức: Giá lịch linh hoạt
            = (giá giờ cao điểm) * (phần trăm giảm giá cho lịch linh hoạt)
          </li>
          <li>
            Lịch cố định sẽ được giảm giá theo phần trăm giảm giá cho lịch cố
            định.
          </li>
        </ul>
      </section>
      <section className="contest">
        <h2>Giải Đấu </h2>
        <ul>
          <li>
            Khi đến ngày Giải đấu bắt đầu, nếu không đủ số người tham gia, giải
            đấu sẽ tự động bị hủy và hoàn 100% tiền cho người tham gia từ ví của
            chủ câu lạc bộ. Chủ câu lạc bộ sẽ phải chịu lỗ 5% lệ phí đăng ký
            giải của mỗi người chơi.
          </li>
          <li>
            Chủ sân chỉ được tạo số lượng người tham gia giải là lũy thừa của 2.
          </li>
          <li>
            Chủ sân chỉ được tạo giải đấu khi số dư của ví lớn hơn hoặc bằng 5%
            của tổng lệ phí tham gia giải đấu. Công thức tổng lệ phí tham gia
            giải đấu: Tổng lệ phí tham gia giải đấu = (số lượng người dự kiến
            tham gia) * (lệ phí tham gia giải đấu)
          </li>
        </ul>
      </section>
      <section className="club">
        <h2>Câu Lạc Bộ </h2>
        <ul>
          <li>Khi tạo câu lạc bộ phải có ít nhất 1 sân.</li>
          <li>
            Mỗi slot tương ứng 1 giờ chơi (không tạo những slot có giờ lẻ).
          </li>
        </ul>
      </section>
    </div>
    <img
      src="https://i.pinimg.com/564x/67/af/67/67af678a6236d40a728b5977ed42bbf3.jpg"
      alt=""
    />
  </div>
);

export default Policy;
