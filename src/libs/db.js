function generateData(type) {
  const quantity = 10;
  const data = [];
  for(let i = 0; i < quantity; i+= 1) {
    data.push({
      id: `${type}-${i}`,
    });
  }

  return data;
}

const dataFake = {
  users: generateData('users'),
  doc: generateData('docs'),
};

class Database {
  constructor(type) {
    this.type = type;
  }

  getItem(id) {
    const userFound = dataFake[this.type].find((o) => o.id === id);

    return {
      [this.type]: userFound,
    };
  }

  getListItem() {
    return {
      [this.type]: dataFake[this.type],
    };
  }

  insertItem(item) {
    dataFake[this.type].push(item);

    return {
      [this.type]: dataFake[this.type],
    };
  }

  updateItem(item, id) {
    const index = dataFake[this.type].findIndex((o => o.id === id));
    dataFake[this.type][index] = item;

    return {
      [this.type]: dataFake[this.type],
    };
  }

  deleteItem(id) {
    const index = dataFake[this.type].findIndex((o) => o.id === id);
    dataFake[this.type].splice(index, 1);

    return {
      [this.type]: dataFake[this.type],
    };
  }
}

export default Database;
