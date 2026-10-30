export default function Stat({ total, completed, pending }) {
  return (
    <footer className="grid grid-cols-3 gap-4 mb-2">
      <div className="rounded-xl border p-4 text-center bg-blue-400">
        <span>Total</span>
        <br />
        <span>{total}</span>
      </div>

      <div className="rounded-xl border p-4 text-center bg-green-400">
        <span>Completed</span>
        <br />
        <span>{completed}</span>
      </div>

      <div className="rounded-xl border p-4 text-center bg-amber-400">
        <span>Pending</span>
        <br />
        <span>{pending}</span>
      </div>
    </footer>
  );
}
