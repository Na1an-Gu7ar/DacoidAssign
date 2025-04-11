import React from 'react';

const LinkTable = ({ links }) => (
    <table className="w-full table-auto border">
        <thead>
            <tr className="bg-gray-200">
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Total Clicks</th>
                <th>Created</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {links.map(link => (
                <tr key={link._id} className="text-center">
                    <td className="p-2 break-all">{link.originalUrl}</td>
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
                    <td>{link.totalClicks}</td>
                    <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                    <td>
                        {link.expiresAt && new Date(link.expiresAt) < new Date()
                            ? 'Expired'
                            : 'Active'}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default LinkTable;
