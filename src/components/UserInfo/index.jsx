import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={
          avatarUrl ||
          "https://sun9-65.userapi.com/s/v1/ig2/qICeUTuyvi9kresqOO8oOEGi43Hb-8UFrChKTcu4ZA9U-MhKP_poldX9ntmF8jPRG14oFi2aqyeJuoa6pxdjVHRU.jpg?size=200x200&quality=95&crop=51,0,880,880&ava=1"
        }
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
