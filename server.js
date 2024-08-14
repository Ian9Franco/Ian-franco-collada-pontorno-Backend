const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const viewsRouter = require('./routes/views');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

// Configurar Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Ejemplo de tareas para endpoints de prueba
let tasks = [
    { id: 1, title: "Eera por abajo palacio" },
    { id: 2, title: "Ankara messi" },
    { id: 3, title: "Cristiano ronaldo siuu" }
];

// Endpoints de prueba
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const taskID = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskID);

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const newTask = { id: tasks.length + 1, title: title || "Nueva tarea" };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Socket.io
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('addProduct', (product) => {
        products.push(product);
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', (productName) => {
        products = products.filter(product => product.name !== productName);
        io.emit('updateProducts', products);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mi_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => console.error('Could not connect to MongoDB...', err));

