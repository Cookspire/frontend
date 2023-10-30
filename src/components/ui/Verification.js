import "../styles/Verification.css";

export default function Verification() {
  return (
    <div className="verify-content">
      <div className="heading">Verify your account</div>

      <div className="explanation">
        Various factors are considered when evaluating accounts to determine
        whether they're in the public interest and meet verification criteria.
        Even if your account is eligible, submitting a request doesn't guarantee
        verification. After your request has been reviewed, you get a
        notification that lets you know whether your account has been verified.
        If your request is denied, you can submit a new request after 30 days.
      </div>

      <div className="action">
        <button>Submit for Verification</button>
      </div>
    </div>
  );
}