import React from 'react';
import {
  ChartBarIcon,
  CloudArrowUpIcon,
  CogIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Upload Data', href: '/dashboard/upload', icon: CloudArrowUpIcon },
  { name: 'Visualizations', href: '/dashboard/visualizations', icon: CogIcon },
  { name: 'AI Insights', href: '/dashboard/insights', icon: LightBulbIcon },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary">VizAI</h2>
      </div>
      <nav className="mt-8">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
}