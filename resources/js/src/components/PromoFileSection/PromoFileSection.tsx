import Button from "../Button";

import classes from "./PromoFileSection.module.css";

import promoImage from "./promo-image.webp";

export default function PromoFileSection() {
  return (
    <section className={classes.section}>
      <div className="container">
        <div className="row">
          <div
            className="col-md-8 mb-4"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2>Free Checklist for Your Project</h2>
            <p>
              Prepare your files, printing, and installation the right way.
              Download our free one-page checklist to avoid delays, reprints,
              and installation issues.
            </p>
            <div>
              <Button component="a" href={"/signs7-checklist.pdf"} download>
                Download Checklist
              </Button>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <img src={promoImage} style={{ width: "80%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
