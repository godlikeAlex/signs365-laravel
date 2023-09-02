import Collapse, { Panel } from "rc-collapse";
import React from "react";
import motion from "../OrderCard/motionUtil";
import "../OrderCard/index.less";
import { expandIcon } from "../OrderCard/OrderCard";
import "./style.css";

interface Props {
  questions: {
    question: string;
    answer: string;
  }[];
}

const FAQProduct: React.FC<Props> = ({ questions }: Props) => {
  return (
    <Collapse accordion={true} openMotion={motion}>
      {questions.map(({ question, answer }, index) => (
        <Panel
          header={question}
          key={index}
          expandIcon={expandIcon}
          className="faq-product"
        >
          <div dangerouslySetInnerHTML={{ __html: answer }} />
        </Panel>
      ))}
    </Collapse>
  );
};

export default FAQProduct;
