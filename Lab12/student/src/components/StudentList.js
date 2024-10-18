import React, { useEffect, useState } from 'react';
import { deleteStudent, getAllStudents } from '../services/studentService';

const StudentList = () => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetchStudents()
    })

    const fetchStudents = async() => {
        try {
            const students = await getAllStudents()
            setStudents(students)
        } catch (error) {
            console.log('Failed to fetch students: ', error)
        }
    }

    const handleDelete = async(id) => {
        try {
            const student = await deleteStudent(id)
            console.log(student)
        } catch (error) {
            console.log('Failed to deleted student: ', error)
        }
    }

    return (
        <div style={styles.list}>
            <h2 style={styles.heading}>All Students</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Program</th>
                        <th style={styles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} style={{
                            backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white'
                        }}
                        >
                            <td style={styles.td}>{student.id}</td>
                            <td style={styles.td}>{student.name}</td>
                            <td style={styles.td}>{student.program}</td>
                            <td style={styles.tdButton}><button type="button" onClick={() => handleDelete(student.id)} style={styles.deleteButton}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    list: {
        padding: '0px 50px 50px'
    },
    heading: {
        textAlign: 'left',
        marginBottom: '20px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    th: {
        padding: '10px',
        textAlign: 'left',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd'
    },
    td: {
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd'
    },
    tdButton: {
        borderBottom: '1px solid #ddd'
    },
    deleteButton: {
        backgroundColor: '#ff5722',
        color: 'white',
        padding: '8px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        width: '80px'
    }
};

export default StudentList;
