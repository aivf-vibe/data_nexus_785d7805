// EMR Dashboard JavaScript
console.log('EMR Dashboard initialized');

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing EMR Dashboard features');
    
    // Navigation active state management
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigation clicked:', this.textContent);
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section if exists
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Simulate real-time data updates
    initializeRealTimeUpdates();
    
    // Initialize dashboard interactions
    initializeDashboardInteractions();
    
    // Initialize patient status monitoring
    initializePatientMonitoring();
});

// Real-time data simulation
function initializeRealTimeUpdates() {
    console.log('Initializing real-time data updates');
    
    // Update patient count every 30 seconds
    setInterval(() => {
        const patientCountElement = document.querySelector('.stat-number');
        if (patientCountElement) {
            let currentCount = parseInt(patientCountElement.textContent.replace(',', ''));
            const change = Math.floor(Math.random() * 10) - 5; // Random change between -5 and +5
            const newCount = Math.max(0, currentCount + change);
            patientCountElement.textContent = newCount.toLocaleString();
            console.log('Updated patient count:', newCount);
        }
    }, 30000);
    
    // Update appointment count
    setInterval(() => {
        const appointmentElements = document.querySelectorAll('.stat-number');
        if (appointmentElements.length > 1) {
            let currentCount = parseInt(appointmentElements[1].textContent);
            const change = Math.floor(Math.random() * 6) - 3; // Random change between -3 and +3
            const newCount = Math.max(0, currentCount + change);
            appointmentElements[1].textContent = newCount;
            console.log('Updated appointment count:', newCount);
        }
    }, 45000);
}

// Dashboard interactions
function initializeDashboardInteractions() {
    console.log('Initializing dashboard interactions');
    
    // Patient item click handlers
    const patientItems = document.querySelectorAll('.patient-item');
    patientItems.forEach(item => {
        item.addEventListener('click', function() {
            const patientName = this.querySelector('.patient-name').textContent;
            const patientId = this.querySelector('.patient-id').textContent;
            console.log('Patient selected:', patientName, patientId);
            
            // Highlight selected patient
            patientItems.forEach(p => p.classList.remove('selected'));
            this.classList.add('selected');
            
            // Show patient details (simulated)
            showPatientDetails(patientName, patientId);
        });
    });
    
    // Schedule item click handlers
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        item.addEventListener('click', function() {
            const scheduleInfo = this.querySelector('.schedule-patient').textContent;
            const scheduleTime = this.querySelector('.schedule-time').textContent;
            console.log('Appointment selected:', scheduleTime, scheduleInfo);
            
            // Highlight selected appointment
            scheduleItems.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            
            showAppointmentDetails(scheduleTime, scheduleInfo);
        });
    });
    
    // Lab result click handlers
    const labItems = document.querySelectorAll('.lab-item');
    labItems.forEach(item => {
        item.addEventListener('click', function() {
            const labTest = this.querySelector('.lab-test').textContent;
            const labStatus = this.querySelector('.lab-status').textContent;
            console.log('Lab result selected:', labTest, labStatus);
            
            // Highlight selected lab result
            labItems.forEach(l => l.classList.remove('selected'));
            this.classList.add('selected');
            
            showLabDetails(labTest, labStatus);
        });
    });
}

// Patient monitoring system
function initializePatientMonitoring() {
    console.log('Initializing patient monitoring system');
    
    // Simulate patient status changes
    setInterval(() => {
        const patientStatuses = document.querySelectorAll('.patient-status');
        patientStatuses.forEach(status => {
            const currentStatus = status.textContent.toLowerCase();
            const random = Math.random();
            
            // Small chance of status change
            if (random < 0.1) {
                let newStatus, newClass;
                
                if (currentStatus === 'critical') {
                    newStatus = 'Stable';
                    newClass = 'stable';
                } else if (currentStatus === 'stable') {
                    newStatus = 'Recovering';
                    newClass = 'recovering';
                } else {
                    newStatus = 'Stable';
                    newClass = 'stable';
                }
                
                status.textContent = newStatus;
                status.className = `patient-status ${newClass}`;
                console.log('Patient status updated:', newStatus);
                
                // Show notification
                showNotification(`Patient status updated to: ${newStatus}`);
            }
        });
    }, 60000); // Check every minute
    
    // Simulate lab result updates
    setInterval(() => {
        const labStatuses = document.querySelectorAll('.lab-status');
        labStatuses.forEach(status => {
            const currentStatus = status.textContent.toLowerCase();
            const random = Math.random();
            
            if (random < 0.15 && currentStatus === 'pending') {
                status.textContent = 'Ready';
                status.className = 'lab-status ready';
                console.log('Lab result ready');
                
                showNotification('New lab results available');
            } else if (random < 0.1 && currentStatus === 'processing') {
                status.textContent = 'Ready';
                status.className = 'lab-status ready';
                console.log('Lab processing completed');
                
                showNotification('Lab processing completed');
            }
        });
    }, 45000);
}

// Show patient details modal (simulated)
function showPatientDetails(name, id) {
    console.log('Showing patient details for:', name, id);
    
    // Create a simple alert for demonstration
    const details = `
Patient: ${name}
${id}
Age: ${Math.floor(Math.random() * 60) + 20}
Last Visit: ${new Date().toLocaleDateString()}
Condition: ${getRandomCondition()}
Medications: ${getRandomMedications()}
    `;
    
    alert(details);
}

// Show appointment details
function showAppointmentDetails(time, info) {
    console.log('Showing appointment details:', time, info);
    
    const details = `
Appointment: ${time}
Patient: ${info}
Duration: 30 minutes
Room: ${Math.floor(Math.random() * 20) + 1}
Type: ${getRandomAppointmentType()}
    `;
    
    alert(details);
}

// Show lab details
function showLabDetails(test, status) {
    console.log('Showing lab details:', test, status);
    
    const details = `
Test: ${test}
Status: ${status}
Ordered: ${new Date(Date.now() - Math.random() * 86400000 * 3).toLocaleDateString()}
Expected: ${new Date(Date.now() + Math.random() * 86400000 * 2).toLocaleDateString()}
Priority: ${getRandomPriority()}
    `;
    
    alert(details);
}

// Utility functions
function getRandomCondition() {
    const conditions = ['Hypertension', 'Diabetes', 'Asthma', 'Arthritis', 'Migraine', 'Allergies'];
    return conditions[Math.floor(Math.random() * conditions.length)];
}

function getRandomMedications() {
    const medications = ['Lisinopril', 'Metformin', 'Albuterol', 'Ibuprofen', 'Aspirin', 'Amoxicillin'];
    return medications[Math.floor(Math.random() * medications.length)];
}

function getRandomAppointmentType() {
    const types = ['Consultation', 'Follow-up', 'Surgery', 'Check-up', 'Emergency', 'Therapy'];
    return types[Math.floor(Math.random() * types.length)];
}

function getRandomPriority() {
    const priorities = ['High', 'Medium', 'Low', 'Urgent', 'Routine'];
    return priorities[Math.floor(Math.random() * priorities.length)];
}

// Notification system
function showNotification(message) {
    console.log('Notification:', message);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .selected {
        background-color: #e3f2fd !important;
        border-left: 4px solid #3498db !important;
    }
`;
document.head.appendChild(style);

// Initialize search functionality
function initializeSearch() {
    console.log('Initializing search functionality');
    
    // Add search functionality for patients, appointments, and lab results
    const searchInputs = document.querySelectorAll('input[type="search"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const targetContainer = this.closest('.dashboard-card');
            const items = targetContainer.querySelectorAll('.patient-item, .schedule-item, .lab-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            
            console.log('Search performed:', searchTerm);
        });
    });
}

// Medical data analytics simulation
function initializeMedicalAnalytics() {
    console.log('Initializing medical analytics');
    
    // Simulate analytics data updates
    setInterval(() => {
        const analyticsData = {
            patientSatisfaction: Math.floor(Math.random() * 20) + 80,
            averageWaitTime: Math.floor(Math.random() * 30) + 15,
            treatmentSuccess: Math.floor(Math.random() * 15) + 85,
            bedOccupancy: Math.floor(Math.random() * 30) + 70
        };
        
        console.log('Analytics updated:', analyticsData);
        
        // Update analytics display if elements exist
        updateAnalyticsDisplay(analyticsData);
    }, 120000); // Update every 2 minutes
}

function updateAnalyticsDisplay(data) {
    // This would update analytics charts and metrics
    console.log('Updating analytics display with:', data);
}

// Initialize all systems when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeMedicalAnalytics();
});

console.log('EMR Dashboard script loaded successfully');