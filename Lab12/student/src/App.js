import Header from './components/Header'
import Footer from './components/Footer'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'

function App() {
    return (
        <div>
            <Header />
            <div style={styles.container}>
                <StudentForm/>
                <StudentList/>
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