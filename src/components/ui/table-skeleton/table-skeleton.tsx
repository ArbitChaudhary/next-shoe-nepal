import "./table-skeleton.css";

function TableSkeleton() {
  return (
    <div>
      <table className="tg">
        <tr>
          {Array.from({ length: 9 }).map((_, i) => (
            <th className="tg-cly1" key={i}>
              <div className="line"></div>
            </th>
          ))}
        </tr>
        {Array.from({ length: 4 }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: 9 }).map((_, i) => (
              <td className="tg-cly1" key={`cell-${r}-${i}`}>
                <div className="line"></div>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default TableSkeleton;
