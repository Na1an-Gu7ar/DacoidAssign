import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ShortenerForm() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const token = useSelector(state => state.auth.token);

    const handleSubmit = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/links/shorten`,
                { originalUrl, customAlias, expiresAt },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setShortUrl(res.data.shortUrl);
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating short link');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Create Short Link</h2>
            <input className="border p-2 mb-2 w-full" placeholder="Original URL" value={originalUrl} onChange={e => setOriginalUrl(e.target.value)} />
            <input className="border p-2 mb-2 w-full" placeholder="Custom Alias (optional)" value={customAlias} onChange={e => setCustomAlias(e.target.value)} />
            <input className="border p-2 mb-2 w-full" type="date" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Shorten</button>
            {shortUrl && (
                <p className="mt-2 text-green-600">Short URL: <a href={shortUrl} target="_blank" className="underline">{shortUrl}</a></p>
            )}
        </div>
    );
}
