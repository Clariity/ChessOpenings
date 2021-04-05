export default function Badge({ title, status }) {
  return <div className={`badge-component ${status}`}>{title}</div>;
}
