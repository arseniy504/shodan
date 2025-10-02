class DeviceSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.resultsList = document.getElementById('resultsList');
        this.loading = document.getElementById('loading');
        this.resultsCount = document.getElementById('resultsCount');
        this.searchTime = document.getElementById('searchTime');
        
        this.init();
    }
    
    init() {
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        // Load sample data on init
        this.showSampleData();
    }
    
    async performSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;
        
        this.showLoading();
        const startTime = Date.now();
        
        try {
            // Simulate API call - replace with actual backend
            const results = await this.simulateSearch(query);
            this.displayResults(results);
        } catch (error) {
            this.displayError(error);
        } finally {
            this.hideLoading();
            this.updateStats(Date.now() - startTime);
        }
    }
    
    async simulateSearch(query) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Sample data - replace with real API response
        return [
            {
                ip: '192.168.1.1',
                country: 'US',
                services: [
                    { port: 80, service: 'HTTP', banner: 'Apache/2.4.41' },
                    { port: 22, service: 'SSH', banner: 'OpenSSH 8.2' },
                    { port: 443, service: 'HTTPS', banner: 'Apache/2.4.41' }
                ],
                type: 'router'
            },
            {
                ip: '192.168.1.105',
                country: 'UA',
                services: [
                    { port: 80, service: 'HTTP', banner: 'nginx/1.18.0' },
                    { port: 21, service: 'FTP', banner: 'vsFTPd 3.0.3' }
                ],
                type: 'server'
            },
            {
                ip: '10.0.0.55',
                country: 'DE',
                services: [
                    { port: 554, service: 'RTSP', banner: 'Camera Stream' },
                    { port: 80, service: 'HTTP', banner: 'Web Interface' }
                ],
                type: 'webcam'
            }
        ].filter(device => 
            device.ip.includes(query) ||
            device.services.some(service => 
                service.service.toLowerCase().includes(query.toLowerCase()) ||
                service.banner.toLowerCase().includes(query.toLowerCase())
            )
        );
    }
    
    displayResults(devices) {
        if (devices.length === 0) {
            this.resultsList.innerHTML = `
                <div class="no-results">
                    <h3>No devices found</h3>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            return;
        }
        
        this.resultsList.innerHTML = devices.map(device => `
            <div class="device-card">
                <div class="device-header">
                    <div>
                        <div class="device-ip">${device.ip}</div>
                        <div class="device-location">Country: ${device.country} | Type: ${device.type}</div>
                    </div>
                </div>
                <div class="device-services">
                    ${device.services.map(service => `
                        <span class="service-tag ${service.service.toLowerCase()}">
                            ${service.service} (${service.port})
                        </span>
                    `).join('')}
                </div>
                ${device.services.map(service => `
                    <div class="service-info">
                        <strong>${service.service} on port ${service.port}:</strong>
                        <code>${service.banner}</code>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }
    
    showSampleData() {
        const sampleDevices = [
            {
                ip: '192.168.1.1',
                country: 'US',
                services: [
                    { port: 80, service: 'HTTP', banner: 'Router Admin Panel' },
                    { port: 22, service: 'SSH', banner: 'OpenSSH 8.2' }
                ],
                type: 'router'
            }
        ];
        this.displayResults(sampleDevices);
    }
    
    displayError(error) {
        this.resultsList.innerHTML = `
            <div class="no-results">
                <h3>Search Error</h3>
                <p>${error.message || 'Failed to perform search'}</p>
            </div>
        `;
    }
    
    showLoading() {
        this.loading.classList.remove('hidden');
        this.resultsList.classList.add('hidden');
    }
    
    hideLoading() {
        this.loading.classList.add('hidden');
        this.resultsList.classList.remove('hidden');
    }
    
    updateStats(searchTime) {
        const deviceCount = document.querySelectorAll('.device-card').length;
        this.resultsCount.textContent = `${deviceCount} devices found`;
        this.searchTime.textContent = `Time: ${(searchTime / 1000).toFixed(2)}s`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new DeviceSearch();
});
