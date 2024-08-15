import { SEOHead } from "@/src/components";
import { Link } from "@inertiajs/react";
import React from "react";

interface Props {
  title: string;
}

const Terms: React.FC<Props> = ({ title }: Props) => {
  return (
    <>
      <SEOHead title={title} />
      <div className="ps-about">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="ps-breadcrumb">
                <li className="ps-breadcrumb__item">
                  <Link href="/">Home</Link>
                </li>
                <li className="ps-breadcrumb__item active" aria-current="page">
                  Terms and Conditions
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginBottom: "55px" }}>
          <div className="row">
            <div
              className="col-md-12 text-center"
              style={{ marginBottom: "55px" }}
            >
              <h1 style={{ color: "#103178" }}>Terms and Conditions</h1>
            </div>
            <div className="col-md-12">
              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                Terms of Usage
              </p>

              <p>
                These Terms of Usage govern your access and use of this Site. By
                accessing or using this Site you agree to be bound by these
                Terms of Usage and to any additional guidelines, restrictions,
                or rules that may be posted in connection with specific sections
                or services of this Site. All such additional posted guidelines,
                restrictions, or rules are hereby incorporated by reference into
                these Terms of Use.
              </p>

              <p>
                Signs7 and other sister companies, reserves the right to make
                changes to this Site and to these Terms of Usage at any time
                without prior notice. You should review these Terms of Usage
                each time you access this Site.
              </p>

              <p>
                You also agree that we may provide all legal communications and
                notices to you electronically by posting them on our website or,
                at our election, by sending an e-mail to the e-mail address you
                provided to us when you registered at our website. You may
                withdraw your consent to receive communications from us
                electronically by contacting customer care. However, if you
                withdraw your consent to receive our communications
                electronically, you must discontinue your use of your account.
              </p>

              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                General
              </p>

              <p>
                All the terms and conditions and/or any transactions occurring
                online at www.signs7.com or by phone are subject to the laws of
                the State of New York. Signs7 and other sister companies are not
                responsible for the delay and/or damages resulting from
                Machinery Breakdown, Acts of God, and from other actions, both
                governmental and otherwise, including but not limited to war,
                riot, seizure, and embargo. The tools available on
                www.signs7.com to create documents are the property of New York
                Printing Solutions, Inc. and its affiliated companies. The
                Buyer’s order shall be deemed an acceptance of the Seller's
                terms. The Terms and conditions shall in all respects be
                governed by THE STATE OF NEW YORK law.{" "}
              </p>

              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                Reservations
              </p>

              <p>
                All orders are subject to acceptance by Signs7 and other sister
                companies. We reserve the right to reject any order at any time
                without recourse. We also reserve the right to change the price
                at any time even after we receive the order. For additional
                service on the location - we will charge you as a new project
                and the amount will be agreed upon payment. All rental equipment
                needs to be paid in full prior to installation date, a receipt
                of services will be provided. Minimum Visit Charge - $295.
                Waiting time - fee $125 per hour
              </p>

              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                Returns
              </p>

              <p>
                Due to the nature of the product, no returns can be made once
                the order is processed and/or shipped. Any claims for defects,
                damages, or shortages must be made in writing within two (2)
                business days after receipt of the merchandise. We will replace
                only those orders that were processed incorrectly. The
                replacement of the order will take place only after the receipt
                of returned merchandise. We will not replace the order if it is
                determined by us that the order was misused or mishandled by the
                buyer or part of the order was used by the buyer and part of the
                order is being returned.{" "}
              </p>

              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                Credit Card
              </p>

              <p>
                If the Buyer's credit card is declined, Signs7 and other sister
                companies will not process the Buyer’s order. If the order is
                shipped and should the Buyer's account become delinquent, Buyer
                agrees to pay a monthly finance charge of 2% (annual percentage
                rate of 24%) on the unpaid balance. If an account goes beyond
                the payment term's due date, unless specific arrangements are
                made, future purchases will require advance payment. In the
                event that Signs7 and other sister companies must commence legal
                action to enforce any terms of this agreement, the Buyer agrees
                to pay reasonable legal fees and costs.
              </p>

              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                Payment
              </p>
              <p>
                Signs7 and other sister companies accept Visa and MasterCard
                credit and debit card payments, Apple Pay, Google Pay, Check,
                Chash, Bank Transfer and Zelle Transfer.
              </p>

              <p>
                If the Buyer's credit card is declined, Signs7 and other sister
                companies will not process the Buyer’s order. If the order is
                shipped and should the Buyer's account become delinquent, Buyer
                agrees to pay a monthly finance charge of 2% (annual percentage
                rate of 24%) on the unpaid balance. If an account goes beyond
                the payment term's due date, unless specific arrangements are
                made, future purchases will require advance payment. In the
                event that Signs7 and other sister companies must commence legal
                action to enforce any terms of this agreement, the Buyer agrees
                to pay reasonable legal fees and costs.
              </p>

              <p>
                For B2B customers total payment due in 30 days - late fee of 2%
                per day for overdue payment. For all other clients payment must
                be made in full before service or product has been produced. By
                paying an invoice, the client must include the invoice number on
                your check or detail section.
              </p>

              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                Warranty
              </p>

              <p>
                Signs7 and other sister companies neither make any explicit
                warranty nor imply or accept any responsibility other than
                possible replacement of the products and services that Buyer is
                buying. Signs7 and other sister companies may but does not
                guarantee the replacement of the defective product, or credit
                the amount of the purchase price.
              </p>

              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                Shipping
              </p>
              <p>
                Signs7 and other sister companies will arrange for shipping with
                a carrier on behalf of the buyer. The Buyer will be fully
                responsible for the shipping and handling cost. Signs7 and other
                sister companies will not be responsible for the delay in
                delivery, loss or damage of the order while the order is with
                the shipping carrier.
              </p>
              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                Limitation of Liability
              </p>
              <p>
                Signs7 and other sister companies will not be liable in contract
                or in tort (including negligence) to the customer for incidental
                or consequential damages, arising out of or resulting from
                anybody’s performance or nonperformance of our obligations.
                Signs7 and other sister companies shall not be liable to anyone
                for any kind of financial losses, cost, expenses, damages and/or
                other economic damages. The Buyer agrees that the Buyer will not
                hold Signs7 and other sister companies responsible for any and
                all loss, cost, expense, and damages (including legal costs) on
                account of any and all manner of claims, demands, actions, and
                proceedings that may be instituted against Signs7 and other
                sister companies. and its affiliated company (S) on grounds
                alleging that the said work violates any copyrights, trademarks,
                service marks, or is scandalous, or invades any person's right
                to privacy or other personal rights.
              </p>

              <p
                style={{ fontWeight: 700, color: "#103178", fontSize: "20px" }}
              >
                Cancellations and Refunds
              </p>

              <p>
                Signs7 and other sister companies and its affiliated company
                will not refund any money for the orders that were shipped or
                were canceled after the service date or order was being
                processed. Cancellation less than 24 hours before service - fee
                $295 or 10% of project price. Cancellation notice needs to be
                given no less than (48 hrs.) before install date to receive a
                refund for rental equipment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
