import {
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./index.scss";

function Footer() {
  return (
    <footer className="fui-footer-3">
      <div className="footer-category-wrap">
        <div className="footer-category">
          <a href="/" title="DatSan79" className="footer-logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/badminton-booking-platform.appspot.com/o/Screenshot%202024-06-27%20213810.png?alt=media&token=8aa9ac61-4427-4b4e-b778-6d0567aba4dc"
              alt="DatSan79"
            />
          </a>
          <p className="footer-desc">
            Nền tảng đặt lịch sân cầu lông hiện đại và tiện lợi nhất dành cho
            mọi tín đồ yêu thích bộ môn cầu lông.
          </p>
          <p className="copy-right">© 2024 DatSan79. All Rights Reserved.</p>
        </div>

        <div className="footer-category">
          <h3 className="footer-heading">Dịch vụ</h3>
          <ul className="footer-link-list">
            <li className="footer-link-item">
              <a href="/list-club" title="Landing Page" className="footer-link">
                Đặt lịch
              </a>
            </li>
            <li className="footer-link-item">
              <a href="#" title="Popup Builder" className="footer-link">
                Thi đấu
              </a>
            </li>
            <li className="footer-link-item">
              <a href="/register" title="Web-design" className="footer-link">
                Đăng ký sân
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-category">
          <h3 className="footer-heading">Về chúng tôi</h3>
          <ul className="footer-link-list">
            <li className="footer-link-item">
              <a href="/introduction" className="footer-link">
                Giới thiệu
              </a>
            </li>
            <li className="footer-link-item">
              <a href="policy" className="footer-link">
                Quy định
              </a>
            </li>
            <li className="footer-link-item">
              <a href="#" title="Small Business" className="footer-link">
                Small Business
              </a>
            </li>
            <li className="footer-link-item">
              <a href="#" title="Website Builder" className="footer-link">
                Website Builder
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-category">
          <h3 className="footer-heading">Liên hệ</h3>
          <ul className="footer-link-list">
            <li className="footer-link-item">
              <i className="fas fa-phone-alt">
                <HomeOutlined />
              </i>{" "}
              Vinhomes Grand Park, S10.02, Thành phố Hồ Chí Minh
            </li>
            <li className="footer-link-item">
              <i className="fas fa-phone-alt">
                <PhoneOutlined />
              </i>{" "}
              1900 1856
            </li>
            <li className="footer-link-item">
              <i className="fas fa-envelope">
                <MailOutlined />
              </i>{" "}
              datsan79@gmail.com
            </li>
            <li className="footer-link-item">
              <i className="fas fa-clock">
                <ClockCircleOutlined />
              </i>{" "}
              7:00 – 23:00 (Thứ 2 – Chủ Nhật)
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="footer-bottom">
        <ul className="footer-bottom-list">
          <li className="footer-bottom-item">
            <a href="#" title="Privacy Policy" className="footer-bottom-link">
              Privacy Policy
            </a>
          </li>
          <li className="footer-bottom-item">
            <a href="#" title="Terms of Use" className="footer-bottom-link">
              Terms of Use
            </a>
          </li>
          <li className="footer-bottom-item">
            <a
              href="#"
              title="Sales and Refunds"
              className="footer-bottom-link"
            >
              Sales and Refunds
            </a>
          </li>
          <li className="footer-bottom-item">
            <a href="#" title="Legal" className="footer-bottom-link">
              Legal
            </a>
          </li>
          <li className="footer-bottom-item">
            <a href="#" title="Site Map" className="footer-bottom-link">
              Site Map
            </a>
          </li>
        </ul>
      </div> */}
    </footer>
  );
}

export default Footer;
