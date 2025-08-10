"use client";
export function ResultCard({ result }: { result: any }) {
  if (!result) return <p className="text-gray-500">Run an estimate to see results.</p>;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="card p-4 text-center">
          <p className="text-sm text-gray-600">Good</p>
          <p className="text-2xl font-semibold">${(result?.priceBands?.good || 0).toLocaleString()}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-sm text-gray-600">Better</p>
          <p className="text-2xl font-semibold">${(result?.priceBands?.better || 0).toLocaleString()}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-sm text-gray-600">Best</p>
          <p className="text-2xl font-semibold">${(result?.priceBands?.best || 0).toLocaleString()}</p>
        </div>
      </div>
      <div className="card p-4">
        <p className="text-sm text-gray-600">Timeline</p>
        <p className="text-lg">P50: {result?.p50Days} days • P80: {result?.p80Days} days</p>
      </div>
      <div className="card p-4">
        <p className="text-sm font-medium mb-2">Line Items</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-1">Assembly</th>
              <th className="py-1">Qty/Hrs</th>
              <th className="py-1">Labor</th>
              <th className="py-1">Materials</th>
            </tr>
          </thead>
          <tbody>
            {result?.lineItems?.map((li: any, i: number) => (
              <tr key={i} className="border-t">
                <td className="py-1">{li.assembly}</td>
                <td className="py-1">{li.laborHours ?? li.sf ?? li.cy ?? "-"}</td>
                <td className="py-1">{li.laborUSD ? `$${li.laborUSD.toLocaleString()}` : "-"}</td>
                <td className="py-1">{li.materialsUSD ? `$${li.materialsUSD.toLocaleString()}` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}