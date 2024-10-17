import Header from './components/Header'
import Footer from './components/Footer'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'
import { useState } from 'react'

function App() {
    const [refresh, setRefresh] = useState(false);

    const handleStudentAdded = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <StudentForm onStudentAdded={handleStudentAdded} />
                <StudentList />
            </div>
            <Footer />
        </div>
    )
}

const styles = {
    container: {
        padding: '0 20px'
    }
}

export default App