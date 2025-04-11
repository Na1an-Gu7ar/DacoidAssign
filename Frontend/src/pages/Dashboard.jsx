import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LinkTable from '../components/LinkTable';
import ShortenerForm from '../components/shortenerForm';
import { useNavigate } from 'react-router-dom';
import ClickChart from '../components/ClickChart';
import DeviceBrowserChart from '../components/DeviceBrowserChart';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/links/user-links`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setLinks(res.data))
      .catch(err => console.error('Error loading dashboard:', err))
      .finally(() => setLoading(false));

    const fetchClicks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/analytics/clicks-per-day`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChartData(res.data);
      } catch (err) {
        console.error('Failed to fetch click data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClicks();
  }, [token]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
      <ShortenerForm />
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <LinkTable links={links} />
      <ClickChart data={chartData} />
      <DeviceBrowserChart />
      {/* <ClickChart links={links} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <DevicePie links={links} />
        <BrowserPie links={links} />
      </div> */}
    </div>
  );
};

export default Dashboard;
