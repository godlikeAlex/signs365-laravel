import classNames from "classnames";
import React from "react";

interface MiniAuthModalProps {
  active: boolean;
}

const MiniAuthModal: React.FC<MiniAuthModalProps> = ({
  active,
}: MiniAuthModalProps) => {
  return (
    <div
      className={classNames("ps-login--modal", {
        active,
      })}
    >
      <form method="get" action="https://nouthemes.net/html/mymedi/do_action">
        <div className="form-group">
          <label>Username or Email Address</label>
          <input className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" type="password" />
        </div>
        <div className="form-group form-check">
          <input className="form-check-input" type="checkbox" />
          <label>Remember Me</label>
        </div>
        <button className="ps-btn ps-btn--warning" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default MiniAuthModal;
