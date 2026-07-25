'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/modal';

// Define the Student type
interface Student {
  id: number;
  name: string;
  class: string;
  fees: { total: number; paid: number; status: string; };
}

const initialStudents: Student[] = [
  { id: 1, name: 'John Doe', class: '10th', fees: { total: 5000, paid: 5000, status: 'Paid' } },
  { id: 2, name: 'Jane Smith', class: '9th', fees: { total: 4500, paid: 2000, status: 'Pending' } },
  { id: 3, name: 'Sam Wilson', class: '11th', fees: { total: 6000, paid: 6000, status: 'Paid' } },
  { id: 4, name: 'Emily Brown', class: '8th', fees: { total: 4000, paid: 0, status: 'Unpaid' } },
];

export default function FeesPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({ name: '', class: '', total: '', paid: '' });

  const handleOpenModal = (student: Student | null = null) => {
    setSelectedStudent(student);
    setFormData(student ? { name: student.name, class: student.class, total: String(student.fees.total), paid: String(student.fees.paid) } : { name: '', class: '', total: '', paid: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, class: className, total, paid } = formData;
    const paidAmount = parseFloat(paid) || 0;
    const totalAmount = parseFloat(total) || 0;
    let status: 'Paid' | 'Pending' | 'Unpaid' = 'Unpaid';
    if (paidAmount === totalAmount) {
      status = 'Paid';
    } else if (paidAmount > 0) {
      status = 'Pending';
    }

    if (selectedStudent) {
      setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, name, class: className, fees: { total: totalAmount, paid: paidAmount, status } } : s));
    } else {
      const newStudent: Student = {
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name,
        class: className,
        fees: { total: totalAmount, paid: paidAmount, status },
      };
      setStudents([...students, newStudent]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Fee Collection</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-end mb-4">
          <button onClick={() => handleOpenModal()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Student
          </button>
        </div>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleOpenModal(student)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-2xl font-bold mb-4">{selectedStudent ? 'Edit Student' : 'Add Student'}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">Class</label>
            <input type="text" name="class" id="class" value={formData.class} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total">Total Fees</label>
            <input type="number" name="total" id="total" value={formData.total} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paid">Fees Paid</label>
            <input type="number" name="paid" id="paid" value={formData.paid} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{selectedStudent ? 'Save Changes' : 'Add Student'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
