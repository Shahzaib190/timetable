document.addEventListener('DOMContentLoaded', function() {
    // User type selection
    const userTypes = document.querySelectorAll('.user-type');
    const studentCodeGroup = document.getElementById('studentCodeGroup');
    
    userTypes.forEach(type => {
        type.addEventListener('click', function() {
            userTypes.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show student code field only for students
            if (this.dataset.type === 'student') {
                studentCodeGroup.style.display = 'block';
            } else {
                studentCodeGroup.style.display = 'none';
            }
        });
    });
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const activeType = document.querySelector('.user-type.active').dataset.type;
        
        // Simple validation
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        
        if (activeType === 'student' && !document.getElementById('studentCode').value) {
            alert('Please enter your student code');
            return;
        }
        
        // In a real app, this would be an API call to your backend
        authenticateUser(username, password, activeType);
    });
    
    function authenticateUser(username, password, userType) {
        // This is mock authentication - in a real app you would call your backend
        
        // Mock users (in reality, this would be server-side validation)
        const mockUsers = {
            admin: { username: 'admin', password: 'admin123', redirect: 'dashboard/index.html' },
            tutor: { username: 'tutor1', password: 'tutor123', redirect: 'dashboard/tutor-timetables.html' },
            student: { username: 'student1', password: 'student123', code: 'OX2023', redirect: 'dashboard/student-timetables.html' }
        };
        
        // Check if user exists for the selected type
        const user = mockUsers[userType];
        
        if (user && username === user.username && password === user.password) {
            // Additional check for student code
            if (userType === 'student') {
                const studentCode = document.getElementById('studentCode').value;
                if (studentCode !== user.code) {
                    alert('Invalid student code');
                    return;
                }
            }
            
            // Successful login - redirect to appropriate dashboard
            window.location.href = user.redirect;
            
            // In a real app, you would store the auth token or session
            localStorage.setItem('authToken', 'mock-token');
            localStorage.setItem('userType', userType);
            localStorage.setItem('username', username);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    }
    
    // Check if user is already logged in (in a real app, you'd verify the token)
    if (localStorage.getItem('authToken')) {
        const userType = localStorage.getItem('userType');
        switch(userType) {
            case 'admin':
                window.location.href = 'dashboard/index.html';
                break;
            case 'tutor':
                window.location.href = 'dashboard/tutor-timetables.html';
                break;
            case 'student':
                window.location.href = 'dashboard/student-timetables.html';
                break;
        }
    }
});