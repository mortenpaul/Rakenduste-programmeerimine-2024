const todo = [
    {
      id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
      title: "Homework",
      priority:2,
      finished: true,
      createdAt: 1729762532509,
      updatedAt: null,
      deleted: false,
    },
    {
      id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
      title: "Workout",
      priority:3,
      finished: false,
      createdAt: 1729762532509,
      updatedAt: null,
      deleted: true,
    },
  ];

exports.create = (req, res) => {
    const {title} = req.body;

    const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        priority: 1,
        finished: false,
        createdAt: Date.now(),
        updatedAt: null,
        deleted:false,
    }

    todo.push(newTodo);

    res.send(newTodo);
};

exports.read = (req, res) => {

  const activeTodos = todo.filter(item => !item.deleted);
  res.send(activeTodos);
};

exports.update = (req, res) => {
  const { id } = req.params; 
  const { title, priority, finished } = req.body; 

  const todoItem = todo.find(item => item.id === id);

  if (todoItem && !todoItem.deleted) {
 
      if (title) todoItem.title = title;
      if (priority !== undefined) todoItem.priority = priority;
      if (finished !== undefined) todoItem.finished = finished;
      todoItem.updatedAt = Date.now();

      return res.send(todoItem);
  } else {
      return res.send({ message: "Todo not found or deleted" });
  }
};

exports.delete = (req, res) => {
  const { id } = req.params; 

  const todoItem = todo.find(item => item.id === id);

  if (todoItem) {
     
      todoItem.deleted = true;

      return res.send({ message: "Todo marked as deleted", todoItem });
  } else {
      return res.send({ message: "Todo not found" });
  }
};