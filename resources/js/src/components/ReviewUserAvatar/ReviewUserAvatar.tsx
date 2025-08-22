import defaultProfileAvatar from "@/assets/images/default-profile.png";

import classes from "./ReviewUserAvatar.module.scss";

interface Props {
  alt: string;
  src?: string;
  className?: string | CSSModuleClasses;
}

export default function ReviewUserAvatar({ src, alt }: Props) {
  const avatar = src ? `/storage/${src}` : defaultProfileAvatar;

  return <img className={classes.reviewUserAvatar} src={avatar} alt={alt} />;
}
