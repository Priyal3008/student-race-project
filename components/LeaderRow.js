import Avatar from "./Avatar";
import { shortName } from "../lib/store";

export default function LeaderRow({ student, isMe = false }) {
  const r = student.rank;
  const tone = isMe ? "me" : r === 1 ? "gold" : r === 2 ? "silver" : r === 3 ? "bronze" : "plain";
  return (
    <div className={"lrow " + tone}>
      <div className="lrank">{isMe ? <span className="here">U&apos;R<br />HERE</span> : r}</div>
      <Avatar id={student.id} size={44} />
      <div className="linfo">
        <div className="lname">{shortName(student.name)}</div>
        <div className="lpts">{student.points.toLocaleString("en-IN")}</div>
        <div className="lsub">
          {student.college} · {student.referrals} referral{student.referrals === 1 ? "" : "s"}
        </div>
      </div>
    </div>
  );
}
