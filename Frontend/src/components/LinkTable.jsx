import React, { useEffect, useState } from 'react';
import QRCodeModal from './QRCodeModal';

const LinkTable = () => {
    const [links, setLinks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    const fetchLinks = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/links?page=${page}&limit=5&search=${search}`,
                {
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            const data = await res.json();
            setLinks(data.links);
            setTotalPages(data.pages);
        } catch (err) {
            console.error('Error fetching links:', err);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, [page, search]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search Original URL..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1); // Reset to page 1 when searching
                }}
                className="mb-4 p-2 border rounded"
            />

            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-200">
                        <th>Original URL</th>
                        <th>Short URL</th>
                        <th>QR</th>
                        <th>Total Clicks</th>
                        <th>Created</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {links.length > 0 ? (
                        links.map((link) => (
                            <tr key={link._id} className="text-center">
                                <td className="p-2 break-all w-2xl overflow-auto">
                                    {link.originalUrl}
                                </td>
                                <td>
                                    <a
                                        href={`https://url-shortener-api-im11.onrender.com/${link.shortCode}`}
                                        className="text-blue-500 underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        /{link.shortCode}
                                    </a>
                                </td>
                                <td>
                                    <QRCodeModal
                                        shortUrl={`https://url-shortener-api-im11.onrender.com/${link.shortCode}`}
                                    />
                                </td>
                                <td>{link.totalClicks}</td>
                                <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                                <td>
                                    {link.expiresAt && new Date(link.expiresAt) < new Date()
                                        ? 'Expired'
                                        : 'Active'}
                                </td>
                            </tr>
                        ))
                    ) : 
                        <tr>
                            <td colSpan="6" className="text-center p-4">
                                No links found.
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            <div className="flex justify-center items-center mt-4 gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LinkTable;
