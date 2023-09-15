import * as jsxRuntime from "react/jsx-runtime";
import React, { useState, useEffect, useMemo, createElement, createContext, useContext, forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { Link, Outlet, useLocation, Navigate, useNavigate, useParams, useSearchParams, Routes, Route, BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import Collapse, { Panel } from "rc-collapse";
import dayjs from "dayjs";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import Slider from "react-slick";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Helmet } from "react-helmet";
import ReactPaginate from "react-paginate";
import { unlock, lock } from "tua-body-scroll-lock";
import { useDropzone } from "react-dropzone";
import { Dialog } from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";
import { useDebounceEffect } from "ahooks";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import ReactDOMServer from "react-dom/server";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
const useAppDispatch = useDispatch;
const useAppSelector = useSelector;
const api = axios.create({
  withCredentials: true,
  baseURL: `${"https://signs365.test"}/api`
});
api.interceptors.request.use(async (config) => {
  if (config.headers === void 0) {
    config.headers = {};
  }
  return config;
});
axios.defaults.withCredentials = true;
class AuthService {
  static async login(email, password) {
    await api.get("/sanctum/csrf-cookie");
    return api.post("/auth/login", { email, password });
  }
  static getUser() {
    return api.get("user");
  }
  static async register(email, password, name2) {
    await api.get("/sanctum/csrf-cookie");
    return api.post("/auth/register", { email, password, name: name2 });
  }
  static async logout() {
    return api.post("/auth/logout");
  }
  static async sendForgotPasswordRequest(email) {
    return api.post("/auth/forgot", { email });
  }
  static async resetPassword(token, password, passwordConfirmation) {
    return api.post("/auth/reset-password", {
      token,
      password,
      passwordConfirmation
    });
  }
}
class CartService {
  static getCart() {
    return api.get("/cart");
  }
  static calculateSinglePrice(productID, option_id, addons, unit, width, height, quantity, size_id) {
    return api.post("/cart/calculate-single", {
      product_id: productID,
      option_id,
      addons,
      unit,
      width,
      height,
      quantity,
      size_id
    });
  }
  static addToCart(body) {
    const formData = new FormData();
    console.log(body);
    for (const [key, value] of Object.entries(body)) {
      if (!value)
        continue;
      if (key === "addons") {
        for (let i = 0; i < value.length; i++) {
          for (let keyOfAddon of Object.keys(value[i])) {
            const field = value[i][keyOfAddon];
            formData.append(
              `addons[${i}][${keyOfAddon}]`,
              field instanceof Array ? JSON.stringify(field) : field
            );
          }
        }
        continue;
      }
      if (key === "files") {
        value.forEach((item) => formData.append(`files[]`, item));
        continue;
      }
      formData.append(key, value);
    }
    return api.post("/cart/add", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  static updateQuantity(body) {
    return api.post("/cart/update-quantity", body);
  }
  static removeItemFromCart(body) {
    return api.post("/cart/remove-item", body);
  }
  static clearCart() {
    return api.post("/cart/clear");
  }
}
class CategoryService {
  static getCategoriesWithProducts() {
    return api.get("/categories");
  }
}
class UserService {
  static async editProfile(data) {
    const formData = new FormData();
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    return api.post("profile/edit", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  static async editPassword(data) {
    return api.post("/profile/password/edit", data);
  }
}
const initialState$3 = {
  cart: void 0,
  loaded: false,
  fetching: false
};
const initCart = createAsyncThunk(
  "cart/init",
  async function(_, { rejectWithValue }) {
    try {
      const { data } = await CartService.getCart();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get cart");
    }
  }
);
const addToCart = createAsyncThunk("cart/add", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.addToCart(params);
    return data;
  } catch (error) {
    return rejectWithValue("Failed add to cart");
  }
});
const updateQuantity = createAsyncThunk("cart/update-quantity", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.updateQuantity(params);
    return data;
  } catch (error) {
    return rejectWithValue("Failed add to cart");
  }
});
const removeItemFromCart = createAsyncThunk("cart/remove-item", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.removeItemFromCart(params);
    return data;
  } catch (error) {
    return rejectWithValue("Failed remove item from cart");
  }
});
const clearCart = createAsyncThunk("cart/clear", async (_, { rejectWithValue }) => {
  try {
    const { data } = await CartService.clearCart();
    if (data.ok) {
      return data;
    } else {
      return rejectWithValue("Failed clear cart");
    }
  } catch (error) {
    return rejectWithValue("Failed remove item from cart");
  }
});
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState$3,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initCart.pending, (state, action) => {
      state.loaded = false;
    });
    builder.addCase(initCart.fulfilled, (state, action) => {
      state.loaded = true;
      state.cart = action.payload;
    });
    builder.addCase(addToCart.pending, (state, action) => {
      state.fetching = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
    });
    builder.addCase(updateQuantity.pending, (state, action) => {
      state.fetching = true;
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
    });
    builder.addCase(removeItemFromCart.pending, (state, action) => {
      state.fetching = true;
    });
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
    });
    builder.addCase(clearCart.pending, (state, action) => {
      state.fetching = true;
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = {
        items: [],
        total: 0,
        tax: 0,
        total_with_tax: 0
      };
    });
  }
});
const cartReducer = cartSlice.reducer;
function generateAttributtesCartItem(attributes) {
  const customSize = (attributes == null ? void 0 : attributes.customSize) ? `${attributes.customSize.title};` : null;
  const calculatorSizes = !(attributes == null ? void 0 : attributes.customSize) && attributes.width && attributes.height ? `${attributes.width} x ${attributes.height} ${attributes == null ? void 0 : attributes.unit};` : null;
  return `${attributes == null ? void 0 : attributes.productOption.title}; ${customSize ? customSize : ""} ${calculatorSizes ? calculatorSizes : ""}`;
}
const CartItem = ({
  name: name2,
  quantity,
  price,
  id,
  attributes,
  associatedModel
}) => {
  const dispatch = useAppDispatch();
  const addItem = async () => {
    try {
      await dispatch(updateQuantity({ type: "add", item_id: id })).unwrap();
      toast(`Successfully increased the quantity of ${name2}`, {
        type: "success"
      });
    } catch (error) {
      toast("An error occurred while adding to cart", { type: "error" });
    }
  };
  const reduceItem = async () => {
    try {
      await dispatch(updateQuantity({ type: "reduce", item_id: id })).unwrap();
      toast(`Successfully reduced the quantity of ${name2}`, {
        type: "success"
      });
    } catch (error) {
      toast("An error occurred while reducing item", { type: "error" });
    }
  };
  const removeItem = async () => {
    try {
      await dispatch(removeItemFromCart({ item_id: id })).unwrap();
      toast(`Successfully removed ${name2}`, {
        type: "success"
      });
    } catch (error) {
      toast("An error occurred while removing item", { type: "error" });
    }
  };
  return /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsx("td", { className: "ps-product__remove", children: /* @__PURE__ */ jsx("a", { href: "#", onClick: removeItem, children: /* @__PURE__ */ jsx("i", { className: "icon-cross" }) }) }),
    /* @__PURE__ */ jsx("td", { className: "ps-product__thumbnail", children: /* @__PURE__ */ jsx("a", { className: "ps-product__image", children: /* @__PURE__ */ jsx("figure", { children: associatedModel.images && associatedModel.images.length > 0 ? /* @__PURE__ */ jsx(
      "img",
      {
        src: `/storage/${associatedModel.images[0].path}`,
        alt: associatedModel.images[0].alt ? associatedModel.images[0].alt : name2
      }
    ) : null }) }) }),
    /* @__PURE__ */ jsx("td", { className: "ps-product__name", children: /* @__PURE__ */ jsxs("a", { href: "", children: [
      name2,
      /* @__PURE__ */ jsx("p", { children: generateAttributtesCartItem(attributes) })
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "ps-product__meta", children: /* @__PURE__ */ jsxs("span", { className: "ps-product__price", children: [
      "$",
      price.toLocaleString()
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "ps-product__quantity", children: /* @__PURE__ */ jsxs("div", { className: "def-number-input number-input safari_only", children: [
      /* @__PURE__ */ jsx("button", { className: "minus", onClick: reduceItem, children: /* @__PURE__ */ jsx("i", { className: "icon-minus" }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "quantity",
          min: "1",
          name: "quantity",
          value: quantity,
          type: "number",
          readOnly: true
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "plus", onClick: addItem, children: /* @__PURE__ */ jsx("i", { className: "icon-plus" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("td", { className: "ps-product__subtotal", children: [
      "$",
      (price * quantity).toLocaleString()
    ] })
  ] });
};
const CartList = ({ items }) => {
  return /* @__PURE__ */ jsx("div", { className: "ps-shopping__table", children: /* @__PURE__ */ jsxs("table", { className: "table ps-table ps-table--product", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "ps-product__remove" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__thumbnail" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__name", children: "Product name" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__meta", children: "Unit price" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__quantity", children: "Quantity" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__subtotal", children: "Subtotal" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: items.map((cartItem) => /* @__PURE__ */ jsx(CartItem, { ...cartItem, id: cartItem.id })) })
  ] }) });
};
const baseStyle = {
  flex: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  flexDirection: "column",
  transition: "border .24s ease-in-out"
};
const focusedStyle = {
  borderColor: "#2196f3"
};
const acceptStyle = {
  borderColor: "#00e676"
};
const rejectStyle = {
  borderColor: "#ff1744"
};
const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4
};
const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};
const img = {
  display: "block",
  width: "auto",
  height: "100%"
};
const Dropzone = ({ onDrop }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { "image/*": [] },
    onDrop(acceptedFiles, fileRejections, event) {
      setFiles(
        acceptedFiles.map(
          (file) => Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
      console.log(acceptedFiles);
    }
  });
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  useEffect(() => {
    if (onDrop) {
      onDrop(files);
    }
  }, [files]);
  const style2 = useMemo(
    () => ({
      ...baseStyle,
      ...isFocused ? focusedStyle : {},
      ...isDragAccept ? acceptStyle : {},
      ...isDragReject ? rejectStyle : {}
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const thumbs = files.map((file) => /* @__PURE__ */ jsx("div", { style: thumb, children: /* @__PURE__ */ jsx("div", { style: thumbInner, children: /* @__PURE__ */ jsx(
    "img",
    {
      src: file.preview,
      style: img,
      onLoad: () => {
        URL.revokeObjectURL(file.preview);
      }
    }
  ) }) }, file.name));
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { ...getRootProps({ style: { ...style2, flexDirection: "column" } }), children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsx("div", { children: "Drag 'n' drop some files here, or click to select files" })
    ] }),
    /* @__PURE__ */ jsx(
      "aside",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          marginTop: 15,
          flexWrap: "wrap"
        },
        children: thumbs
      }
    )
  ] });
};
const EmptyPage = ({
  size = "default",
  iconClass,
  title
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "cart-empty text-center title-with-icon-section",
      style: { height: size === "small" ? "50vh" : "70vh", width: "100%" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "ps-cart__icon", children: /* @__PURE__ */ jsx(
          "i",
          {
            className: iconClass,
            style: { color: "#5b6c8f", fontSize: 120 }
          }
        ) }),
        /* @__PURE__ */ jsx("h1", { className: "cart-title", style: { color: "#103178", marginTop: 20 }, children: title })
      ]
    }
  );
};
const getCollapsedHeight = () => ({
  height: 0,
  opacity: 0
});
const getRealHeight = (node) => ({
  height: node.scrollHeight,
  opacity: 1
});
const getCurrentHeight = (node) => ({
  height: node.offsetHeight
});
const skipOpacityTransition = (_, event) => event.propertyName === "height";
const collapseMotion = {
  motionName: "rc-collapse-motion",
  onEnterStart: getCollapsedHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
  leavedClassName: "rc-collapse-content-hidden"
};
const index = "";
const style$7 = "";
const arrowPath = "M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5.2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z";
function expandIcon({ isActive }) {
  return /* @__PURE__ */ jsx("i", { style: { marginRight: ".5rem" }, children: /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 1024 1024",
      width: "1em",
      height: "1em",
      fill: "currentColor",
      style: {
        verticalAlign: "-.125em",
        transition: "transform .2s",
        transform: `rotate(${isActive ? 90 : 0}deg)`
      },
      children: /* @__PURE__ */ jsx("path", { d: arrowPath })
    }
  ) });
}
const OrderCard = ({
  status,
  total_without_tax,
  total,
  address,
  uuid,
  created_at,
  order_items
}) => {
  console.log(order_items);
  return /* @__PURE__ */ jsxs("div", { className: "order-item", style: { marginBottom: 25 }, children: [
    /* @__PURE__ */ jsx("div", { className: "order-item-panel-title", children: /* @__PURE__ */ jsxs("h2", { children: [
      "Order UUID",
      " ",
      /* @__PURE__ */ jsx("strong", { style: { textTransform: "uppercase" }, children: uuid })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "order-item-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Status:" }),
        /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: status })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Order Date:" }),
        /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: dayjs(created_at).format("MMM D, YYYY h:mm A	") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Address:" }),
        /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: address })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Total Without Tax:" }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-10 col-6 order-item-value", children: [
          "$",
          total_without_tax.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Total:" }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-10 col-6 order-item-value", children: [
          "$",
          total.toLocaleString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Collapse, { accordion: true, openMotion: collapseMotion, children: /* @__PURE__ */ jsx(
      Panel,
      {
        header: `${order_items.length} Orders Items`,
        expandIcon,
        children: order_items.map((item) => {
          var _a, _b;
          return /* @__PURE__ */ jsxs("div", { className: "mini-order-item", children: [
            ((_a = item.product) == null ? void 0 : _a.images.length) >= 1 ? /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${item.product.images[0].path}`,
                alt: item.product.images[0].alt,
                style: { width: 100, height: 100, objectFit: "cover" }
              }
            ) : /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  width: 100,
                  height: 100,
                  background: "rgb(227, 227, 227)"
                }
              }
            ),
            /* @__PURE__ */ jsxs("div", { style: { width: "100%", marginLeft: 25 }, children: [
              /* @__PURE__ */ jsxs("div", { className: "row", children: [
                /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Name:" }),
                /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: ((_b = item.product) == null ? void 0 : _b.title) || "Deleted Product" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "row", children: [
                /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Quantity:" }),
                /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: item.quantity })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "row", children: [
                /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Price:" }),
                /* @__PURE__ */ jsxs("div", { className: "col-md-10 col-6 order-item-value", children: [
                  "$",
                  item.price.toLocaleString()
                ] })
              ] })
            ] })
          ] }, item.id);
        })
      }
    ) })
  ] });
};
const style$6 = "";
const FAQProduct = ({ questions }) => {
  return /* @__PURE__ */ jsx(Collapse, { accordion: true, openMotion: collapseMotion, children: questions.map(({ question, answer }, index2) => /* @__PURE__ */ jsx(
    Panel,
    {
      header: question,
      expandIcon,
      className: "faq-product",
      children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: answer } })
    },
    index2
  )) });
};
const Footer = ({}) => {
  const { homeCategories } = useAppSelector((state) => state.app);
  return /* @__PURE__ */ jsx("footer", { className: "ps-footer ps-footer--5 pt-50", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("div", { className: "ps-footer__middle", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx("div", { className: "ps-footer--address", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "ps-logo-footer",
          style: { textAlign: "center" },
          children: /* @__PURE__ */ jsxs("a", { href: "/", children: [
            /* @__PURE__ */ jsx("img", { src: "/img/logo-white.png", style: { width: 250 } }),
            /* @__PURE__ */ jsx(
              "h3",
              {
                style: {
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  marginTop: 10,
                  marginBottom: 50
                },
                children: "Everything for your business"
              }
            )
          ] })
        }
      ) }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx("div", { className: "row", children: homeCategories.map((category) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "col-md-4",
          style: { textAlign: "center", marginTop: 20 },
          children: /* @__PURE__ */ jsxs("div", { className: "ps-footer--block", children: [
            /* @__PURE__ */ jsx(
              "h5",
              {
                className: "ps-block__title",
                style: { textTransform: "uppercase" },
                children: category.title
              }
            ),
            /* @__PURE__ */ jsx("ul", { className: "ps-block__list", children: category.products.map((product) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/catalog/${product.slug}`, children: product.title }) }, `footer-product-${product.id}`)) })
          ] })
        },
        category.id
      )) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-footer--bottom", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-12 col-md-6", children: /* @__PURE__ */ jsx("p", { children: "Copyright © 2023 Signs7. All Rights Reserved" }) }),
      /* @__PURE__ */ jsxs("div", { className: "col-12 col-md-6 text-right", children: [
        /* @__PURE__ */ jsx("img", { src: "img/payment.png", alt: "" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "payment-light",
            src: "img/payment-light.png",
            alt: ""
          }
        )
      ] })
    ] }) })
  ] }) });
};
const Input = React.forwardRef(
  ({ formType, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames({
          "ps-checkout__group": formType === "checkout",
          "ps-form__group": formType === "profile"
        }),
        children: [
          props.label ? /* @__PURE__ */ jsx(
            "label",
            {
              className: classNames({
                "ps-checkout__label": formType === "checkout",
                "ps-form__label": formType === "profile"
              }),
              children: props.label
            }
          ) : null,
          /* @__PURE__ */ jsx(
            "input",
            {
              type: props.type || "text",
              ref,
              className: classNames({
                "ps-input": formType === "checkout",
                "form-control ps-form__input": formType === "profile"
              }),
              ...props
            }
          ),
          props.error ? /* @__PURE__ */ jsx(
            "p",
            {
              style: {
                textTransform: "capitalize",
                color: "#ff5252",
                fontSize: 12,
                marginTop: 8
              },
              children: props.error
            }
          ) : null
        ]
      }
    );
  }
);
const CartMiniItem = ({
  name: name2,
  price,
  quantity,
  id,
  associatedModel
}) => {
  const dispatch = useAppDispatch();
  const removeItem = async () => {
    try {
      await dispatch(removeItemFromCart({ item_id: id })).unwrap();
      toast(`Successfully removed ${name2}`, {
        type: "success"
      });
    } catch (error) {
      toast("An error occurred while removing item", { type: "error" });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "ps-product--mini-cart", children: [
    /* @__PURE__ */ jsx("a", { className: "ps-product__thumbnail", href: "", children: associatedModel.images && associatedModel.images.length > 0 ? /* @__PURE__ */ jsx(
      "img",
      {
        src: `/storage/${associatedModel.images[0].path}`,
        alt: associatedModel.images[0].alt ? associatedModel.images[0].alt : name2
      }
    ) : null }),
    /* @__PURE__ */ jsxs("div", { className: "ps-product__content", children: [
      /* @__PURE__ */ jsxs("a", { className: "ps-product__name", href: "", children: [
        name2,
        " x",
        quantity
      ] }),
      /* @__PURE__ */ jsx("p", { className: "ps-product__meta", children: /* @__PURE__ */ jsxs("span", { className: "ps-product__price", children: [
        "$",
        price.toLocaleString()
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      "a",
      {
        className: "ps-product__remove",
        onClick: () => removeItem(),
        style: { cursor: "pointer" },
        children: /* @__PURE__ */ jsx("i", { className: "icon-cross" })
      }
    )
  ] });
};
const MiniCartModal = ({ active }) => {
  const { loaded, cart } = useAppSelector((state) => state.cart);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames("ps-cart--mini", {
        active
      }),
      children: loaded ? /* @__PURE__ */ jsx(Fragment, { children: cart.items.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("ul", { className: "ps-cart__items", children: /* @__PURE__ */ jsx("li", { className: "ps-cart__item", children: cart.items.map((item, index2) => {
          if (index2 <= 2) {
            return /* @__PURE__ */ createElement(CartMiniItem, { ...item, key: item.id });
          }
        }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ps-cart__total", children: [
          /* @__PURE__ */ jsx("span", { children: "Subtotal " }),
          /* @__PURE__ */ jsxs("span", { children: [
            "$",
            cart.total_with_tax.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ps-cart__footer", children: [
          /* @__PURE__ */ jsx(Link, { className: "ps-btn ps-btn--outline", to: "/cart", children: "View Cart" }),
          /* @__PURE__ */ jsx(Link, { className: "ps-btn ps-btn--warning", to: "/cart/checkout", children: "Checkout" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "ps-cart__empty", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-cart__icon", children: /* @__PURE__ */ jsx("i", { className: "fa fa-shopping-basket" }) }),
        /* @__PURE__ */ jsx("p", { className: "ps-cart__text", children: "Your cart is currently empty" })
      ] }) }) : /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsx(BeatLoader, {}) })
    }
  );
};
const style$5 = "";
const Menu = ({}) => {
  const { isAuthed, user } = useAppSelector((state2) => state2.auth);
  const { cart, loaded } = useAppSelector((state2) => state2.cart);
  const { homeCategories } = useAppSelector((state2) => state2.app);
  const [state, setState] = useState({
    showMiniAuth: false,
    showMiniCart: false
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "header",
    {
      className: "ps-header ps-header--2 ps-header--7 ps-header--4",
      style: { borderBottom: "1px solid #d9dee8" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "ps-header__top", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
          /* @__PURE__ */ jsxs("div", { className: "header-left d-flex", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:(949)9421363",
                className: "ps-header__text d-flex align-items-center",
                children: [
                  /* @__PURE__ */ jsx("i", { className: "icon-telephone" }),
                  /* @__PURE__ */ jsx("strong", { style: { marginLeft: 5 }, children: "+(949) 942-1363 - Call Us" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "http://google.com",
                className: "ps-header__text d-flex align-items-center",
                children: [
                  /* @__PURE__ */ jsx("i", { className: "icon-envelope" }),
                  /* @__PURE__ */ jsx("strong", { style: { marginLeft: 5 }, children: "info@signs7.com" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "http://google.com",
                className: "ps-header__text d-flex align-items-center",
                children: [
                  /* @__PURE__ */ jsx("i", { className: "icon-map-marker" }),
                  /* @__PURE__ */ jsx("strong", { style: { marginLeft: 5 }, children: "New York" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ps-top__right", children: [
            /* @__PURE__ */ jsxs("div", { className: "ps-language-currency", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "ps-dropdown-value with-dp-modal",
                  onMouseLeave: () => setState((oldState) => ({
                    ...oldState,
                    showMiniAuth: false
                  })),
                  onMouseEnter: () => setState((oldState) => ({
                    ...oldState,
                    showMiniAuth: true
                  })),
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      className: "ps-header__item",
                      to: user ? "/profile" : "/login",
                      children: /* @__PURE__ */ jsx("i", { className: "icon-user" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  onMouseLeave: () => setState((oldState) => ({
                    ...oldState,
                    showMiniCart: false
                  })),
                  onMouseEnter: () => setState((oldState) => ({
                    ...oldState,
                    showMiniCart: true
                  })),
                  className: "ps-dropdown-value with-dp-modal",
                  children: [
                    /* @__PURE__ */ jsxs(Link, { className: "ps-header__item", to: "/cart", id: "cart-mini", children: [
                      /* @__PURE__ */ jsx("i", { className: "icon-cart-empty" }),
                      loaded && cart.items.length > 0 ? /* @__PURE__ */ jsx("span", { className: "badge-mini", children: cart.items.length }) : null
                    ] }),
                    /* @__PURE__ */ jsx(MiniCartModal, { active: state.showMiniCart })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "menu-top", children: [
              /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx("a", { className: "nav-link", href: "#", children: "About" }) }),
              /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx("a", { className: "nav-link", href: "#", children: "Contact" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ps-header__text", children: [
              "Need help? ",
              /* @__PURE__ */ jsx("strong", { children: "0020 500 - MYMEDI - 000" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "ps-header__middle", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "ps-header__menu", style: { width: "100%" }, children: /* @__PURE__ */ jsxs("ul", { className: "menu-custom", children: [
          /* @__PURE__ */ jsx("li", { className: "ps-logo custom-logo", children: /* @__PURE__ */ jsxs(Link, { to: "/", children: [
            /* @__PURE__ */ jsx("img", { src: "/img/logo.png", alt: "" }),
            /* @__PURE__ */ jsx("img", { className: "sticky-logo", src: "/img/logo.png", alt: "" })
          ] }) }),
          homeCategories.map(
            ({ id, title, icon, slug, products }, index2) => /* @__PURE__ */ jsxs(
              "li",
              {
                className: "ps-category__item ps-category__item-custom has-dropdown",
                children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: `/catalog/${slug}`,
                      className: "ps-category__link",
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: `/storage/${icon}`,
                          alt: title,
                          style: { width: "34px", height: "34px" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "ps-category__name", children: /* @__PURE__ */ jsx(Link, { to: `/catalog/${slug}`, children: title }) }),
                  /* @__PURE__ */ jsx("div", { className: "dropdown-content-menu", children: products.map((product) => /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: `/catalog/product/${product.slug}`,
                      children: product.title
                    },
                    `${id}-${product.id}`
                  )) })
                ]
              },
              id
            )
          )
        ] }) }) }) })
      ]
    }
  ) });
};
const style$4 = "";
const MobileHeader = ({}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthed, authChecked, user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);
  const { homeCategories } = useAppSelector((state) => state.app);
  const closeMenu = () => setShowMenu(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { className: "ps-header ps-header--6 ps-header--mobile", children: /* @__PURE__ */ jsx("div", { className: "ps-header__middle", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("div", { className: "ps-logo", children: /* @__PURE__ */ jsxs("a", { href: "/", children: [
        " ",
        /* @__PURE__ */ jsx("img", { src: "/img/logo.png", alt: "", style: { width: 80 } })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "ps-header__right", children: /* @__PURE__ */ jsx("ul", { className: "ps-header__icons", children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          className: "ps-header__item menu-slide",
          href: "#",
          onClick: (e) => {
            e.preventDefault();
            setShowMenu(true);
          },
          children: /* @__PURE__ */ jsx("i", { className: "fa-solid fa-bars" })
        }
      ) }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames("ps-menu--slidebar has-close-icon", {
          active: showMenu
        }),
        children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#",
              id: "close-menu",
              className: "ic-mobile-menu-close-button close-menu",
              onClick: () => setShowMenu(false),
              children: /* @__PURE__ */ jsx("i", { className: "icon-cross" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "ps-menu__content", children: /* @__PURE__ */ jsxs("ul", { className: "menu--mobile", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, to: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx("div", { className: "divider" }),
            homeCategories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, to: "/cart", children: category.title }) }, category.id)),
            /* @__PURE__ */ jsx("div", { className: "divider" }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { onClick: closeMenu, to: "/cart", children: [
              "Shopping Cart | ",
              cart.items.length
            ] }) }),
            isAuthed && user ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, to: "/profile", children: "Profile" }) }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, to: "/login", children: "Login" }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, to: "/register", children: "Create account" }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "ps-menu__footer", children: /* @__PURE__ */ jsx("div", { className: "ps-menu__item", children: /* @__PURE__ */ jsxs("div", { className: "ps-menu__contact", children: [
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "tel:+998999010033", style: { color: "#103178" }, children: /* @__PURE__ */ jsx("strong", { children: "+998 99 901 00 33" }) }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "tel:+998974243004", style: { color: "#103178" }, children: /* @__PURE__ */ jsx("strong", { children: "info@sign7.com" }) })
          ] }) }) })
        ]
      }
    )
  ] });
};
const style$3 = "";
const SocialFixedButtons = ({}) => {
  return /* @__PURE__ */ jsxs("ul", { className: "social-fixed-btns", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "mailto:info@signs.com", children: [
      /* @__PURE__ */ jsx("div", { className: "icon-box-social", children: /* @__PURE__ */ jsx("i", { className: "fas fa-envelope" }) }),
      /* @__PURE__ */ jsx("span", { children: "E-Mail" })
    ] }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "https://api.whatsapp.com/send?phone=123123", children: [
      /* @__PURE__ */ jsx("div", { className: "icon-box-social", children: /* @__PURE__ */ jsx("i", { className: "fab fa-whatsapp" }) }),
      /* @__PURE__ */ jsx("span", { children: "WhatsApp" })
    ] }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "tel:+1", children: [
      /* @__PURE__ */ jsx("div", { className: "icon-box-social", children: /* @__PURE__ */ jsx("i", { "aria-hidden": "true", className: "fas fa-phone" }) }),
      /* @__PURE__ */ jsx("span", { children: "Call us" })
    ] }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "tel:+1", children: [
      /* @__PURE__ */ jsx("div", { className: "icon-box-social", children: /* @__PURE__ */ jsx("i", { "aria-hidden": "true", className: "fab fa-instagram" }) }),
      /* @__PURE__ */ jsx("span", { children: "Instagram" })
    ] }) })
  ] });
};
const Layout = ({}) => {
  return /* @__PURE__ */ jsxs("div", { className: "ps-page", children: [
    /* @__PURE__ */ jsx(Menu, {}),
    /* @__PURE__ */ jsx(MobileHeader, {}),
    /* @__PURE__ */ jsx(SocialFixedButtons, {}),
    /* @__PURE__ */ jsx("div", { className: "main", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
class OrderService {
  static async orders(page) {
    return api.get(`/orders?page=${page}`);
  }
}
const OrdersList = ({
  data,
  pageCount,
  fetchData,
  loading
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  React.useEffect(() => {
    fetchData({ pageIndex });
  }, [fetchData, pageIndex]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { style: { marginBottom: 20 }, children: /* @__PURE__ */ jsx(Skeleton, { height: 200, count: 5 }) });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    data.map((order) => /* @__PURE__ */ jsx(OrderCard, { ...order }, order.uuid)),
    pageCount > 1 ? /* @__PURE__ */ jsxs("div", { className: "pagination-list", style: { marginBottom: 30 }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "pagenation-custom",
          onClick: () => setPageIndex(pageIndex - 1),
          disabled: pageIndex === 0,
          children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-left" })
        }
      ),
      /* @__PURE__ */ jsxs("span", { style: { marginLeft: 5, marginRight: 5 }, children: [
        "Page",
        /* @__PURE__ */ jsxs("strong", { children: [
          pageIndex + 1,
          " of ",
          pageCount
        ] }),
        " "
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "pagenation-custom",
          onClick: () => setPageIndex(pageIndex + 1),
          disabled: pageIndex + 1 === pageCount,
          children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-right" })
        }
      )
    ] }) : null
  ] });
};
const OrdersHistory = ({}) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchData = React.useCallback(async ({ pageIndex }) => {
    setLoading(true);
    const currentPage = pageIndex + 1;
    const { data: data2 } = await OrderService.orders(currentPage);
    setData(data2.data);
    setPageCount(data2.meta.last_page);
    setLoading(false);
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    OrdersList,
    {
      data,
      pageCount,
      loading,
      fetchData
    }
  ) }) });
};
const CheckoutSidebar = ({
  submiting
}) => {
  const { cart } = useAppSelector((state) => state.cart);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "ps-checkout__order",
      style: { position: "sticky", top: "100px" },
      children: [
        /* @__PURE__ */ jsx("h3", { className: "ps-checkout__heading", children: "Your order" }),
        /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row", children: [
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Product" }),
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Subtotal" })
        ] }),
        (cart == null ? void 0 : cart.items) && cart.items.length ? cart.items.map((cartItem) => /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row ps-product", children: [
          /* @__PURE__ */ jsxs("div", { className: "ps-product__name", children: [
            cartItem.name,
            " x ",
            /* @__PURE__ */ jsx("span", { children: cartItem.quantity })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ps-product__price", children: [
            "$",
            (cartItem.quantity * cartItem.price).toLocaleString()
          ] })
        ] }, cartItem.id)) : /* @__PURE__ */ jsx(Skeleton, { count: 4 }),
        /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row", children: [
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Subtotal" }),
          /* @__PURE__ */ jsx("div", { className: "ps-product__price", children: (cart == null ? void 0 : cart.total) ? `$${cart == null ? void 0 : cart.total.toLocaleString()}` : /* @__PURE__ */ jsx(Skeleton, {}) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row", children: [
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Tax" }),
          /* @__PURE__ */ jsx("div", { className: "ps-product__price", children: (cart == null ? void 0 : cart.tax) ? `$${cart == null ? void 0 : cart.tax.toLocaleString()}` : /* @__PURE__ */ jsx(Skeleton, {}) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row", children: [
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Total" }),
          /* @__PURE__ */ jsx("div", { className: "ps-product__price", children: (cart == null ? void 0 : cart.total_with_tax) ? `$${cart == null ? void 0 : cart.total_with_tax.toLocaleString()}` : /* @__PURE__ */ jsx(Skeleton, {}) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "ps-checkout__payment", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "ps-btn ps-btn--warning custom-button",
            type: "submit",
            disabled: submiting,
            children: "Place order"
          }
        ) })
      ]
    }
  );
};
class PaymentService {
  static retrivePaymentIntent() {
    return api.post(
      "/payment-intent"
    );
  }
  static updateTempOrder(tempOrderID, data) {
    return api.post(`temp-order/update/${tempOrderID}`, data);
  }
  static getPaymentIntent(payment_intent) {
    return api.get(`/payment-intent/retrive/${payment_intent}`);
  }
}
const CheckOutSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required("Phone is required!"),
  address: yup.string().required("Address is required!"),
  notes: yup.string().nullable(),
  user_id: yup.string().nullable()
});
const PaymentForm = ({ tempOrderID }) => {
  var _a, _b, _c, _d, _e, _f;
  const stripe = useStripe();
  const elements = useElements();
  const [submiting, setSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(CheckOutSchema),
    defaultValues: {
      name: (user == null ? void 0 : user.name) ?? "",
      email: (user == null ? void 0 : user.email) ?? "",
      user_id: (user == null ? void 0 : user.id) ?? void 0
    }
  });
  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }
    setSubmiting(true);
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] == null) {
        delete data[key];
      }
    });
    await PaymentService.updateTempOrder(tempOrderID, data);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href.split("?")[0] + "/success-payment",
        payment_method_data: {
          billing_details: {
            address: {
              country: "US",
              postal_code: "",
              state: "",
              city: "",
              line1: "",
              line2: ""
            }
          }
        }
      }
    });
    if (error) {
      setErrorMessage(error.message);
      setSubmiting(false);
    } else {
      setSubmiting(false);
    }
  };
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
    /* @__PURE__ */ jsx("div", { className: "col-12 col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "ps-checkout__form", children: [
      /* @__PURE__ */ jsx("h3", { className: "ps-checkout__heading", children: "Billing details" }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: !user ? /* @__PURE__ */ jsx(
          Input,
          {
            ...register("name"),
            error: (_a = errors.name) == null ? void 0 : _a.message,
            placeholder: "Your name",
            disabled: submiting,
            label: "Name",
            formType: "checkout"
          }
        ) : null }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: /* @__PURE__ */ jsx(
          Input,
          {
            ...register("phone"),
            type: "tel",
            placeholder: "Phone number",
            error: (_b = errors.phone) == null ? void 0 : _b.message,
            disabled: submiting,
            formType: "checkout",
            label: "Phone"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: !user ? /* @__PURE__ */ jsx(
          Input,
          {
            ...register("email"),
            type: "email",
            placeholder: "Email",
            error: (_c = errors.email) == null ? void 0 : _c.message,
            disabled: submiting,
            formType: "checkout",
            label: "Email"
          }
        ) : null }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: /* @__PURE__ */ jsx(
          Input,
          {
            ...register("address"),
            type: "tel",
            placeholder: "Address",
            error: (_d = errors.address) == null ? void 0 : _d.message,
            disabled: submiting,
            formType: "checkout",
            label: "Address"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "ps-checkout__group", children: [
          /* @__PURE__ */ jsx("label", { className: "ps-checkout__label", children: "Order notes (optional)" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "ps-textarea",
              rows: 7,
              ...register("notes"),
              placeholder: "Notes about your order, e.g. special notes for delivery."
            }
          ),
          ((_e = errors.notes) == null ? void 0 : _e.message) ? /* @__PURE__ */ jsx(
            "p",
            {
              style: {
                textTransform: "capitalize",
                color: "#ff5252"
              },
              children: (_f = errors.notes) == null ? void 0 : _f.message
            }
          ) : null
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-12", children: [
          submiting ? /* @__PURE__ */ jsx("div", { className: "overlay-loading", children: /* @__PURE__ */ jsx(BeatLoader, {}) }) : null,
          /* @__PURE__ */ jsx(
            PaymentElement,
            {
              options: {
                fields: { billingDetails: { address: "never" } }
              }
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "col-12 col-lg-4", children: /* @__PURE__ */ jsx(CheckoutSidebar, { submiting }) })
  ] }) });
};
const ProductFormContext = createContext(
  void 0
);
const UnitSelection = ({
  units: units2,
  currentUnit,
  disabled,
  setUnit
}) => {
  return /* @__PURE__ */ jsx("div", { className: "row", children: units2.map((unit) => /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames("product-variant", {
        "active-variant": currentUnit === unit,
        "disabled-variant": disabled
      }),
      onClick: () => !disabled && setUnit(unit),
      children: /* @__PURE__ */ jsx("h6", { style: { textTransform: "capitalize" }, children: unit })
    },
    unit
  )) });
};
const CalculatorForm = ({ staticData }) => {
  const { selectedOption } = useAppSelector((state2) => state2.product);
  const { state, setState } = useContext(ProductFormContext);
  const handleChange = (input, value) => {
    const regex = /^[0-9\b]+$/;
    if (!regex.test(value)) {
      return;
    }
    setState((state2) => ({
      ...state2,
      [input]: { ...state2[input], value }
    }));
  };
  const handleOnBlur = (input, currentValue) => {
    const maxInput = Number(selectedOption.validation[`max_${input}`]);
    if (maxInput <= 0) {
      return;
    }
    if (+currentValue > maxInput) {
      handleChange(input, maxInput);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("form", { style: { width: "100%", marginTop: 10 }, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "ps-form--review ps-form-calculator",
      style: { marginBottom: 0 },
      children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            onChange: (e) => handleChange("width", e.target.value),
            value: staticData ? staticData.static_width : state.width.value,
            formType: "checkout",
            disabled: state.disabled || staticData !== void 0,
            label: "Width",
            onBlur: (e) => handleOnBlur("width", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            value: staticData ? staticData.static_height : state.height.value,
            onChange: (e) => handleChange("height", e.target.value),
            formType: "checkout",
            disabled: state.disabled || staticData !== void 0,
            label: "Height",
            onBlur: (e) => handleOnBlur("height", e.target.value)
          }
        ) })
      ] })
    }
  ) }) });
};
const CustomSizesDropdown = ({ sizes, hasError }) => {
  const { state, setState } = useContext(ProductFormContext);
  const options = React.useMemo(() => {
    return sizes.map((size) => ({
      value: size.id,
      label: size.label,
      width: size.width,
      height: size.height
    }));
  }, [sizes]);
  return /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("form", { style: { width: "100%", marginTop: 10 }, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "ps-form--review ps-form-calculator",
      style: { marginBottom: 0 },
      children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs("div", { className: "ps-checkout__group", children: [
        /* @__PURE__ */ jsx("label", { className: "ps-checkout__label", children: "Adjusted sizes" }),
        /* @__PURE__ */ jsx(
          Select,
          {
            maxMenuHeight: 220,
            isSearchable: true,
            menuPlacement: "auto",
            options,
            onChange: (e) => setState((state2) => ({
              ...state2,
              customSize: { ...state2.customSize, value: e.value },
              width: { ...state2.width, value: e.width },
              height: { ...state2.width, value: e.height }
            })),
            value: options.find(
              (option) => option.value === state.customSize.value
            ),
            styles: {
              control: (baseStyles, state2) => ({
                ...baseStyles,
                borderColor: hasError ? "red" : state2.isFocused ? "#fd8d27" : "#f0f2f5",
                boxShadow: "unset",
                height: "46px",
                borderRadius: "40px",
                backgroundColor: "#f0f2f5",
                color: "#5b6c8f",
                paddingLeft: 12,
                paddingRight: 12,
                ":hover": {
                  borderColor: "#fd8d27"
                }
              }),
              menuList: (base) => ({
                ...base,
                background: "#f0f2f5",
                color: "5b6c8f"
              }),
              option: (baseStyles, state2) => ({
                ...baseStyles,
                color: state2.isSelected || state2.isFocused ? "white" : "#5b6c8f",
                background: state2.isSelected || state2.isFocused ? "#fd8d27" : "#f0f2f5"
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: "#5b6c8f"
              }),
              placeholder: (baseStyle2) => ({
                ...baseStyle2,
                color: "#5b6c8f"
              })
            }
          }
        )
      ] }) }) })
    }
  ) }) });
};
const units = ["inches", "feet"];
const ProductCalculator = ({}) => {
  const { selectedOption } = useAppSelector((state2) => state2.product);
  const { state, setState, validationRules } = useContext(ProductFormContext);
  const staticData = React.useMemo(() => {
    const isSignleType = selectedOption.type === "single";
    if (isSignleType) {
      return selectedOption.show_custom_sizes === false && selectedOption.size_for_collect ? selectedOption.common_data : void 0;
    }
    return void 0;
  }, [selectedOption]);
  const hasCustomSize = React.useMemo(() => {
    if (selectedOption.type === "sqft")
      return false;
    return selectedOption.size_for_collect && selectedOption.show_custom_sizes;
  }, [selectedOption]);
  const handleSizeTypeSelect = (type) => {
    setState((state2) => ({
      ...state2,
      typeSizeSelection: type,
      customSize: { value: void 0, error: void 0 }
    }));
  };
  return /* @__PURE__ */ jsx("div", { className: "ps-checkout", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { style: { width: "100%" }, children: /* @__PURE__ */ jsx("h6", { children: "Sizes:" }) }) }),
    selectedOption.show_custom_sizes && /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames("product-variant", {
            "active-variant": state.typeSizeSelection === "default",
            "disabled-variant": state.disabled
          }),
          onClick: () => !state.disabled && handleSizeTypeSelect("default"),
          children: /* @__PURE__ */ jsx("h6", { style: { textTransform: "capitalize" }, children: "Default" })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames("product-variant", {
            "active-variant": state.typeSizeSelection === "custom",
            "disabled-variant": state.disabled
          }),
          onClick: () => !state.disabled && handleSizeTypeSelect("custom"),
          children: /* @__PURE__ */ jsx("h6", { style: { textTransform: "capitalize" }, children: "Custom" })
        }
      )
    ] }),
    !staticData && !hasCustomSize ? /* @__PURE__ */ jsx(
      UnitSelection,
      {
        currentUnit: state.unit,
        units,
        disabled: state.disabled,
        setUnit: (unit) => setState((state2) => ({ ...state2, unit }))
      }
    ) : void 0,
    state.typeSizeSelection === "custom" ? /* @__PURE__ */ jsx(CalculatorForm, { staticData }) : null,
    state.typeSizeSelection === "default" && selectedOption.type !== "sqft" ? /* @__PURE__ */ jsx(
      CustomSizesDropdown,
      {
        sizes: selectedOption.customSizes,
        hasError: state.highlightErrors && !validationRules["customSize"]
      }
    ) : null
  ] }) });
};
const ProductCard = (props) => {
  useAppDispatch();
  const location = useLocation();
  const { title, id, slug, images, with_checkout, min_price } = props;
  useState(false);
  const productURL = React.useMemo(
    () => !props.fullPage ? `/home/product/modal/${slug}` : `/catalog/product/${slug}`,
    [props]
  );
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "ps-section__product", style: { height: "100%" }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "ps-product ps-product--standard",
      style: { height: "100%" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__thumbnail ps-product__thumbnail-card", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "ps-product__image",
            to: productURL,
            state: {
              background: props.fullPage ? null : location,
              product: props,
              category: props.category
            },
            children: /* @__PURE__ */ jsx("figure", { children: images.slice(0, 2).map((image) => /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${image.path}`,
                alt: image.alt ? image.alt : title
              }
            )) })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "ps-product__content", children: [
          /* @__PURE__ */ jsx("div", { className: "product-wrapper", children: /* @__PURE__ */ jsx("div", { className: "meta-wrapper", children: props.categories.map((category, index2) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/catalog/${category.slug}`,
              className: "ps-product__branch",
              children: [
                category.title,
                " ",
                index2 < props.categories.length - 1 ? " | " : ""
              ]
            },
            `category-card-product-${category.id}`
          )) }) }),
          /* @__PURE__ */ jsx("h5", { className: "ps-product__title", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: productURL,
              state: {
                background: props.fullPage ? null : location,
                product: props,
                category: props.category
              },
              style: { fontWeight: 600 },
              children: title
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "ps-product__actions ps-product__group-mobile", children: [
            /* @__PURE__ */ jsx("div", { className: "ps-product__quantity", children: /* @__PURE__ */ jsxs("div", { className: "def-number-input number-input safari_only", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "minus",
                  children: /* @__PURE__ */ jsx("i", { className: "icon-minus" })
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "quantity",
                  min: "0",
                  name: "quantity",
                  value: "1",
                  type: "number"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "plus",
                  children: /* @__PURE__ */ jsx("i", { className: "icon-plus" })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "ps-product__cart", children: /* @__PURE__ */ jsx(
              Link,
              {
                className: "ps-btn ps-btn--warning",
                to: productURL,
                state: {
                  background: props.fullPage ? null : location,
                  product: props,
                  category: props.category
                },
                children: "Add to cart"
              }
            ) }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: productURL,
                state: {
                  background: props.fullPage ? null : location,
                  product: props,
                  category: props.category
                },
                children: /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", children: "Details" })
              }
            )
          ] })
        ] })
      ]
    }
  ) }) });
};
class ProductService {
  static getProduct(slug) {
    return api.get(`/products/${slug}`);
  }
  static getProductVariants(slug) {
    return api.get(`/products/${slug}/variants`);
  }
  static sendRequestProduct(slug, data) {
    return api.post(`/product-request/${slug}`, data);
  }
}
const initialState$2 = {
  loading: true,
  selectedOption: void 0,
  addons: [],
  product: void 0,
  productSlug: void 0
};
const getProduct = createAsyncThunk("app/getSingleProduct", async function({ slug }, { rejectWithValue }) {
  try {
    const { data } = await ProductService.getProduct(slug);
    return data.product;
  } catch (error) {
    return rejectWithValue("Error fetch product");
  }
});
const singleProductSlice = createSlice({
  name: "product",
  initialState: initialState$2,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
      if (action.payload.with_checkout) {
        const [firstOption] = action.payload.options;
        state.selectedOption = firstOption;
        state.addons = firstOption.addons.map((addon) => ({
          ...addon,
          isSelected: false,
          quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
          extra_data_selected: []
        }));
      }
      state.loading = false;
    },
    selectProductOption(state, action) {
      state.selectedOption = action.payload;
      state.addons = action.payload.addons.map((addon) => ({
        ...addon,
        isSelected: false,
        quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
        extra_data_selected: []
      }));
    },
    clearProductState(state) {
      state.selectedOption = void 0;
      state.loading = true;
      state.product = void 0;
      state.productSlug = void 0;
    },
    handleAddonChange(state, { payload }) {
      const currentAddon = state.addons.find(
        (addon) => addon.id === payload.id
      );
      if (currentAddon) {
        currentAddon.isSelected = !currentAddon.isSelected;
      }
    },
    updateAddonQuantity(state, { payload }) {
      const { quantity, addonID } = payload;
      const addon = state.addons.find((addon2) => addon2.id === addonID);
      if (addon && addon.withQuantity) {
        addon.quantity = quantity;
      }
    },
    selectExtraDataItems(state, {
      payload
    }) {
      const { addonID, targetExtraData, isMultiSelect } = payload;
      const addon = state.addons.find((addon2) => addon2.id === addonID);
      if (!addon) {
        return;
      }
      const indexOfSelected = addon.extra_data_selected.findIndex(
        (extraData) => extraData.id === targetExtraData.id
      );
      if (indexOfSelected === -1) {
        if (isMultiSelect) {
          addon.extra_data_selected.push(targetExtraData);
        } else {
          const emptySelectedList = [];
          emptySelectedList.push(targetExtraData);
          addon.extra_data_selected = emptySelectedList;
        }
      } else {
        addon.extra_data_selected.splice(indexOfSelected, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      if (action.payload.with_checkout) {
        const [firstOption] = action.payload.options;
        state.selectedOption = firstOption;
        state.addons = firstOption.addons.map((addon) => ({
          ...addon,
          isSelected: false,
          quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
          extra_data_selected: []
        }));
      }
      state.productSlug = action.payload.slug;
      state.loading = false;
    });
  }
});
const {
  setProduct,
  clearProductState,
  selectProductOption,
  handleAddonChange,
  updateAddonQuantity,
  selectExtraDataItems
} = singleProductSlice.actions;
const singleProductSliceReducer = singleProductSlice.reducer;
const ProductOptions = ({}) => {
  const { state } = useContext(ProductFormContext);
  const { product, selectedOption } = useAppSelector((state2) => state2.product);
  const dispatch = useAppDispatch();
  if (product.with_checkout === false)
    return;
  return /* @__PURE__ */ jsx("div", { children: product ? /* @__PURE__ */ jsx("div", { children: product.options.length === 1 ? /* @__PURE__ */ jsxs("h6", { children: [
    "Option: ",
    product.options[0].title
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h6", { children: "Options:" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "ps-product__size ps-select--feature",
        style: { display: "flex", flexWrap: "wrap" },
        children: product.options.map((option) => /* @__PURE__ */ jsx(
          "a",
          {
            className: classNames({
              active: option.id === (selectedOption == null ? void 0 : selectedOption.id),
              "disabled-variant": state.disabled
            }),
            style: { marginRight: 10, marginTop: 10 },
            onClick: (e) => {
              e.preventDefault();
              if (state.disabled) {
                return;
              }
              dispatch(selectProductOption(option));
            },
            href: "#",
            children: option.title
          },
          `${product.id}-${option.id}-o`
        ))
      }
    )
  ] }) }) : /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: { width: "33%" }, children: /* @__PURE__ */ jsx(Skeleton, { height: 35, width: "100%" }) }),
        /* @__PURE__ */ jsx("div", { style: { width: "33%" }, children: /* @__PURE__ */ jsx(Skeleton, { height: 35, width: "100%" }) }),
        /* @__PURE__ */ jsx("div", { style: { width: "33%" }, children: /* @__PURE__ */ jsx(Skeleton, { height: 35, width: "100%" }) })
      ]
    }
  ) });
};
const ProductQuantity = ({ value, onChange }) => {
  const handleChange = (quantity) => {
    console.log(value, "value");
    const regex = /^[0-9\b]+$/;
    if (!regex.test(value)) {
      return;
    }
    if (quantity >= 0) {
      onChange(quantity);
    } else {
      onChange(value);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "qty-input-with-btns", children: [
    /* @__PURE__ */ jsx("button", { onClick: () => handleChange(value === 1 ? 1 : value - 1), children: /* @__PURE__ */ jsx("i", { className: "icon-minus" }) }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value,
        className: "qty-input",
        onChange: (e) => handleChange(+e.target.value),
        onBlur: () => value == 0 && handleChange(1)
      }
    ),
    /* @__PURE__ */ jsx("button", { onClick: () => handleChange(value + 1), children: /* @__PURE__ */ jsx("i", { className: "icon-plus" }) })
  ] });
};
const style$2 = "";
const PrevArrow = ({ className, style: style2, onClick }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: `${className} custom-arrow left-arrow`,
    style: { ...style2, display: "block" },
    onClick,
    children: /* @__PURE__ */ jsx("i", { className: "icon-chevron-left" })
  }
);
const NextArrow = ({ className, style: style2, onClick }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: `${className} custom-arrow right-arrow`,
    style: { ...style2, display: "block" },
    onClick,
    children: /* @__PURE__ */ jsx("i", { className: "icon-chevron-right" })
  }
);
const ThumbnailSlick = {
  // slidesToShow: 5,
  slidesToScroll: 1,
  lazyLoad: "ondemand",
  dots: false,
  arrows: false,
  focusOnSelect: true,
  infinite: false
};
const MainSlick = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  lazyLoad: "ondemand"
};
const ProductSlider = ({ images, productName }) => {
  const [mainSlickRef, setMainSlickRef] = useState(null);
  const [thumbNailSlickRef, setThumbNailSlickRef] = useState(null);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "ps-product--gallery",
      style: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "sticky-sliders", children: [
        /* @__PURE__ */ jsx(
          Slider,
          {
            ref: (slider) => setMainSlickRef(slider),
            asNavFor: thumbNailSlickRef,
            ...MainSlick,
            nextArrow: /* @__PURE__ */ jsx(NextArrow, {}),
            prevArrow: /* @__PURE__ */ jsx(PrevArrow, {}),
            className: "ps-product__thumbnail",
            children: images.map((img2) => /* @__PURE__ */ jsx("div", { className: "slide", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${img2.path}`,
                alt: img2.alt ? img2.alt : productName
              }
            ) }, `main-${img2.id}`))
          }
        ),
        /* @__PURE__ */ jsx(
          Slider,
          {
            ref: (slider) => setThumbNailSlickRef(slider),
            asNavFor: mainSlickRef,
            ...ThumbnailSlick,
            slidesToShow: 5,
            className: "ps-gallery--image",
            style: { display: "block" },
            children: images.map((img2) => /* @__PURE__ */ jsx("div", { className: "slide", children: /* @__PURE__ */ jsx("div", { className: "ps-gallery__item", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${img2.path}`,
                alt: img2.alt ? img2.alt : productName
              }
            ) }) }, `thumb-${img2.id}`))
          }
        )
      ] })
    }
  );
};
const BASE_FOR_NOT_AUTHED_REDIRECT = "/login";
const BASE_FOR_AUTHED_REDIRECT = "/profile";
const ProtectedRoute = ({ allowAuthed = true }) => {
  const { isAuthed } = useAppSelector((state) => state.auth);
  if (allowAuthed && isAuthed === false) {
    return /* @__PURE__ */ jsx(Navigate, { to: BASE_FOR_NOT_AUTHED_REDIRECT, replace: true });
  }
  if (allowAuthed === false && isAuthed) {
    return /* @__PURE__ */ jsx(Navigate, { to: BASE_FOR_AUTHED_REDIRECT, replace: true });
  }
  return /* @__PURE__ */ jsx(Outlet, {});
};
const swiper_min = "";
const navigation_min = "";
const pagination_min = "";
const scrollbar_min = "";
const HomeSlider = ({}) => {
  return /* @__PURE__ */ jsxs(
    Swiper,
    {
      modules: [Autoplay],
      loop: true,
      autoplay: {
        delay: 5e3
      },
      className: "mySwiper",
      children: [
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx("div", { className: "ps-banner", style: { background: "#F0F2F5" }, children: /* @__PURE__ */ jsx("div", { className: "container container-initial", children: /* @__PURE__ */ jsxs("div", { className: "ps-banner__block", children: [
          /* @__PURE__ */ jsxs("div", { className: "ps-banner__content", children: [
            /* @__PURE__ */ jsxs("h2", { className: "ps-banner__title", children: [
              "Signs, Decals...",
              /* @__PURE__ */ jsx("br", {}),
              " Only in NY"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ps-banner__desc", children: "Only this week" }),
            /* @__PURE__ */ jsx("a", { className: "bg-warning ps-banner__shop", href: "#", children: "Shop now" }),
            /* @__PURE__ */ jsxs("div", { className: "ps-banner__persen bg-yellow ps-top", children: [
              /* @__PURE__ */ jsx("small", { children: "only" }),
              "$25"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ps-banner__thumnail", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "ps-banner__round",
                src: "/img/round5.png",
                alt: "alt"
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "ps-banner__image",
                src: "/img/promotion/slide3.png",
                alt: "alt"
              }
            )
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx("div", { className: "ps-banner", style: { background: "#DAECFA" }, children: /* @__PURE__ */ jsx("div", { className: "container container-initial", children: /* @__PURE__ */ jsxs("div", { className: "ps-banner__block", children: [
          /* @__PURE__ */ jsxs("div", { className: "ps-banner__content", children: [
            /* @__PURE__ */ jsxs("h2", { className: "ps-banner__title", children: [
              "Banner ",
              /* @__PURE__ */ jsx("br", {}),
              " all types"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ps-banner__desc", children: "Only in this week. Don’t misss!" }),
            /* @__PURE__ */ jsxs("div", { className: "ps-banner__price", children: [
              " ",
              /* @__PURE__ */ jsx("span", { children: "$15.99" }),
              /* @__PURE__ */ jsx("del", { children: "$29.99" })
            ] }),
            /* @__PURE__ */ jsx("a", { className: "bg-warning ps-banner__shop", href: "#", children: "Shop now" }),
            /* @__PURE__ */ jsx("div", { className: "ps-banner__persen bg-warning ps-center", children: "-30%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ps-banner__thumnail", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "ps-banner__round",
                src: "/img/round2.png",
                alt: "alt"
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "ps-banner__image",
                src: "/img/promotion/slide1.png",
                alt: "alt"
              }
            )
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsx(SwiperNavigation, {})
      ]
    }
  );
};
const SwiperNavigation = () => {
  const swiper = useSwiper();
  return /* @__PURE__ */ jsxs("div", { className: "swipper-nav", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => swiper.slidePrev(),
        className: "slide-prev-swiper swipper-arrow",
        children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-left" })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => swiper.slideNext(),
        className: "slide-next-swiper swipper-arrow",
        children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-right" })
      }
    )
  ] });
};
function Home() {
  const { homeCategories } = useAppSelector((state) => state.app);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "Home page" }) }),
    /* @__PURE__ */ jsxs("div", { className: "ps-home ps-home--4", children: [
      /* @__PURE__ */ jsx("section", { className: "ps-section--banner", children: /* @__PURE__ */ jsx(HomeSlider, {}) }),
      homeCategories.map((category, idx) => {
        const { products, id, title, slug } = category;
        return /* @__PURE__ */ jsx(
          "section",
          {
            className: classNames({
              "ps-section--featured": true,
              "main-section": true,
              "alt-section": idx % 2 === 0
            }),
            children: /* @__PURE__ */ jsxs("div", { className: "container-fluid", children: [
              /* @__PURE__ */ jsx("h3", { className: "ps-section__title", children: title }),
              /* @__PURE__ */ jsxs("div", { className: "ps-section__content", children: [
                /* @__PURE__ */ jsx("div", { className: "row m-0", children: products.map((product, idx2) => /* @__PURE__ */ jsx("div", { className: "col-md-3 p-0", children: /* @__PURE__ */ createElement(
                  ProductCard,
                  {
                    ...product,
                    key: `${product.id}-${idx2}`,
                    fullPage: product.with_checkout
                  }
                ) })) }),
                /* @__PURE__ */ jsx("div", { className: "ps-shop__more", children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: `/catalog/${slug}`,
                    style: { display: "block" },
                    className: "home_show_more",
                    children: "Show all"
                  }
                ) })
              ] })
            ] })
          }
        );
      })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const DEFAULT_ERROR_MESSAGE = "Something went wrong, please try again later";
function axiosErrorGrab(error) {
  var _a;
  try {
    if (axios.isAxiosError(error)) {
      switch ((_a = error.response) == null ? void 0 : _a.status) {
        case 400:
          return {
            type: "message",
            error: error.response.data.error
          };
        case 422:
          return { type: "validation", errors: error.response.data.errors };
        default:
          return {
            type: "message",
            error: DEFAULT_ERROR_MESSAGE
          };
      }
    }
    return {
      type: "message",
      error: DEFAULT_ERROR_MESSAGE
    };
  } catch (_) {
    return {
      type: "message",
      error: DEFAULT_ERROR_MESSAGE
    };
  }
}
function isCustomAxisError(error) {
  return error.type !== void 0;
}
const initialState$1 = {
  authChecked: false,
  isAuthed: false,
  user: void 0
};
const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(email, password);
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorGrab(error));
  }
});
const registerUser = createAsyncThunk("auth/register", async ({ email, password, name: name2 }, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(email, password, name2);
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorGrab(error));
  }
});
const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    await AuthService.logout();
  }
);
const getUserByToken = createAsyncThunk("auth/user", async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.getUser();
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorGrab(error));
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState: initialState$1,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.authChecked = true;
      state.isAuthed = true;
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.fulfilled, (state, acction) => {
      state.authChecked = true;
      state.isAuthed = true;
      state.user = acction.payload.user;
    });
    builder.addCase(getUserByToken.fulfilled, (state, action) => {
      state.authChecked = true;
      state.isAuthed = true;
      state.user = action.payload;
    });
    builder.addCase(getUserByToken.rejected, (state) => {
      state.authChecked = true;
      state.isAuthed = false;
      state.user = void 0;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.authChecked = true;
      state.isAuthed = false;
      state.user = void 0;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.authChecked = true;
      state.isAuthed = false;
      state.user = void 0;
    });
  }
});
const { updateUser } = authSlice.actions;
const authReducer = authSlice.reducer;
const LoginSchema$1 = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(7).required()
}).required();
function Login() {
  var _a, _b;
  const navigate = useNavigate();
  const { isAuthed, authChecked } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(LoginSchema$1)
  });
  useEffect(() => {
    if (authChecked && isAuthed === true) {
      navigate(BASE_FOR_AUTHED_REDIRECT);
    }
  }, [isAuthed, authChecked]);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const loginData = await dispatch(login(data)).unwrap();
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      if (!isCustomAxisError(error)) {
        return;
      }
      if (error.type === "message") {
        toast(error.error, { type: "error" });
      }
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "ps-account", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", style: { justifyContent: "center" }, children: /* @__PURE__ */ jsx("div", { className: "col-12 col-md-8", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", children: [
    /* @__PURE__ */ jsx("h2", { className: "ps-form__title", children: "Login" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("email"),
        type: "email",
        error: (_a = errors.email) == null ? void 0 : _a.message,
        disabled: isSubmitting,
        formType: "profile",
        label: "Email"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("password"),
        type: "password",
        error: (_b = errors.password) == null ? void 0 : _b.message,
        disabled: isSubmitting,
        formType: "profile",
        label: "Password"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "ps-form__submit", children: [
      /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", children: "Log in" }),
      /* @__PURE__ */ jsx("div", { className: "form-check", children: /* @__PURE__ */ jsx(Link, { className: "ps-account__link", to: "/register", children: "Create account" }) })
    ] }),
    /* @__PURE__ */ jsx(Link, { className: "ps-account__link", to: "/forgot-password", children: "Lost your password?" })
  ] }) }) }) }) }) });
}
const Profile = ({}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "My profile" }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-shopping", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Profile" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "ps-shopping__title", children: "Profile" }),
      /* @__PURE__ */ jsx("div", { className: "ps-shopping__content", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-7 col-lg-9", children: /* @__PURE__ */ jsx(OrdersHistory, {}) }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-5 col-lg-3", children: /* @__PURE__ */ jsxs("div", { className: "ps-shopping__box", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "ps-shopping__row",
              style: { textAlign: "center" },
              children: /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: "/default-profile.png",
                        width: 80,
                        style: { borderRadius: "50%" },
                        height: 80
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { style: { marginTop: 20 }, children: user.name })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "ps-shopping__row", children: [
            /* @__PURE__ */ jsx("div", { className: "ps-shopping__label", children: "Email" }),
            /* @__PURE__ */ jsx("div", { className: "ps-shopping__price", children: user == null ? void 0 : user.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ps-shopping__checkout", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                className: "ps-shopping__link",
                to: "/profile/edit",
                style: { marginBottom: 15 },
                children: "Edit Profile"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                className: "ps-btn ps-btn--warning",
                onClick: () => dispatch(logoutUser()),
                style: { marginBottom: 0, marginTop: 15 },
                children: "Logout"
              }
            )
          ] })
        ] }) })
      ] }) })
    ] }) })
  ] });
};
const RegisterSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(7).required()
}).required();
function Register() {
  var _a, _b, _c;
  const navigate = useNavigate();
  const { isAuthed, authChecked } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(RegisterSchema)
  });
  useEffect(() => {
    if (authChecked && isAuthed === true) {
      navigate(BASE_FOR_AUTHED_REDIRECT);
    }
  }, [isAuthed, authChecked]);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const loginData = await dispatch(registerUser(data)).unwrap();
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      if (!isCustomAxisError(error)) {
        return;
      }
      if (error.type === "message") {
        toast(error.error, { type: "error" });
      }
      if (error.type === "validation") {
        let errors2 = error.errors;
        Object.keys(errors2).forEach((errInput) => {
          errors2[errInput].forEach((errMessage) => {
            toast(errMessage, { type: "error" });
          });
        });
      }
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "ps-account", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", style: { justifyContent: "center" }, children: /* @__PURE__ */ jsx("div", { className: "col-12 col-md-8", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", children: [
    /* @__PURE__ */ jsx("h2", { className: "ps-form__title", children: "Create account" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("name"),
        type: "text",
        error: (_a = errors.name) == null ? void 0 : _a.message,
        disabled: isSubmitting,
        formType: "profile",
        label: "Name"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("email"),
        type: "email",
        error: (_b = errors.email) == null ? void 0 : _b.message,
        disabled: isSubmitting,
        formType: "profile",
        label: "Email"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("password"),
        type: "password",
        error: (_c = errors.password) == null ? void 0 : _c.message,
        disabled: isSubmitting,
        formType: "profile",
        label: "Password"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-form__submit", children: /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", children: "Create account" }) }),
    /* @__PURE__ */ jsx(Link, { className: "ps-account__link", to: "/login", children: "Have an account? Login." })
  ] }) }) }) }) }) });
}
const ForgotPassword = ({}) => {
  var _a;
  const [isSubmiting, setSubmiting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setSubmiting(true);
      await AuthService.sendForgotPasswordRequest(data.email);
      toast("Reset password request has been sent to your email.", {
        type: "success"
      });
      reset();
      setSubmiting(false);
    } catch (error) {
      const axiosError = axiosErrorGrab(error);
      toast(
        axiosError.type === "message" ? axiosError.error : DEFAULT_ERROR_MESSAGE,
        {
          type: "error"
        }
      );
      setSubmiting(false);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "ps-account", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", style: { justifyContent: "center" }, children: /* @__PURE__ */ jsx("div", { className: "col-12 col-md-8", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", children: [
    /* @__PURE__ */ jsx("h2", { className: "ps-form__title", children: "Reset password" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("email"),
        type: "email",
        error: (_a = errors.email) == null ? void 0 : _a.message,
        disabled: isSubmiting,
        formType: "profile",
        label: "Email"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-form__submit", children: /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", children: "Reset" }) }),
    /* @__PURE__ */ jsx(Link, { className: "ps-account__link", to: "/login", children: "Login." })
  ] }) }) }) }) }) }) });
};
const ResetPasswordValidation = yup.object({
  password: yup.string().required().min(7),
  passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
});
const ResetPassword = ({}) => {
  var _a, _b;
  const params = useParams();
  const [isSubmiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ResetPasswordValidation)
  });
  const onSubmit = async (data) => {
    try {
      setSubmiting(true);
      await AuthService.resetPassword(
        params.token || "",
        data.password,
        data.passwordConfirmation
      );
      toast("Success! Your password has been changed.", {
        type: "success"
      });
      setSubmiting(false);
      navigate("/login");
      reset();
    } catch (error) {
      const axiosError = axiosErrorGrab(error);
      setSubmiting(false);
      toast(
        axiosError.type === "message" ? axiosError.error : DEFAULT_ERROR_MESSAGE,
        {
          type: "error"
        }
      );
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [
    /* @__PURE__ */ jsx("h1", { children: "Reset Password" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("password"),
        type: "password",
        error: (_a = errors.password) == null ? void 0 : _a.message,
        disabled: isSubmiting,
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("passwordConfirmation"),
        type: "password",
        error: (_b = errors.passwordConfirmation) == null ? void 0 : _b.message,
        disabled: isSubmiting,
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx("input", { type: "submit", disabled: isSubmiting })
  ] }) });
};
const EditProfile = ({}) => {
  return /* @__PURE__ */ jsx("div", { className: "ps-account", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
      /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { to: "/profile", children: "Profile" }) }),
      /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Edit Profile" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "row", style: { justifyContent: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "col-12 col-md-8", children: [
      /* @__PURE__ */ jsx(UpdatePersonalInformationForm, {}),
      /* @__PURE__ */ jsx(UpdatePasswordForm, {})
    ] }) })
  ] }) });
};
const CartListMobile = ({ items }) => {
  const dispatch = useAppDispatch();
  const removeItem = async (id) => {
    try {
      await dispatch(removeItemFromCart({ item_id: id })).unwrap();
      toast(`Successfully removed ${name}`, {
        type: "success"
      });
    } catch (error) {
      toast("An error occurred while removing item", { type: "error" });
    }
  };
  return /* @__PURE__ */ jsx("ul", { className: "ps-shopping__list", children: items.map((cartItem) => /* @__PURE__ */ jsx("li", { id: cartItem.id, children: /* @__PURE__ */ jsxs("div", { className: "ps-product ps-product--wishlist", children: [
    /* @__PURE__ */ jsx("div", { className: "ps-product__remove", children: /* @__PURE__ */ jsx("a", { href: "#", onClick: () => removeItem(cartItem.id), children: /* @__PURE__ */ jsx("i", { className: "icon-cross" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-product__thumbnail", children: /* @__PURE__ */ jsx("a", { className: "ps-product__image", children: /* @__PURE__ */ jsx("figure", { children: cartItem.associatedModel.images && cartItem.associatedModel.images.length > 0 ? /* @__PURE__ */ jsx(
      "img",
      {
        src: `/storage/${cartItem.associatedModel.images[0].path}`,
        alt: cartItem.associatedModel.images[0].alt
      }
    ) : null }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "ps-product__content", children: [
      /* @__PURE__ */ jsxs("h5", { className: "ps-product__title", children: [
        /* @__PURE__ */ jsx("a", { href: "", children: cartItem.name }),
        /* @__PURE__ */ jsx("p", { children: generateAttributtesCartItem(cartItem.attributes) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ps-product__row", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__label", children: "Price:" }),
        /* @__PURE__ */ jsx("div", { className: "ps-product__value", children: /* @__PURE__ */ jsxs("span", { className: "ps-product__price", children: [
          "$",
          cartItem.price.toLocaleString()
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ps-product__row ps-product__quantity", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__label", children: "Quantity:" }),
        /* @__PURE__ */ jsx("div", { className: "ps-product__value", children: cartItem.quantity })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ps-product__row ps-product__subtotal", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__label", children: "Subtotal:" }),
        /* @__PURE__ */ jsxs("div", { className: "ps-product__value", children: [
          "$",
          (cartItem.price * cartItem.quantity).toLocaleString()
        ] })
      ] })
    ] })
  ] }) })) });
};
const Cart = ({}) => {
  useAppDispatch();
  useNavigate();
  const { cart, loaded } = useAppSelector((state) => state.cart);
  if (!loaded) {
    return /* @__PURE__ */ jsx("h2", { children: "Cart is loading..." });
  }
  const renderCart = () => {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("h3", { className: "ps-shopping__title", children: [
        "Shopping cart",
        /* @__PURE__ */ jsxs("sup", { children: [
          "(",
          cart.items.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ps-shopping__content", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-12 col-md-7 col-lg-9", children: [
          /* @__PURE__ */ jsx(CartList, { items: cart.items }),
          /* @__PURE__ */ jsx(CartListMobile, { items: cart.items })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-12 col-md-5 col-lg-3", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "ps-shopping__label",
              style: {
                fontSize: 18,
                padding: "18px 0px",
                lineHeight: "unset"
              },
              children: "Cart totals"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "ps-shopping__box", children: [
            /* @__PURE__ */ jsxs("div", { className: "ps-shopping__row", children: [
              /* @__PURE__ */ jsx("div", { className: "ps-shopping__label", children: "Subtotal" }),
              /* @__PURE__ */ jsxs("div", { className: "ps-shopping__price", children: [
                "$",
                cart.total.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ps-shopping__row", children: [
              /* @__PURE__ */ jsx("div", { className: "ps-shopping__label", children: "Tax" }),
              /* @__PURE__ */ jsxs("div", { className: "ps-shopping__price", children: [
                "$",
                cart.tax.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ps-shopping__row", children: [
              /* @__PURE__ */ jsx("div", { className: "ps-shopping__label", children: "Total" }),
              /* @__PURE__ */ jsxs("div", { className: "ps-shopping__price", children: [
                "$",
                cart.total_with_tax.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ps-shopping__checkout", children: [
              /* @__PURE__ */ jsx(Link, { className: "ps-btn ps-btn--warning", to: "checkout", children: "Proceed to checkout" }),
              /* @__PURE__ */ jsx(Link, { className: "ps-shopping__link", to: "/", children: "Continue To Shopping" })
            ] })
          ] })
        ] })
      ] }) })
    ] });
  };
  const renderEmptyCart = () => {
    return /* @__PURE__ */ jsxs("div", { className: "cart-empty text-center title-with-icon-section", children: [
      /* @__PURE__ */ jsx("div", { className: "ps-cart__icon", children: /* @__PURE__ */ jsx(
        "i",
        {
          className: "fa fa-shopping-basket",
          style: { color: "#5b6c8f", fontSize: 120 }
        }
      ) }),
      /* @__PURE__ */ jsx("h1", { className: "cart-title", style: { color: "#103178", marginTop: 20 }, children: "Your cart is empty" })
    ] });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "Shopping cart" }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-shopping", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Shopping cart" })
      ] }),
      /* @__PURE__ */ jsx("div", { children: cart.items.length > 0 ? renderCart() : renderEmptyCart() })
    ] }) })
  ] });
};
const LoginSchema = yup.object({
  name: yup.string().min(2).required(),
  email: yup.string().email().required()
}).required();
const ModalContentWithForm = ({ product }) => {
  var _a, _b;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(LoginSchema)
  });
  const onSubmit = async (inputs) => {
    setIsSubmitting(true);
    try {
      const { data } = await ProductService.sendRequestProduct(
        product.slug,
        inputs
      );
      if (data.ok) {
        toast("Your request has been sent!", { type: "success" });
      } else {
        toast("Error sending request, please try again later", {
          type: "error"
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      toast("Error sending request, please try again later", {
        type: "error"
      });
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "ps-checkout", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("form", { style: { width: "100%" }, onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", style: { marginBottom: 0 }, children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "text",
        ...register("name"),
        error: (_a = errors.name) == null ? void 0 : _a.message,
        disabled: isSubmitting,
        formType: "checkout",
        label: "Name"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "email",
        ...register("email"),
        error: (_b = errors.email) == null ? void 0 : _b.message,
        disabled: isSubmitting,
        formType: "checkout",
        label: "Email"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-form__submit", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        style: { width: "100%" },
        className: "ps-btn ps-btn--warning custom-button",
        disabled: isSubmitting,
        children: "Let's Talk"
      }
    ) })
  ] }) }) }) }) });
};
function withProductControl(Component) {
  return function(props) {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, product, addons, selectedOption } = useAppSelector(
      (state2) => state2.product
    );
    useLocation();
    const [state, setState] = useState({
      selectedAddons: [],
      selectedOption: void 0,
      typeSizeSelection: "custom",
      highlightErrors: false,
      disabled: false,
      width: {
        error: void 0,
        value: 1,
        showError: false
      },
      height: {
        error: void 0,
        value: 1,
        showError: false
      },
      customSize: {
        error: void 0,
        value: void 0
      },
      unit: "inches",
      price: 100,
      quantity: 1,
      calculatedPrice: void 0
    });
    const isProductLoading = React.useMemo(() => {
      if (!product)
        return true;
      if (product.with_checkout === false) {
        return loading;
      } else {
        return loading || state.calculatedPrice === void 0;
      }
    }, [loading, product, state.calculatedPrice]);
    const validationRules = {
      customSize: (selectedOption == null ? void 0 : selectedOption.type) !== "sqft" && state.typeSizeSelection === "default" ? state.customSize.value !== void 0 : true
    };
    useEffect(() => {
      setState((state2) => ({ ...state2, disabled: state2.quantity === 0 }));
    }, [state.quantity]);
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          await dispatch(getProduct({ slug: params.slug })).unwrap();
        } catch (error) {
          toast("Product not found", { type: "error" });
          console.log("Product SHOW", error);
          navigate("/not-found", { replace: true });
        }
      };
      fetchProduct();
      return () => {
        dispatch(clearProductState());
        setState({
          selectedAddons: [],
          selectedOption: void 0,
          typeSizeSelection: "custom",
          highlightErrors: false,
          disabled: false,
          width: {
            error: void 0,
            value: 1,
            showError: false
          },
          height: {
            error: void 0,
            value: 1,
            showError: false
          },
          customSize: {
            error: void 0,
            value: void 0
          },
          unit: "inches",
          price: 100,
          quantity: 1,
          calculatedPrice: void 0
        });
      };
    }, [params]);
    useEffect(() => {
      const selectedAddons = addons.filter((a) => a.isSelected).map((selectedAddon) => {
        let error;
        if (selectedAddon.withQuantity) {
          if (selectedAddon.quantity > selectedAddon.validation["max-qty"]) {
            error = `Max value for addon is - ${selectedAddon.validation["max-qty"]}`;
          } else if (selectedAddon.quantity < selectedAddon.validation["min-qty"]) {
            error = `Min value for addon is - ${selectedAddon.validation["min-qty"]}`;
          } else {
            error = void 0;
          }
        }
        return {
          ...selectedAddon,
          error,
          showError: error ? true : false
        };
      });
      setState((state2) => ({ ...state2, selectedAddons }));
    }, [addons]);
    useEffect(() => {
      setState((state2) => ({ ...state2, selectedOption }));
    }, [selectedOption]);
    useDebounceEffect(() => {
      const fetchPriceViaCalculator = async () => {
        if (!product) {
          return;
        }
        setState((state2) => ({ ...state2, disabled: true }));
        const {
          width,
          height,
          quantity,
          selectedAddons,
          selectedOption: selectedOption2,
          unit
        } = state;
        const { data } = await CartService.calculateSinglePrice(
          product == null ? void 0 : product.id,
          selectedOption2.id,
          selectedAddons,
          unit,
          width.value,
          height.value,
          quantity
        );
        setState((state2) => ({
          ...state2,
          disabled: false,
          calculatedPrice: data.price
        }));
      };
      fetchPriceViaCalculator();
    }, [
      state.width,
      state.height,
      state.selectedOption,
      state.selectedAddons,
      state.quantity,
      state.unit,
      state.customSize
      // product,
    ]);
    const submitAddToCart = async (files) => {
      const isValidForm = Object.values(validationRules).every((key) => key);
      if (!isValidForm) {
        setState((state2) => ({
          ...state2,
          highlightErrors: true,
          disabled: false
        }));
        toast("Please, fill all fields", { type: "error" });
        return;
      }
      setState((state2) => ({
        ...state2,
        disabled: true
      }));
      await dispatch(
        addToCart({
          product_id: product.id,
          option_id: selectedOption.id,
          addons: state.selectedAddons,
          unit: state.unit,
          width: state.width.value,
          height: state.height.value,
          quantity: state.quantity,
          size_id: state.customSize.value,
          files
        })
      ).unwrap();
      toast("Successfully added to cart", { type: "success" });
      setState((state2) => ({
        ...state2,
        disabled: false
      }));
    };
    const handleClose = () => {
      navigate(-1);
    };
    const renderVariants = () => {
    };
    return /* @__PURE__ */ jsxs(ProductFormContext.Provider, { value: { state, setState, validationRules }, children: [
      product ? /* @__PURE__ */ jsxs(Helmet, { children: [
        /* @__PURE__ */ jsx("title", { children: product.seo_title ? product.seo_title : product.title }),
        product.seo_desc ? /* @__PURE__ */ jsx("meta", { name: "description", content: product.seo_desc }) : null,
        product.seo_keywords ? /* @__PURE__ */ jsx("meta", { name: "keywords", content: product.seo_keywords }) : null
      ] }) : /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "Loading Product" }) }),
      /* @__PURE__ */ jsx(
        Component,
        {
          ...{
            product,
            loading: isProductLoading,
            submitAddToCart,
            handleClose,
            renderVariants
          }
        }
      )
    ] });
  };
}
const style$1 = "";
const styleAddons = "";
const grommetsData = {
  multiSelect: false,
  data: [
    {
      id: 1,
      title: "Every 1-2 feet"
    },
    {
      id: 2,
      title: "Every 2-3 feet"
    },
    {
      id: 3,
      title: "Corners only"
    }
  ]
};
const polePocketData = {
  multiSelect: true,
  data: [
    {
      id: 1,
      title: "Top"
    },
    {
      id: 2,
      title: "Bottom"
    },
    {
      id: 3,
      title: "Left"
    },
    {
      id: 4,
      title: "Right"
    }
  ]
};
const ExtraDataSelect = ({ type, addon }) => {
  const dispatch = useAppDispatch();
  const [data, isMultiSelect] = React.useMemo(() => {
    switch (type) {
      case "grommets":
        return [grommetsData.data, grommetsData.multiSelect];
      case "pole_pocket":
        return [polePocketData.data, polePocketData.multiSelect];
      default:
        return [[], false];
    }
  }, [type]);
  if (type === "unset")
    return null;
  const handleChange = (extraData) => {
    dispatch(
      selectExtraDataItems({
        targetExtraData: extraData,
        addonID: addon.id,
        isMultiSelect
      })
    );
  };
  return /* @__PURE__ */ jsx("div", { className: "extra-data-container", children: data.map((extraData) => /* @__PURE__ */ jsxs("label", { className: "extra-data-item", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        onChange: () => handleChange(extraData),
        checked: addon.extra_data_selected.find(
          (selectedData) => selectedData.id === extraData.id
        ) ? true : false
      }
    ),
    /* @__PURE__ */ jsx("span", { style: { marginLeft: 5 }, children: extraData.title })
  ] }, extraData.id)) });
};
const AddonItem = ({ addon, error, disabled }) => {
  const { withQuantity, title, id, condition, isSelected } = addon;
  const dispatch = useAppDispatch();
  const handleOnClick = (e) => {
    let target = e.target;
    if (disabled)
      return;
    if (target.classList.contains("can-toggle")) {
      dispatch(handleAddonChange(addon));
    }
  };
  const handleChangeQuantity = (e) => {
    const { value } = e.target;
    let currentValue = +value;
    if (!currentValue)
      return;
    if (disabled)
      return;
    if (addon.withQuantity) {
      if (currentValue >= addon.validation["max-qty"]) {
        currentValue = addon.validation["max-qty"];
      }
      if (currentValue <= addon.validation["min-qty"]) {
        currentValue = addon.validation["min-qty"];
      }
    }
    dispatch(
      updateAddonQuantity({ addonID: addon.id, quantity: currentValue })
    );
  };
  const handlePressButtonQuantity = (type) => {
    if (!addon.withQuantity)
      return;
    const increasedQuantity = addon.quantity + 1 >= addon.validation["max-qty"] ? addon.validation["max-qty"] : addon.quantity + 1;
    const decreasedQuantity = addon.quantity - 1 <= addon.validation["min-qty"] ? addon.validation["min-qty"] : addon.quantity - 1;
    dispatch(
      updateAddonQuantity({
        addonID: addon.id,
        quantity: type === "+" ? increasedQuantity : decreasedQuantity
      })
    );
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames("product-variant product-addon can-toggle", {
        "active-variant": isSelected,
        "disabled-variant": disabled
      }),
      onClick: handleOnClick,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
      },
      children: [
        /* @__PURE__ */ jsx("h6", { className: "can-toggle", children: title }),
        withQuantity && isSelected ? /* @__PURE__ */ jsxs("div", { className: "can-toggle", children: [
          /* @__PURE__ */ jsxs("div", { className: "quantity-container-addon", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "qty-btn-addon",
                onClick: () => handlePressButtonQuantity("-"),
                children: /* @__PURE__ */ jsx("i", { className: "icon-minus" })
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "qty-input-addon",
                value: addon.quantity,
                min: addon.validation["min-qty"],
                max: addon.validation["max-qty"],
                onChange: handleChangeQuantity
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "qty-btn-addon",
                onClick: () => handlePressButtonQuantity("+"),
                children: /* @__PURE__ */ jsx("i", { className: "icon-plus" })
              }
            )
          ] }),
          error && /* @__PURE__ */ jsx("div", { style: { color: "red", fontSize: 12, marginTop: 5 }, children: error })
        ] }) : null,
        isSelected ? /* @__PURE__ */ jsx(ExtraDataSelect, { addon, type: addon.extra_data_type }) : null
      ]
    }
  );
};
const ProductAddons = ({}) => {
  const { state } = useContext(ProductFormContext);
  const { product, addons } = useAppSelector((state2) => state2.product);
  if (product.with_checkout === false)
    return;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h6", { className: "label-product-show", children: "Addons" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: { marginTop: 8 },
        className: "ps-product__size ps-select--feature",
        children: addons.map((addon) => {
          var _a;
          return /* @__PURE__ */ jsx(
            AddonItem,
            {
              disabled: state.disabled,
              addon,
              error: (_a = state.selectedAddons.find(
                (selectedAddon) => selectedAddon.id === addon.id
              )) == null ? void 0 : _a.error
            },
            `${product.id}-${addon.id}-a`
          );
        })
      }
    )
  ] });
};
function ModalShowProduct({
  submitAddToCart,
  handleClose,
  renderVariants,
  ...props
}) {
  var _a, _b;
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { state, setState } = useContext(ProductFormContext);
  useEffect(() => {
    if (isMobile || !location.state) {
      navigate(`/catalog/product/${params.slug}`, { replace: true });
    }
  }, [isMobile, params, location]);
  if (props.loading === true) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  const { product } = props;
  return /* @__PURE__ */ jsx(Dialog, { open: true, onClose: handleClose, children: /* @__PURE__ */ jsx("div", { className: "headless-bg", children: /* @__PURE__ */ jsx(Dialog.Panel, { className: "headless-popup", children: /* @__PURE__ */ jsx("div", { className: "modal-body headless-content", children: /* @__PURE__ */ jsxs("div", { className: "wrap-modal-slider  ps-quickview__body", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "close ps-quickview__close",
        type: "button",
        onClick: handleClose,
        style: { cursor: "pointer", zIndex: 2 },
        "data-dismiss": "modal",
        "aria-label": "Close",
        children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "×" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-product--detail", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6", children: (product == null ? void 0 : product.images) ? /* @__PURE__ */ jsx(
        ProductSlider,
        {
          images: product.images,
          productName: product.title
        }
      ) : /* @__PURE__ */ jsx("div", { style: { height: 450, marginBottom: 30 }, children: /* @__PURE__ */ jsx(Skeleton, { height: "100%" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6", children: /* @__PURE__ */ jsxs("div", { className: "ps-product__info", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__branch", children: ((_a = product == null ? void 0 : product.categories) == null ? void 0 : _a.map((category) => /* @__PURE__ */ jsx(Link, { to: `/catalog/${category.slug}`, children: category.title }))) || /* @__PURE__ */ jsx(Skeleton, {}) }),
        /* @__PURE__ */ jsx("div", { className: "ps-product__title", children: (product == null ? void 0 : product.title) ? /* @__PURE__ */ jsx("a", { children: product.title }) : /* @__PURE__ */ jsx(Skeleton, { height: 45 }) }),
        /* @__PURE__ */ jsx("div", { className: "ps-product__desc", children: (product == null ? void 0 : product.description) ? /* @__PURE__ */ jsx(
          "p",
          {
            className: "product_modal_desc",
            dangerouslySetInnerHTML: {
              __html: product == null ? void 0 : product.description
            }
          }
        ) : /* @__PURE__ */ jsx(Skeleton, { count: 4 }) }),
        /* @__PURE__ */ jsxs("ul", { className: "ps-product__bundle", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("i", { className: "icon-wallet" }),
            "100% Money back"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("i", { className: "icon-bag2" }),
            "Non-contact shipping"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("i", { className: "icon-truck" }),
            "Free delivery for order over $200"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "no-gutters row", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "ps-product__meta col-md-12",
              style: {
                marginTop: 0,
                borderBottom: "1px solid #f0f2f5"
              },
              children: (product == null ? void 0 : product.with_checkout) ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ProductOptions, {}) }),
                state.selectedOption && state.selectedOption.addons.length > 0 ? /* @__PURE__ */ jsx("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx(ProductAddons, {}) }) : null,
                ((_b = state.selectedOption) == null ? void 0 : _b.showCalculator) ? /* @__PURE__ */ jsx("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx(ProductCalculator, {}) }) : null
              ] }) : /* @__PURE__ */ jsx(ModalContentWithForm, { product })
            }
          ),
          (product == null ? void 0 : product.with_checkout) ? /* @__PURE__ */ jsxs("div", { className: "col-md-12", children: [
            /* @__PURE__ */ jsx("h6", { className: "label-product-show", children: "Quantity:" }),
            /* @__PURE__ */ jsx(
              ProductQuantity,
              {
                value: state.quantity,
                onChange: (value) => setState((state2) => ({
                  ...state2,
                  quantity: value
                }))
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "price-product", children: [
              state.calculatedPrice || "0.00",
              " $"
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "ps-btn ps-btn--warning",
                onClick: () => submitAddToCart(),
                style: { marginTop: 20 },
                disabled: state.disabled,
                children: "Add to cart"
              }
            )
          ] }) : null
        ] })
      ] }) })
    ] }) }) }) })
  ] }) }) }) }) });
}
const ModalShowProduct$1 = withProductControl(ModalShowProduct);
const stripePromise = loadStripe("pk_test_51MRiCzBv37yzeDejaQhcSgIPDkQ5HTlspXHOHHebZqVSUeekwszGGn7fdjGyJJQghIzAq2heXH2dCX0JwTHH7qiC00tAE33eMo");
const Checkout = ({}) => {
  const { cart } = useAppSelector((state2) => state2.cart);
  const [state, setState] = useState({
    clientSecret: void 0,
    tempOrderID: void 0
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!(cart == null ? void 0 : cart.items) || (cart == null ? void 0 : cart.items.length) < 1) {
      navigate("/cart");
    }
  }, [cart]);
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const { data } = await PaymentService.retrivePaymentIntent();
        setState({
          clientSecret: data.client_secret,
          tempOrderID: data.temp_order_id
        });
      } catch (error) {
        toast("Error initing payment...", { type: "error" });
      }
    };
    fetchPaymentIntent();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "Checkout" }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-checkout", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { to: "/cart", children: "Shopping cart" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Checkout" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "ps-checkout__title", children: "Checkout" }),
      /* @__PURE__ */ jsx("div", { className: "ps-checkout__content", children: stripePromise && state.clientSecret ? /* @__PURE__ */ jsx(
        Elements,
        {
          stripe: stripePromise,
          options: {
            clientSecret: state.clientSecret,
            locale: "en",
            fonts: [
              {
                cssSrc: "https://fonts.googleapis.com/css?family=Jost"
              }
            ],
            appearance: {
              theme: "flat",
              variables: {
                colorPrimary: "#103178",
                colorBackground: "#f0f2f5",
                colorText: "#103178",
                fontFamily: '"Jost", sans-serif',
                spacingUnit: "4px",
                borderRadius: "40px"
                // See all possible variables below
              }
            }
          },
          children: /* @__PURE__ */ jsx(PaymentForm, { tempOrderID: state.tempOrderID })
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-12 col-lg-8", children: [
          /* @__PURE__ */ jsx(Skeleton, { height: 40 }),
          /* @__PURE__ */ jsx(Skeleton, { height: 100, count: 2 }),
          /* @__PURE__ */ jsx(Skeleton, { height: 35, count: 6 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-12 col-lg-4", children: [
          /* @__PURE__ */ jsx(Skeleton, { height: 55 }),
          /* @__PURE__ */ jsx(Skeleton, { height: 35, count: 8 })
        ] })
      ] }) })
    ] }) })
  ] });
};
const SuccessPayment = ({}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [state, setState] = React.useState({
    loading: true,
    status: void 0,
    uuid: void 0,
    email: void 0
  });
  React.useEffect(() => {
    const fetchPI = async () => {
      try {
        const { data } = await PaymentService.getPaymentIntent(
          searchParams.get("payment_intent")
        );
        if (data.status === "completed") {
          setState({
            loading: false,
            status: "completed",
            uuid: data.uuid
          });
        } else if (data.status === "in proccess") {
          setState({
            loading: false,
            status: "in proccess",
            uuid: void 0,
            email: data.email
          });
        }
      } catch (error) {
        toast("Something went wrong, contact us to solve the problem", {
          type: "error"
        });
        navigate("/");
      }
    };
    fetchPI();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "Success" }) }),
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "cart-empty text-center title-with-icon-section", children: /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx("div", { className: "ps-cart__icon", style: { marginBottom: 10 }, children: state.loading ? /* @__PURE__ */ jsx(Skeleton, { width: 120, height: 120, borderRadius: 120 }) : /* @__PURE__ */ jsx(
        "i",
        {
          className: classNames({
            "fa fa-check-circle": state.status === "completed",
            "fa fa-clock-o": state.status === "in proccess"
          }),
          style: { color: "#5b6c8f", fontSize: 120 }
        }
      ) }),
      state.loading ? /* @__PURE__ */ jsx(Skeleton, { count: 2 }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: "cart-title",
            style: { color: "#103178", marginTop: 20 },
            children: state.status === "completed" ? "Your order proccesed" : "Your payment in process"
          }
        ),
        state.status === "completed" ? /* @__PURE__ */ jsxs("p", { children: [
          "Order ID:",
          " ",
          /* @__PURE__ */ jsx(
            "strong",
            {
              style: {
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "monospace",
                fontSize: 16
              },
              children: state.uuid
            }
          ),
          ";"
        ] }) : /* @__PURE__ */ jsxs("p", { children: [
          "Your payment is being processed, once the payment is processed we will send you an email to",
          " ",
          /* @__PURE__ */ jsx("strong", { children: state.email })
        ] })
      ] })
    ] }) }) })
  ] });
};
class CatalogService {
  static getCategory(slug) {
    return api.get(`/shop/category/${slug}`);
  }
  static categories() {
    return api.get(`/shop/categories`);
  }
  static products(categorySlug, page = 1) {
    return api.get(
      `/shop/category/${categorySlug}/products?page=${page}`
    );
  }
}
const style = "";
const CatalogProducts = ({
  products,
  loading,
  currentCategory,
  pageCount,
  fetchProducts
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();
  useEffect(() => {
    if (currentCategory) {
      fetchProducts(page, currentCategory);
    }
  }, [page, currentCategory]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "row", style: { marginBottom: 20 }, children: new Array(12).fill("").map(() => /* @__PURE__ */ jsx(
      "div",
      {
        className: "col-6 col-lg-4 col-xl-3 ",
        style: { marginBottom: 10 },
        children: /* @__PURE__ */ jsx(Skeleton, { height: 160 })
      }
    )) });
  }
  const handlePageClick = ({ selected }) => {
    if (selected + 1 == page) {
      return;
    }
    navigate(`?page=${selected + 1}`);
    console.log("why you rendered!", selected + 1, page);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "ps-categogy--grid", children: /* @__PURE__ */ jsx("div", { className: "row m-0", children: products.length > 0 ? products.map((product, idx) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "col-6 col-lg-4 col-xl-3 p-0",
        children: /* @__PURE__ */ jsx(ProductCard, { ...product, fullPage: true, category: currentCategory })
      },
      `${product.id}-${idx}`
    )) : /* @__PURE__ */ jsx(
      EmptyPage,
      {
        iconClass: "fa fa-shopping-basket",
        title: "No Products Here",
        size: "small"
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-pagination", children: /* @__PURE__ */ jsx("ul", { className: "pagination custom-pagenation-products", children: /* @__PURE__ */ jsx(
      ReactPaginate,
      {
        activeClassName: "active",
        breakLabel: "...",
        className: classNames({
          pagination: true,
          hide_on_mob_items: pageCount >= 7
        }),
        nextLabel: /* @__PURE__ */ jsx("i", { className: "fa fa-angle-double-right" }),
        initialPage: +page - 1,
        onPageChange: handlePageClick,
        pageRangeDisplayed: 2,
        pageCount,
        previousLabel: /* @__PURE__ */ jsx("i", { className: "fa fa-angle-double-left" }),
        pageClassName: "page-paginate",
        renderOnZeroPageCount: null
      }
    ) }) })
  ] });
};
const Catalog = ({}) => {
  var _a, _b;
  const params = useParams();
  const [state, setState] = useState({
    productsLoading: true,
    categoriesLoading: true,
    categoriesProductCount: 0,
    currentCategory: void 0,
    pageCount: 0,
    categories: [],
    products: []
  });
  const [collapseCategories, setCollapseCategories] = useState(true);
  const fetchProducts = React.useCallback(
    async (page, currentCategory) => {
      const { data } = await CatalogService.products(
        currentCategory.slug,
        page
      );
      setState((oldState) => ({
        ...oldState,
        products: data.data,
        productsLoading: false,
        pageCount: data.meta.last_page
      }));
    },
    []
  );
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategories = async () => {
      const categoryResponse = await CatalogService.getCategory(
        params.categorySlug
      );
      const categories = await CatalogService.categories();
      setState((oldState) => ({
        ...oldState,
        categoriesLoading: false,
        categoriesProductCount: categoryResponse.data.count_products,
        currentCategory: categoryResponse.data.category,
        categories: categories.data.categories
      }));
    };
    fetchCategories();
    return () => {
      setState({
        productsLoading: true,
        categoriesLoading: true,
        categoriesProductCount: 0,
        currentCategory: void 0,
        categories: [],
        pageCount: 0,
        products: []
      });
    };
  }, [params]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: ((_a = state.currentCategory) == null ? void 0 : _a.title) ? (_b = state.currentCategory) == null ? void 0 : _b.title : "Shop" }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-categogy", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Catalog" }),
        state.currentCategory && /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: state.currentCategory.title })
      ] }),
      !state.categoriesLoading ? /* @__PURE__ */ jsxs("h1", { className: "ps-categogy__name", children: [
        state.currentCategory.title,
        /* @__PURE__ */ jsxs("sup", { children: [
          "(",
          state.categoriesProductCount,
          ")"
        ] })
      ] }) : /* @__PURE__ */ jsx(Skeleton, { height: 50 }),
      /* @__PURE__ */ jsx("div", { className: "ps-categogy__content", children: /* @__PURE__ */ jsxs("div", { className: "row row-reverse", children: [
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-9", children: /* @__PURE__ */ jsx(
          CatalogProducts,
          {
            currentCategory: state.currentCategory,
            products: state.products,
            loading: state.productsLoading,
            fetchProducts,
            pageCount: state.pageCount
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-3", children: !state.categoriesLoading ? /* @__PURE__ */ jsx("div", { className: "ps-widget ps-widget--product", children: /* @__PURE__ */ jsxs("div", { className: "ps-widget__block", children: [
          /* @__PURE__ */ jsx("h4", { className: "ps-widget__title", children: "Categories" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: classNames({
                "ps-block-control": true,
                active: collapseCategories
              }),
              onClick: (e) => {
                e.preventDefault();
                setCollapseCategories((isCollapsed) => !isCollapsed);
              },
              children: /* @__PURE__ */ jsx("i", { className: "fa fa-angle-down" })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "ps-widget__content ps-widget__category",
              style: {
                display: collapseCategories ? "block" : "none"
              },
              children: /* @__PURE__ */ jsx("ul", { className: "menu--mobile", children: state.categories.map((category) => /* @__PURE__ */ jsx(
                "li",
                {
                  className: classNames({
                    active: state.currentCategory.id === category.id
                  }),
                  children: /* @__PURE__ */ jsxs(
                    Link,
                    {
                      to: `/catalog/${category.slug}`,
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      },
                      children: [
                        category.title,
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "category-go-icon",
                            style: {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            },
                            children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-right" })
                          }
                        )
                      ]
                    }
                  )
                },
                `category-${category.slug}`
              )) })
            }
          )
        ] }) }) : /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Skeleton, { height: 25 }),
          /* @__PURE__ */ jsx(Skeleton, { count: 10 })
        ] }) })
      ] }) })
    ] }) })
  ] });
};
const SelectProductFile = forwardRef(
  function SelectProductFile2(props, ref) {
    const [state, setState] = useState({
      files: [],
      showModal: false,
      disabled: true
    });
    useImperativeHandle(ref, () => {
      return {
        showModal() {
          setState({
            showModal: true,
            files: [],
            disabled: true
          });
        },
        closeModal() {
          setState({
            showModal: false,
            files: [],
            disabled: true
          });
        }
      };
    });
    useEffect(() => {
      setState((currentState) => ({
        ...currentState,
        disabled: state.files.length === 0
      }));
    }, [state.files]);
    const onAddCart = async () => {
      setState((currentState) => ({ ...currentState, disabled: true }));
      await props.submitHandler(state.files);
      setState({ files: [], showModal: false, disabled: false });
    };
    return /* @__PURE__ */ jsx(
      Dialog,
      {
        open: state.showModal,
        onClose: () => setState({ files: [], showModal: false, disabled: true }),
        children: /* @__PURE__ */ jsx("div", { className: "headless-bg", children: /* @__PURE__ */ jsx(Dialog.Panel, { className: "headless-popup", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "modal-body headless-content",
            style: { textAlign: "center" },
            children: [
              /* @__PURE__ */ jsx("h3", { style: { color: "#103178", marginBottom: 25 }, children: "Please Specify An Image" }),
              /* @__PURE__ */ jsx(
                Dropzone,
                {
                  onDrop: (files) => setState((currentState) => ({ ...currentState, files }))
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "col-md-6", style: { margin: "auto" }, children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "ps-btn ps-btn--warning",
                  onClick: onAddCart,
                  style: { marginTop: 25 },
                  disabled: state.disabled,
                  children: "Add to cart"
                }
              ) })
            ]
          }
        ) }) })
      }
    );
  }
);
const ProductSkeleton = ({}) => {
  return /* @__PURE__ */ jsx("div", { className: "ps-page--product-variable", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("div", { className: "ps-breadcrumb", children: /* @__PURE__ */ jsx(Skeleton, {}) }),
    /* @__PURE__ */ jsx("div", { className: "ps-page__content", style: { marginBottom: "20px" }, children: /* @__PURE__ */ jsx("div", { className: "ps-product--detail", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6", children: /* @__PURE__ */ jsx("div", { style: { height: 650, marginBottom: 30 }, children: /* @__PURE__ */ jsx(Skeleton, { height: "100%" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6", children: /* @__PURE__ */ jsxs("div", { className: "ps-product__info", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__branch", children: /* @__PURE__ */ jsx(Skeleton, {}) }),
        /* @__PURE__ */ jsx("div", { className: "ps-product__title", children: /* @__PURE__ */ jsx(Skeleton, { height: 45 }) }),
        /* @__PURE__ */ jsx("div", { className: "ps-product__desc", children: /* @__PURE__ */ jsx(Skeleton, { count: 5 }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Skeleton, { count: 3 }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "ps-product__meta",
            style: {
              marginTop: 0,
              borderBottom: "1px solid #f0f2f5"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { style: { marginTop: 20 }, children: [
                /* @__PURE__ */ jsx(Skeleton, { height: 45 }),
                /* @__PURE__ */ jsx(Skeleton, { height: 45 })
              ] }),
              /* @__PURE__ */ jsx("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx(Skeleton, { height: 140 }) })
            ]
          }
        ) })
      ] }) })
    ] }) }) }) }) })
  ] }) });
};
const ProductShow = ({ submitAddToCart, ...props }) => {
  var _a, _b, _c;
  const location = useLocation();
  const { state, setState } = useContext(ProductFormContext);
  const dragAndDropRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      unlock(document.body);
    };
  }, []);
  useEffect(() => {
    const target = document.body;
    if (props.loading) {
      lock(target);
    } else {
      unlock(target);
    }
  }, [props.loading]);
  const handleAddToCart = () => {
    if (state.selectedOption.need_file) {
      dragAndDropRef.current.showModal();
    } else {
      submitAddToCart();
    }
  };
  if (props.loading === true) {
    return /* @__PURE__ */ jsx(ProductSkeleton, {});
  }
  return /* @__PURE__ */ jsx("div", { className: "ps-page--product-variable", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
      /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx("span", { children: "Shop" }) }),
      ((_a = location.state) == null ? void 0 : _a.category) ? /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { to: `/catalog/${location.state.category.slug}`, children: location.state.category.title }) }) : props.product.categories.length > 0 && /* @__PURE__ */ jsx(
        "li",
        {
          className: "ps-breadcrumb__item",
          children: /* @__PURE__ */ jsx(Link, { to: `/catalog/${props.product.categories[0].slug}`, children: props.product.categories[0].title })
        },
        `breadcumbs-${props.product.categories[0].slug}`
      ),
      /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx("span", { children: props.product.title }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ps-page__content", style: { marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "ps-product--detail", children: [
        /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6", children: /* @__PURE__ */ jsx(
            ProductSlider,
            {
              images: props.product.images,
              productName: props.product.title
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6", children: /* @__PURE__ */ jsxs("div", { className: "ps-product__info", children: [
            /* @__PURE__ */ jsx("div", { className: "ps-product__branch", children: (_b = props.product.categories) == null ? void 0 : _b.map((category) => /* @__PURE__ */ jsx(
              Link,
              {
                to: `/catalog/${category.slug}`,
                children: category.title
              },
              `cat-${category.slug}`
            )) }),
            /* @__PURE__ */ jsx("div", { className: "ps-product__title", children: /* @__PURE__ */ jsx("a", { children: props.product.title }) }),
            /* @__PURE__ */ jsx("div", { className: "ps-product__desc", children: /* @__PURE__ */ jsx(
              "p",
              {
                className: "product_modal_desc",
                dangerouslySetInnerHTML: {
                  __html: props.product.description
                }
              }
            ) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "ps-product__bundle", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "icon-wallet" }),
                "100% Money back"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "icon-bag2" }),
                "Non-contact shipping"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "icon-truck" }),
                "Free delivery for order over $200"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "ps-product__meta",
                  style: {
                    marginTop: 0,
                    borderBottom: "1px solid #f0f2f5"
                  },
                  children: props.product.with_checkout ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ProductOptions, {}) }),
                    state.selectedOption && state.selectedOption.addons.length > 0 ? /* @__PURE__ */ jsx("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx(ProductAddons, {}) }) : null,
                    ((_c = state.selectedOption) == null ? void 0 : _c.showCalculator) ? /* @__PURE__ */ jsx("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx(ProductCalculator, {}) }) : null
                  ] }) : /* @__PURE__ */ jsx(ModalContentWithForm, { product: props.product })
                }
              ),
              props.product.with_checkout ? /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h6", { className: "label-product-show", children: "Quantity:" }),
                /* @__PURE__ */ jsx(
                  ProductQuantity,
                  {
                    value: state.quantity,
                    onChange: (value) => setState((state2) => ({
                      ...state2,
                      quantity: value
                    }))
                  }
                ),
                /* @__PURE__ */ jsxs("span", { className: "ps-product__price", children: [
                  state.calculatedPrice || "0.00",
                  " $"
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    className: "ps-btn ps-btn--warning",
                    onClick: handleAddToCart,
                    style: { marginTop: 20 },
                    disabled: state.disabled,
                    children: "Add to cart"
                  }
                )
              ] }) : null
            ] })
          ] }) })
        ] }) }) }),
        props.product.faq && /* @__PURE__ */ jsxs("div", { className: "ps-product__content mt-50", children: [
          /* @__PURE__ */ jsx("h2", { className: "ps-title", children: "F.A.Q" }),
          /* @__PURE__ */ jsx(FAQProduct, { questions: props.product.faq })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        SelectProductFile,
        {
          ref: dragAndDropRef,
          submitHandler: (files) => submitAddToCart(files)
        }
      )
    ] })
  ] }) });
};
const ProductShow$1 = withProductControl(ProductShow);
const NotFound = ({}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("title", { children: "Page not found." }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-page--notfound pt-100 pb-100", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "ps-page__content", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsxs("div", { className: "col-12 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "ps-page__name", children: "404" }),
      /* @__PURE__ */ jsx("h5", { children: "Whoopsy, this page not found..." }),
      /* @__PURE__ */ jsx("p", { children: "Please back to homepage or check our offer" }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "ps-btn ps-btn--primary", to: "/", children: "Back to homepage" }) })
    ] }) }) }) }) })
  ] });
};
function Routing() {
  const location = useLocation();
  location.state;
  useNavigate();
  const background = location.state && location.state.background;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Routes, { location: background || location, children: /* @__PURE__ */ jsxs(Route, { path: "/", element: /* @__PURE__ */ jsx(Layout, {}), children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "home/*", element: /* @__PURE__ */ jsx(Home, {}), children: /* @__PURE__ */ jsx(Route, { path: "product/modal/:slug", element: /* @__PURE__ */ jsx(ModalShowProduct$1, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "login", element: /* @__PURE__ */ jsx(Login, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "register", element: /* @__PURE__ */ jsx(Register, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "cart", element: /* @__PURE__ */ jsx(Cart, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/cart/checkout", element: /* @__PURE__ */ jsx(Checkout, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/catalog/:categorySlug", element: /* @__PURE__ */ jsx(Catalog, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "catalog/product/:slug", element: /* @__PURE__ */ jsx(ProductShow$1, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/cart/checkout/success-payment",
          element: /* @__PURE__ */ jsx(SuccessPayment, {})
        }
      ),
      /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(ProtectedRoute, { allowAuthed: true }), children: [
        /* @__PURE__ */ jsx(Route, { path: "profile", element: /* @__PURE__ */ jsx(Profile, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "profile/edit", element: /* @__PURE__ */ jsx(EditProfile, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "profile/orders", element: /* @__PURE__ */ jsx(Home, {}) })
      ] }),
      /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(ProtectedRoute, { allowAuthed: false }), children: [
        /* @__PURE__ */ jsx(Route, { path: "forgot-password", element: /* @__PURE__ */ jsx(ForgotPassword, {}) }),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "auth/reset-password/:token",
            element: /* @__PURE__ */ jsx(ResetPassword, {})
          }
        )
      ] })
    ] }) }),
    background && /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsx(
      Route,
      {
        path: "home/product/modal/:slug",
        element: /* @__PURE__ */ jsx(ModalShowProduct$1, {})
      }
    ) })
  ] });
}
const ResetPasswordSchema = yup.object({
  oldPassword: yup.string().required(),
  newPassword: yup.string().required().min(7),
  passwordConfirmation: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match")
});
const UpdatePasswordForm = ({}) => {
  var _a, _b, _c;
  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema)
  });
  const onSubmit = async (data) => {
    try {
      await UserService.editPassword(data);
      toast("Password has been successfully changed!", { type: "success" });
    } catch (error) {
      setIsSubmiting(false);
      const err = axiosErrorGrab(error);
      if (!isCustomAxisError(err)) {
        return;
      }
      if (err.type === "message") {
        toast(err.error, { type: "error" });
      }
      if (err.type === "validation") {
        let errors2 = err.errors;
        Object.keys(errors2).forEach((errInput) => {
          errors2[errInput].forEach((errMessage) => {
            toast(errMessage, { type: "error" });
          });
        });
      }
    }
  };
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", children: [
    /* @__PURE__ */ jsx("h2", { className: "ps-form__title", children: "Update Password" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("oldPassword"),
        error: (_a = errors.oldPassword) == null ? void 0 : _a.message,
        type: "password",
        disabled: isSubmiting,
        placeholder: "Current Password",
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("newPassword"),
        error: (_b = errors.newPassword) == null ? void 0 : _b.message,
        type: "password",
        disabled: isSubmiting,
        placeholder: "New Password",
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("passwordConfirmation"),
        error: (_c = errors.passwordConfirmation) == null ? void 0 : _c.message,
        type: "password",
        placeholder: "Confirm Password",
        disabled: isSubmiting,
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-form__submit", children: /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", children: "Update" }) })
  ] }) });
};
const EditSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  avatar: yup.mixed().nullable(),
  preview: yup.string().nullable()
});
const UpdatePersonalInformationForm = ({}) => {
  var _a, _b;
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(EditSchema),
    defaultValues: {
      name: user == null ? void 0 : user.name,
      email: user == null ? void 0 : user.email,
      avatar: void 0,
      preview: user && user.avatar ? `/storage/${user.avatar}` : "/default-profile.png"
    }
  });
  const onSubmit = async (data) => {
    setIsSubmiting(true);
    try {
      const { data: editedUser } = await UserService.editProfile(data);
      dispatch(updateUser(editedUser));
      setIsSubmiting(false);
      toast("Profile updated!", { type: "success" });
      reset({
        name: editedUser.name,
        email: editedUser.email,
        avatar: null,
        preview: editedUser.avatar ? `/storage/${editedUser.avatar}` : "/default-profile.png"
      });
    } catch (error) {
      setIsSubmiting(false);
      const err = axiosErrorGrab(error);
      if (!isCustomAxisError(err)) {
        return;
      }
      console.log(err);
      if (err.type === "message") {
        toast(err.error, { type: "error" });
      }
      if (err.type === "validation") {
        let errors2 = err.errors;
        Object.keys(errors2).forEach((errInput) => {
          errors2[errInput].forEach((errMessage) => {
            toast(errMessage, { type: "error" });
          });
        });
      }
    }
  };
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", children: [
    /* @__PURE__ */ jsx("h2", { className: "ps-form__title", children: "Personal Information" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "ps-form__group",
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: watch("preview"),
              style: { width: 120, height: 120, borderRadius: 120 }
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              onChange: (e) => {
                if (e.target.files) {
                  console.log(URL.createObjectURL(e.target.files[0]));
                  setValue("preview", URL.createObjectURL(e.target.files[0]));
                  setValue("avatar", e.target.files[0]);
                }
              },
              type: "file",
              id: "upload",
              hidden: true,
              style: { display: "none" }
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "upload", style: { cursor: "pointer", marginTop: 10 }, children: "Choose file" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("name"),
        type: "text",
        error: (_a = errors.name) == null ? void 0 : _a.message,
        disabled: isSubmiting,
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        ...register("email"),
        type: "email",
        error: (_b = errors.email) == null ? void 0 : _b.message,
        disabled: isSubmiting,
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-form__submit", children: /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", children: "Update" }) })
  ] }) });
};
const ReactToastify = "";
const initialState = {
  homeCategories: []
};
const getCategoriesWithProducts = createAsyncThunk("app/homeCategories", async function(_, { rejectWithValue }) {
  try {
    const { data } = await CategoryService.getCategoriesWithProducts();
    return data.categories;
  } catch (error) {
    return rejectWithValue("Failed to get cart");
  }
});
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesWithProducts.fulfilled, (state, action) => {
      state.homeCategories = action.payload;
    });
  }
});
const appSliceReducer = appSlice.reducer;
const skeleton = "";
function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(getUserByToken()).unwrap();
      } catch (error) {
        console.log(error);
      }
      await dispatch(getCategoriesWithProducts()).unwrap();
      await dispatch(initCart()).unwrap();
      setAppLoaded(true);
    };
    initApp();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(BrowserRouter, { children: appLoaded ? /* @__PURE__ */ jsx(Routing, {}) : null }),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
}
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    app: appSliceReducer,
    product: singleProductSliceReducer
  }
});
function render() {
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(App, {}) }) })
  );
  return { html };
}
export {
  render as default
};
