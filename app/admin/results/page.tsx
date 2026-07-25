'use client';

const students = [
  { id: 1, name: 'John Doe', class: '10th', results: { english: 'A', maths: 'B', science: 'A', history: 'C' } },
  { id: 2, name: 'Jane Smith', class: '9th', results: { english: 'B', maths: 'A', science: 'B', history: 'A' } },
  { id: 3, name: 'Sam Wilson', class: '11th', results: { physics: 'A', chemistry: 'B', maths: 'A' } },
  { id: 4, name: 'Emily Brown', class: '8th', results: { english: 'A', maths: 'A', science: 'A', history: 'A' } },
];

export default function ResultsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Exam Results</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul>
                      {Object.entries(student.results).map(([subject, grade]) => (
                        <li key={subject}>{subject}: {grade}</li>
                      ))}
                    </ul>
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
