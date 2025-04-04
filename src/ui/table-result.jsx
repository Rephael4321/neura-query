export default function TableResult({ titles, rows }) {
  return (
    <table className="border-collapse border border-gray-400 w-full text-center">
      <thead>
        <tr className="bg-gray-200">
          {titles.map((title, titleIndex) => (
            <th key={titleIndex} className="border border-gray-400 px-4 py-2">
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-gray-400 px-4 py-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
