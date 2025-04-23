import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Form, InputGroup, Modal } from "react-bootstrap";
import itemsData from "./data/items.json";

const App = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", description: "", image: "", rating: 1 });

  useEffect(() => {
    setItems(itemsData);
  }, []);

  const handleAddItem = () => {
    const id = Date.now();
    setItems([...items, { ...newItem, id }]);
    setShowModal(false);
    setNewItem({ name: "", description: "", image: "", rating: 1 });
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleRatingChange = (id, rating) => {
    setItems(items.map(item => item.id === id ? { ...item, rating: parseInt(rating) } : item));
  };

  const filteredItems = items
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">My Collection</h1>

      <div className="d-flex justify-content-between mb-3">
        <InputGroup className="w-50">
          <Form.Control
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </InputGroup>

        <Form.Select
          style={{ width: "200px" }}
          value={sortKey}
          onChange={e => setSortKey(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
        </Form.Select>

        <Button onClick={() => setShowModal(true)}>Add Item</Button>
      </div>

      <div className="row">
        {filteredItems.map(item => (
          <div className="col-md-4 mb-4" key={item.id}>
            <Card>
              <Card.Img variant="top" src={item.image} style={{ height: "200px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Form.Select
                  value={item.rating}
                  onChange={e => handleRatingChange(item.id, e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Star{n > 1 && 's'}</option>)}
                </Form.Select>
                <Button variant="danger" className="mt-2" onClick={() => handleDelete(item.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={newItem.name}
                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={newItem.description}
                onChange={e => setNewItem({ ...newItem, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                value={newItem.image}
                onChange={e => setNewItem({ ...newItem, image: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Select
                value={newItem.rating}
                onChange={e => setNewItem({ ...newItem, rating: e.target.value })}
              >
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Star{n > 1 && 's'}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddItem}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
