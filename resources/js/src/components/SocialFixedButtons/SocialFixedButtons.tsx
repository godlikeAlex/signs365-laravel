import React from "react";
import "./style.css";

interface Props {}

const SocialFixedButtons: React.FC<Props> = ({}: Props) => {
  return (
    <ul className="social-fixed-btns">
      <li>
        <a href="mailto:info@signs.com">
          <div className="icon-box-social">
            <i className="fas fa-envelope"></i>
          </div>
          <span>E-Mail</span>
        </a>
      </li>
      <li>
        <a href="https://api.whatsapp.com/send?phone=123123">
          <div className="icon-box-social">
            <i className="fab fa-whatsapp"></i>
          </div>
          <span>WhatsApp</span>
        </a>
      </li>
      <li>
        <a href="tel:+1">
          <div className="icon-box-social">
            <i aria-hidden="true" className="fas fa-phone"></i>
          </div>
          <span>Call us</span>
        </a>
      </li>

      <li>
        <a href="tel:+1">
          <div className="icon-box-social">
            <i aria-hidden="true" className="fab fa-instagram"></i>
          </div>
          <span>Instagram</span>
        </a>
      </li>
    </ul>
  );
};

export default SocialFixedButtons;
