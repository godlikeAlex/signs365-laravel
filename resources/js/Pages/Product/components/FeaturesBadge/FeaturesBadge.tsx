import classes from "./FeaturesBadge.module.scss";

import ConsultationIcon from "@/Pages/Product/assets/consultation.svg?react";
import ProposalIcon from "@/Pages/Product/assets/proposal.svg?react";
import ExecutionIcon from "@/Pages/Product/assets/execution.svg?react";

export default function FeaturesBadge() {
  return (
    <ul className={classes.featuresBadge}>
      <li className={classes.featuresBadgeItem}>
        <ConsultationIcon width={32} />
        Initial Consultation
      </li>

      <li className={classes.featuresBadgeItem}>
        <ProposalIcon width={22} />
        Detailed Proposal
      </li>

      <li className={classes.featuresBadgeItem}>
        <ExecutionIcon width={25} />
        Project Execution
      </li>
    </ul>
  );
}
