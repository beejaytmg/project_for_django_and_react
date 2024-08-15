'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { accessToken } = useAuth();
  const [userdata, setUserdata] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [userTask, setUserTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tenants');

  useEffect(() => {
    if (accessToken) {
      fetchUserdata();
      fetchUserproject();
      fetchUserTask();
    }
  }, [accessToken]);
  const fetchUserdata = async () => {
    setLoading(true); // Set loading to true when starting to fetch
    try {
      const response = await fetch('/api/auth/user/tenants', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.tenants) {
        setUserdata(data.tenants); // Set the tenants array to userdata
      } else {
        console.error('Failed to fetch tenants:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching tenants:', error);
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };
  const fetchUserproject = async () => {
    setLoading(true); // Set loading to true when starting to fetch
    try {
      const response = await fetch('/api/auth/user/tenants/project', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.projects) {
        setProjectData(data.projects); // Set the tenants array to userdata
      } else {
        console.error('Failed to fetch tenants:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching tenants:', error);
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };
  const fetchUserTask = async () => {
    setLoading(true); // Set loading to true when starting to fetch
    try {
      const response = await fetch('/api/auth/user/tenants/tasks', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.tasks) {
        setUserTask(data.tasks); // Set the tenants array to userdata
      } else {
        console.error('Failed to fetch tenants:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching tenants:', error);
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tenants':
        return renderTenants();
      case 'projects':
        return renderProjects();
      case 'tasks':
        return renderTasks();
      default:
        return null;
    }
  };

  const renderTenants = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {userdata.map((tenant) => (
        <div key={tenant.id} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">{tenant.name}</h2>
          <p className="text-gray-600">Domain: {tenant.domain}</p>
          <p className="text-gray-600">Plan: {tenant.plan}</p>
          <p className="text-gray-600">Created: {new Date(tenant.created_at).toLocaleDateString()}</p>
          <p className="text-gray-600">Updated: {new Date(tenant.updated_at).toLocaleDateString()}</p>
          <span className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${tenant.is_active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {tenant.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      {projectData
        .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
        .map((project) => (
          <div key={project.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Start: {new Date(project.start_date).toLocaleDateString()}</span>
              <span>End: {new Date(project.end_date).toLocaleDateString()}</span>
            </div>
            <span className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${project.is_active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {project.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-4">
      {userTask
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
        .map((task) => (
          <div key={task.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <p className="text-sm text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
            <div className="mt-2 flex space-x-2">
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">{task.project}</span>
              <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">{task.tenant}</span>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="mb-6">
        <div className="sm:hidden">
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="tenants">Tenants</option>
            <option value="projects">Projects</option>
            <option value="tasks">Tasks</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {['tenants', 'projects', 'tasks'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-medium text-sm rounded-md`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        renderTabContent()
      )}
    </div>
  );
}