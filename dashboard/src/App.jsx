import React, { useState } from "react";
import { Search, BookOpen, Users, ShoppingCart, BarChart2 } from "lucide-react";

const statsData = [
  { title: "Total Books", value: 1240, icon: BookOpen },
  { title: "Users", value: 320, icon: Users },
  { title: "Orders", value: 89, icon: ShoppingCart },
  { title: "Revenue", value: "$12,430", icon: BarChart2 },
];

const booksData = [
  { id: 1, title: "Atomic Habits", author: "James Clear", status: "Available" },
  { id: 2, title: "Deep Work", author: "Cal Newport", status: "Out of Stock" },
  { id: 3, title: "The Alchemist", author: "Paulo Coelho", status: "Available" },
  { id: 4, title: "Ikigai", author: "Hector Garcia", status: "Available" },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">📚 BookStore</h2>
        <nav className="space-y-4">
          <a className="block font-medium text-blue-600">Dashboard</a>
          <a className="block text-gray-600 hover:text-blue-600">Books</a>
          <a className="block text-gray-600 hover:text-blue-600">Users</a>
          <a className="block text-gray-600 hover:text-blue-600">Orders</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search books..."
              className="ml-2 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <Icon className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Book Table */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Books</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2">Title</th>
                <th className="pb-2">Author</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        book.status === "Available"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
