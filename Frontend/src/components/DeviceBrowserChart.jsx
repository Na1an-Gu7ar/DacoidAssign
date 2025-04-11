import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

const DeviceBrowserChart = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/analytics/device-browser-breakdown`)
            .then(res => {
                const grouped = {}
                res.data.forEach(item => {
                    const key = item.browser
                    if (!grouped[key]) {
                        grouped[key] = { browser: key }
                    }
                    grouped[key][item.device] = item.count
                })

                const formattedData = Object.values(grouped)
                setData(formattedData)
            })
            .catch(err => {
                console.error("Error loading device/browser data", err)
            })
    }, [])

    return (
        <div className="w-full h-96 p-4">
            <h2 className="text-lg font-semibold mb-4">Device/Browser Breakdown</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="browser" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="desktop" fill="#8884d8" />
                    <Bar dataKey="mobile" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DeviceBrowserChart
