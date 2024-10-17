import React, { useState } from 'react';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    return (
        <div style={styles.list}>
            <h2 style={styles.heading}>All Students</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Program</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id} style={styles.tr}>
                            <td style={styles.td}>{student.id}</td>
                            <td style={styles.td}>{student.name}</td>
                            <td style={styles.td}>{student.program}</td>
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
        marginTop: '20px',
    },
    th: {
        padding: '10px',
        textAlign: 'left',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    tr: {
        ':hover': {
            backgroundColor: '#f1f1f1',
        }
    }
};

export default StudentList;
