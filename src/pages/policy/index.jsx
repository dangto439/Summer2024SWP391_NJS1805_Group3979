import "./index.scss";

const Policy = () => {
  return (
    <div className="policy-page">
      <h1>Quy Định Hoàn Tiền</h1>
      <section className="refund-policy">
        <h2>Đối Với Customer</h2>
        <p>Daily trước 1 tuần -&gt; hoàn 100%, còn lại không hoàn</p>
        <p>Fixed, Flexible -&gt; không cho hoàn</p>
      </section>

      <section className="privacy-policy">
        <h2>Chính Sách Bảo Mật và Quyền Riêng Tư</h2>
        <h3>Dữ Liệu Cá Nhân:</h3>
        <p>Thông tin cá nhân của người dùng sẽ được bảo mật và chỉ sử dụng cho mục đích đặt sân và thanh toán.</p>
        <p>Người dùng có quyền yêu cầu xóa thông tin cá nhân của họ khỏi hệ thống bất kỳ lúc nào.</p>

        <h3>Chia Sẻ Thông Tin:</h3>
        <p>Thông tin cá nhân sẽ không được chia sẻ với bên thứ ba nếu không có sự đồng ý của người dùng, trừ khi yêu cầu bởi pháp luật.</p>
      </section>

      <section className="responsibility-commitment">
        <h2>Trách Nhiệm và Cam Kết</h2>
        <h3>Cam Kết Của Nền Tảng:</h3>
        <p>Cung cấp thông tin chính xác về sân, giá cả.</p>
        <p>Hỗ trợ người dùng trong quá trình đặt sân và giải quyết mọi vấn đề phát sinh một cách nhanh chóng và công bằng.</p>

        <h3>Trách Nhiệm Của Người Dùng:</h3>
        <p>Đảm bảo thông tin cá nhân và chi tiết đặt sân chính xác.</p>
        <p>Tuân thủ mọi quy tắc và quy định của nền tảng và sân cầu lông.</p>
      </section>

      <section className="change-policy">
        <h2>Thay Đổi Quy Định</h2>
        <p>Nền tảng có quyền thay đổi các quy định và điều khoản bất kỳ lúc nào, và sẽ thông báo trước cho người dùng về những thay đổi này.</p>
      </section>

      <section className="dispute-resolution">
        <h2>Giải Quyết Tranh Chấp</h2>
        <p>Mọi tranh chấp sẽ được giải quyết thông qua thương lượng trước khi tìm đến các phương án pháp lý.</p>
      </section>

      <section className="customer-support">
        <h2>Hỗ Trợ Khách Hàng</h2>
        <h3>Liên Hệ:</h3>
        <p>Người dùng có thể liên hệ với bộ phận hỗ trợ khách hàng qua email để được hỗ trợ bất kỳ lúc nào.</p>
      </section>
    </div>
  );
};

export default Policy;
