'use client';
import { Plus, Search, User } from 'lucide-react';

const courses = [
  { title: 'Mathematics 101', progress: 75, instructor: 'Dr. Smith' },
  { title: 'History of Art', progress: 50, instructor: 'Prof. Jones' },
  { title: 'Introduction to Physics', progress: 90, instructor: 'Dr. Lee' },
];

const assignments = [
  { title: 'Math Homework 5', dueDate: '2023-10-27', course: 'Mathematics 101' },
  { title: 'Art History Essay', dueDate: '2023-11-05', course: 'History of Art' },
];

const recentActivity = [
  { description: 'New grade posted for Math Homework 4.', time: '2 hours ago' },
  { description: 'Dr. Smith posted a new announcement in Mathematics 101.', time: '1 day ago' },
  { description: 'Welcome to the platform!', time: '3 days ago' },
];

export default function DashboardPage() {

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome back, Alex!</h2>
          <img src="/icon.png" alt="Alex" className="w-10 h-10 rounded-full ml-4" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border rounded-full w-64"
            />
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Enroll in a Course
          </button>
        </div>
      </div>

      {/* My Courses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {courses.map((course, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">Taught by {course.instructor}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
            </div>
            <p className="text-right text-sm text-gray-500 mt-2">{course.progress}% Complete</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Assignments Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Upcoming Assignments</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ul>
              {assignments.map((assignment, index) => (
                <li key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                  <div>
                    <p className="font-semibold">{assignment.title}</p>
                    <p className="text-sm text-gray-500">{assignment.course}</p>
                  </div>
                  <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ul>
              {recentActivity.map((activity, index) => (
                <li key={index} className="flex items-start py-3 border-b last:border-b-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-gray-800">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
