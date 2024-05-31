document.addEventListener("DOMContentLoaded", () => {
    const addStudentForm = document.getElementById('add-student-form');
    const studentsTableBody = document.getElementById('students-table')?.querySelector('tbody');
    const markAttendanceForm = document.getElementById('mark-attendance-form');
    const studentsList = document.getElementById('students-list');
    const attendanceTableBody = document.getElementById('attendance-table')?.querySelector('tbody');
    const reportTableBody = document.getElementById('report-table')?.querySelector('tbody');

    // Load students from localStorage
    function loadStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        return students;
    }

    // Save students to localStorage
    function saveStudents(students) {
        localStorage.setItem('students', JSON.stringify(students));
    }

    // Load attendance from localStorage
    function loadAttendance() {
        const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
        return attendance;
    }

    // Save attendance to localStorage
    function saveAttendance(attendance) {
        localStorage.setItem('attendance', JSON.stringify(attendance));
    }

    // Add student
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = addStudentForm.name.value.trim();
            const rollNumber = addStudentForm.roll_number.value.trim();

            if (name && rollNumber) {
                const students = loadStudents();
                students.push({ name, rollNumber });
                saveStudents(students);
                addStudentForm.reset();
                alert('Student added successfully!');
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // View students
    if (studentsTableBody) {
        const students = loadStudents();
        studentsTableBody.innerHTML = students.map((student, index) => `
            <tr>
                <td>${student.name}</td>
                <td>${student.rollNumber}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // Mark attendance
    if (markAttendanceForm) {
        const students = loadStudents();
        studentsList.innerHTML = students.map((student, index) => `
            <div>
                <label>${student.name} (${student.rollNumber})</label>
                <input type="radio" name="status_${index}" value="Present" required> Present
                <input type="radio" name="status_${index}" value="Absent" required> Absent
            </div>
        `).join('');

        markAttendanceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = markAttendanceForm.date.value;
            if (date) {
                const attendance = loadAttendance();
                students.forEach((student, index) => {
                    const status = markAttendanceForm[`status_${index}`].value;
                    attendance.push({ date, name: student.name, rollNumber: student.rollNumber, status });
                });
                saveAttendance(attendance);
                markAttendanceForm.reset();
                alert('Attendance marked successfully!');
            } else {
                alert('Please select a date');
            }
        });
    }

    // View attendance
    if (attendanceTableBody) {
        const attendance = loadAttendance();
        attendanceTableBody.innerHTML = attendance.map(record => `
            <tr>
                <td>${record.date}</td>
                <td>${record.name}</td>
                <td>${record.rollNumber}</td>
                <td>${record.status}</td>
            </tr>
        `).join('');
    }

    // Generate attendance report
    if (reportTableBody) {
        const attendance = loadAttendance();
        const students = loadStudents();

        const report = students.map(student => {
            const studentAttendance = attendance.filter(record => record.rollNumber === student.rollNumber);
            const daysPresent = studentAttendance.filter(record => record.status === 'Present').length;
            const daysAbsent = studentAttendance.filter(record => record.status === 'Absent').length;
            return { ...student, daysPresent, daysAbsent };
        });

        reportTableBody.innerHTML = report.map(record => `
            <tr>
                <td>${record.name}</td>
                <td>${record.rollNumber}</td>
                <td>${record.daysPresent}</td>
                <td>${record.daysAbsent}</td>
            </tr>
        `).join('');
    }

    // Edit student
    window.editStudent = (index) => {
        const students = loadStudents();
        const student = students[index];
        const newName = prompt('Enter new name:', student.name);
        const newRollNumber = prompt('Enter new roll number:', student.rollNumber);

        if (newName && newRollNumber) {
            students[index] = { name: newName, rollNumber: newRollNumber };
            saveStudents(students);
            location.reload();
        } else {
            alert('Please fill in all fields');
        }
    };

    // Delete student
    window.deleteStudent = (index) => {
        if (confirm('Are you sure you want to delete this student?')) {
            const students = loadStudents();
            students.splice(index, 1);
            saveStudents(students);
            location.reload();
        }
    };
});

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');

    // Function to validate login credentials
    function validateLogin(username, password) {
        // Here you can implement your logic to check the credentials.
        // For simplicity, let's assume a hardcoded username and password.
        const validUsername = "srm";
        const validPassword = "2005";

        return username === validUsername && password === validPassword;
    }

    // Event listener for login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value.trim();
            const password = loginForm.password.value.trim();
            console.log("Submitted username:", username);
            console.log("Submitted password:", password);

            if (validateLogin(username, password)) {
                // If login is successful, redirect to main interface
                window.location.href = "main.html"; // Change this to the actual main interface file
            } else {
                alert('Invalid username or password. Please try again.');
                loginForm.reset();
            }
        });
    }
});
//try part
// Select the <tbody> element where attendance records are listed
const attendanceTableBody = document.querySelector('#attendance-table tbody');

// Function to clear all attendance records
function clearAttendanceRecords() {
    // Remove all child elements of the tbody
    while (attendanceTableBody.firstChild) {
        attendanceTableBody.removeChild(attendanceTableBody.firstChild);
    }
}

// Call the function to clear attendance records
clearAttendanceRecords();


