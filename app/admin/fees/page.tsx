'use client';

const students = [
  { id: 1, name: 'John Doe', class: '10th', fees: { total: 5000, paid: 5000, status: 'Paid' } },
  { id: 2, name: 'Jane Smith', class: '9th', fees: { total: 4500, paid: 2000, status: 'Pending' } },
  { id: 3, name: 'Sam Wilson', class: '11th', fees: { total: 6000, paid: 6000, status: 'Paid' } },
  { id: 4, name: 'Emily Brown', class: '8th', fees: { total: 4000, paid: 0, status: 'Unpaid' } },
];

export default function FeesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Fee Collection</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fees</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees Paid</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.fees.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.fees.paid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.fees.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        student.fees.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {student.fees.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
