import { ReactNode, useEffect, useRef, useState } from "react";

import classes from "./ExpandableContent.module.scss";
import Button from "../Button";
import classNames from "classnames";

interface Props {
  children: ReactNode;
}

const MAX_HEIGHT_CONTENT = 250;

export default function ExpandableContent({ children }: Props) {
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    if (contentContainerRef.current) {
      const { scrollHeight } = contentContainerRef.current;

      setCanExpand(scrollHeight > MAX_HEIGHT_CONTENT * 2);
    }
  }, []);

  return (
    <div
      className={classNames(classes.expandable, {
        [classes.expandableOpen]: isExpanded || !canExpand,
      })}
    >
      <div
        ref={contentContainerRef}
        style={{
          maxHeight: isExpanded || !canExpand ? undefined : MAX_HEIGHT_CONTENT,
          overflow: "hidden",
        }}
      >
        {children}
      </div>

      {canExpand && (
        <Button
          className={classNames(classes.showMoreButton, {
            [classes.showMoreButtonRelative]: isExpanded,
          })}
          variant="primary"
          color="primary-600"
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  );
}
