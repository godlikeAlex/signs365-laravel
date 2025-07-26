import GoogleSVG from "@/assets/icons/google.svg?react";
import classes from "./SocialiteButton.module.scss";

type Props = {
  provider: "google";
  onClick: () => void;
};

const buttons = {
  google: {
    text: "Continue with Google",
    Icon: GoogleSVG,
  },
};

export default function SocialiteButton({ provider, onClick }: Props) {
  const buttonAppearance = buttons[provider];

  return (
    <button className={classes.socialiteButton} onClick={onClick}>
      <buttonAppearance.Icon width={25} height={25} />
      {buttonAppearance.text}
    </button>
  );
}
