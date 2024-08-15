import React from "react";
import "./style.css";
import Input from "../Input";

interface Props {
  title: string;
  price: string | number;
}

const PricePackage: React.FC<Props> = ({ price, title }: Props) => {
  return (
    <div className="price-package">
      <h5 className="price-package__title">{title}</h5>
      <h2 className="price-package__price">
        <sup>$</sup> {price}
      </h2>

      <div className="price-details">
        <ul>
          <li>
            <i
              className="fa-regular fa-circle-check"
              style={{ marginRight: "10px", color: "green" }}
            ></i>
            Базовая SEO-оптимизация
          </li>
          <li>
            <i
              className="fa-regular fa-circle-check"
              style={{ marginRight: "10px", color: "green" }}
            ></i>
            Разработка макета
          </li>
          <li>
            <i
              className="fa-regular fa-circle-check"
              style={{ marginRight: "10px", color: "green" }}
            ></i>
            Интеграция с формой обратной связи
          </li>
          <li>
            <i
              className="fa-regular fa-circle-check"
              style={{ marginRight: "10px", color: "green" }}
            ></i>
            Оптимизация для мобильных устройств
          </li>
        </ul>
      </div>

      <div className="ps-checkout">
        <form style={{ width: "100%" }}>
          <div className="ps-form--review" style={{ marginBottom: 0 }}>
            <Input
              type="text"
              // {...register("name")}
              // error={errors.name?.message}
              // disabled={isSubmitting}
              formType={"checkout"}
              // label="Name"
              placeholder="Your Name"
            />

            <Input
              type="email"
              // {...register("email")}
              // error={errors.email?.message}
              // disabled={isSubmitting}
              formType={"checkout"}
              placeholder="Your Email"
              // label="Email"
            />
            <div className="ps-form__submit">
              <button
                type="submit"
                style={{ width: "100%", maxWidth: "unset" }}
                className="ps-btn ps-btn--warning custom-button"
                // disabled={isSubmitting}
              >
                Let's Talk
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricePackage;
