const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

let tasks = [
    {id: 1, title: "Eera por abajo palacio"},
    {id: 2, title: "Ankara messi"},
    {id: 3, title: "Cristiano ronaldo siuu"}
]

// Endpoints
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const taskID = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskID);

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: "tarea no encontrada" });
    }
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const newTask = { id: tasks.length + 1, title: title || "Nueva tarea" }; //
    tasks.push(newTask); // 
    res.status(201).json(newTask); // 
});


app.get('/', (req,res) => {
    res.json({ msg: "GET API" })
})

app.post('/api', (req,res) => {
    res.json({ msg: "POST API" })
})

app.put('/api', (req,res) => {
    const taskID= parseInt(req.params.id)
    const task = tasks.find((task)=> task.id === taskID)
    if(task){
        const {title} = req.body
        task.title = title
        res.json(task)

    }else{
        res.status(404).json({message:"Tarea no encontrada" } )
    }
    //res.json({ msg: "PUT API" })
})

app.delete('/api', (req,res) => {
    res.json({ msg: "DELETE API" })
})




const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
