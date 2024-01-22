const express = require('express');
const app = express();
app.use(express.json());


const courses = [
    { id: 1, name: 'course' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]


app.get('/', (req, res) => {
    res.send(courses)
})

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`))