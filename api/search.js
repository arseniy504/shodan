// This would be your serverless function for GitHub Pages
// For now, it's a mock API

const mockDatabase = {
    devices: [
        {
            ip: '192.168.1.1',
            country: 'US',
            services: ['HTTP', 'SSH', 'HTTPS'],
            type: 'router',
            ports: [80, 22, 443]
        },
        {
            ip: '192.168.1.100',
            country: 'UA', 
            services: ['HTTP', 'FTP'],
            type: 'server',
            ports: [80, 21]
        }
    ]
};

function searchDevices(query) {
    return mockDatabase.devices.filter(device =>
        device.ip.includes(query) ||
        device.services.some(service => 
            service.toLowerCase().includes(query.toLowerCase())
        ) ||
        device.type.toLowerCase().includes(query.toLowerCase())
    );
}

// For GitHub Pages, you'd use this in a serverless function
module.exports = (req, res) => {
    const query = req.query.q || '';
    const results = searchDevices(query);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
        query,
        results_count: results.length,
        devices: results
    });
};
