import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { SEOHead } from "@/src/components";
import classes from "./EstimateCart.module.scss";
import EstimateCartService from "./Product/components/EstimateForm/EstimateCart.service";

type ReceiptRow = {
  form_id: number;
  field_id: number;
  option_id?: number | null;
  label: string;
  value?: string | null;
  links?: Array<{
    label: string;
    url: string;
    name?: string | null;
  }>;
};

type EstimateCartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  line_total: number;
  attributes: {
    payload?: {
      unit?: string;
      width?: number;
      height?: number;
      service_titles?: Record<string, string>;
      receipt_rows?: ReceiptRow[];
    };
  };
};

type EstimateCartPayload = {
  items: EstimateCartItem[];
  subtotal: number;
  total: number;
  amount_in_cents: number;
};

type PageProps = {
  estimate_cart: EstimateCartPayload;
};

const EstimateCart = () => {
  const { estimate_cart } = usePage<PageProps>().props;
  const [removingItemID, setRemovingItemID] = React.useState<string | null>(
    null
  );
  const hasItems = estimate_cart.items.length > 0;

  const handleRemoveItem = async (itemID: string) => {
    try {
      setRemovingItemID(itemID);
      await EstimateCartService.removeItem({
        item_id: itemID,
      });
      router.reload({
        only: ["estimate_cart"],
        preserveScroll: true,
      });
    } finally {
      setRemovingItemID(null);
    }
  };

  const renderItemReceipt = (item: EstimateCartItem) => {
    const payload = item.attributes?.payload ?? {};
    const serviceTitles = Object.values(payload.service_titles ?? {});
    const rows = payload.receipt_rows ?? [];
    const sizeValue =
      payload.width && payload.height
        ? `${payload.width} x ${payload.height} ${payload.unit ?? ""}`
        : null;

    return (
      <div key={item.id} className={classes.receipt}>
        <div className={classes.receiptHeader}>
          <h4 className={classes.receiptTitle}>{item.name}</h4>
          <div className={classes.headerActions}>
            <span className={classes.qty}>Qty: {item.quantity}</span>
            <button
              type="button"
              className={classes.removeButton}
              onClick={() => handleRemoveItem(item.id)}
              disabled={removingItemID === item.id}
            >
              Remove
            </button>
          </div>
        </div>

        <div className={classes.rows}>
          {serviceTitles.length > 0 ? (
            <div className={classes.row}>
              <span className={classes.rowLabel}>Service Type</span>
              <span className={classes.rowValue}>
                {serviceTitles.join(", ")}
              </span>
            </div>
          ) : null}

          {sizeValue ? (
            <div className={classes.row}>
              <span className={classes.rowLabel}>Size</span>
              <span className={classes.rowValue}>{sizeValue}</span>
            </div>
          ) : null}

          {rows.map((row, index) => (
            <div
              className={classes.row}
              key={`${item.id}-${row.field_id}-${index}`}
            >
              <span className={classes.rowLabel}>{row.label}</span>
              <span className={classes.rowValue}>
                {row.links && row.links.length > 0 ? (
                  <span className={classes.rowLinks}>
                    {row.value ? (
                      <span className={classes.rowValueText}>{row.value}</span>
                    ) : null}
                    {row.links.map((link, linkIndex) => (
                      <a
                        key={`${item.id}-${row.field_id}-${index}-${linkIndex}`}
                        className={classes.rowLink}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        title={link.name || link.label}
                      >
                        {row.links && row.links.length > 1
                          ? `${link.label} ${linkIndex + 1}`
                          : link.label}
                      </a>
                    ))}
                  </span>
                ) : (
                  row.value || "—"
                )}
              </span>
            </div>
          ))}
        </div>

        <div className={classes.lineTotal}>
          <span>Estimated Price</span>
          <span>${item.line_total.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Estimate Cart</title>
      </Head>
      <SEOHead title="Estimate Cart" />

      <div className="ps-shopping">
        <div className="container">
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link href="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item active" aria-current="page">
              Estimate cart
            </li>
          </ul>

          <h3 className="ps-shopping__title">
            Estimate cart<sup>({estimate_cart.items.length})</sup>
          </h3>

          {!hasItems ? (
            <div className={classes.empty}>
              <h3>Your estimate cart is empty</h3>
              <Link href="/" className="button" style={{ marginTop: 10 }}>
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className={classes.content}>
              <div className={classes.left}>
                {estimate_cart.items.map((item) => renderItemReceipt(item))}
              </div>

              <aside className={classes.sidebar}>
                <h4 className={classes.sidebarTitle}>Estimate Summary</h4>

                <div className={classes.sideRow}>
                  <span>Subtotal</span>
                  <strong>${estimate_cart.subtotal.toLocaleString()}</strong>
                </div>
                <div className={classes.sideRow}>
                  <span>Total</span>
                  <strong>${estimate_cart.total.toLocaleString()}</strong>
                </div>

                <p className={classes.disclaimer}>
                  We will review your request and contact you to confirm pricing
                  and project details.
                </p>

                <button
                  type="button"
                  className="button"
                  style={{ width: "100%" }}
                >
                  Send Estimate Request
                </button>

                <Link className="ps-shopping__link" href="/">
                  Continue To Shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EstimateCart;
