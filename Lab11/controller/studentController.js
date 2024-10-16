import Student from "../model/student.js"

const studentController = {
    getStudents: (req, res, next) => {
        if (Object.keys(req.query).length === 0) {
            return res.status(200).json(Student.getAll())
        }
        next()
    },

    getStudentsByQueryString: (req, res, next) => {
        const { sort, order = 'asc', program } = req.query
        if (sort && program) {
            let students = Student.sortAndFilterBy(sort, program)
            if (students)
                res.status(200).json(students)
            else
                res.status(404).json({ message: "Student not found" })
        }
        else if (sort) {
            let students = Student.sortBy(sort, order === 'asc' ? 1 : -1)
            res.status(200).json(students)
        }
        else if (program) {
            let students = Student.filterBy(program)
            if (students)
                res.status(200).json(students)
            else
                res.status(404).json({ message: "Student not found" })
        }
        else {
            res.status(200).json(Student.getAll())
        }
    },

    createStudent: (req, res, next) => {
        const {id, name, program} = req.body
        if (id && name && program) {
            const student = Student.createStudent(id, name, program)
            if (student)
                res.status(201).json({message: "created"})
            else
                res.status(409).json({ message: "Student is already existed" })
        }
        else
            res.status(400).json({ message: "provide all information" })
    },

    getStudentById: (req, res, next) => {
        const id = req.params.id
        if (id) {
            const student = Student.getStudentById(id)
            if (student)
                res.status(200).json(student)
            else
                res.status(404).json({message: "Not found a student"})
        }
        else
            res.status(400).json({message: "Provide id"})
    },

    deleteStudentById: (req, res, next) => {
        const id = req.params.id
        if (id) {
            const student = Student.deleteStudentById(id * 1)
            if (student)
                res.status(200).json({message: "student deleted"})
            else
                res.status(404).json({message: "student not found"})
        }
        else
            res.status(400).json({message: "Provide id"})
    },

    updateStudentById: (req, res, next) => {
        const id = req.params.id
        const {name, program} = req.body
        if (id && name && program) {
            const student = Student.updateStudentById(id, name, program)
            if (student)
                res.status(200).json({message: "student updated"})
            else
                res.status(404).json({message: "student not found"})
        }
        else
            res.status(400).json({ message: "provide all information" })
    }
}

export default studentController