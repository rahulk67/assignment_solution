import React, { useState } from 'react';

const Dashboard = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'CSPM Exectuve dash board',
      widgets: [
        { id: 1, name: 'Widget 1', text: 'This is widget 1', image: null },
        { id: 2, name: 'Widget 2', text: 'This is widget 2', image: null },
      ],
    },
    {
      id: 2,
      name: 'CWPP Dashboard',
      widgets: [
        { id: 3, name: 'Widget 3', text: 'This is widget 3', image: null },
      ],
    },
  ]);

  const [newWidget, setNewWidget] = useState({ name: '', text: '', image: null, categoryId: null });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewWidget({ ...newWidget, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addWidget = (categoryId) => {
    const newWidgetId = Date.now();
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: [...category.widgets, { id: newWidgetId, name: newWidget.name, text: newWidget.text, image: newWidget.image }]
        };
      }
      return category;
    });
    setCategories(updatedCategories);
    setNewWidget({ name: '', text: '', image: null, categoryId: null });
  };

  const removeWidget = (categoryId, widgetId) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  return (
    <div className="p-4">
        <h2 className='font-extrabold my-4 p-4'>CMAAP DashBoard</h2> 
      {categories.map(category => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.widgets.map(widget => (
              <div key={widget.id} className="bg-white p-6 rounded-lg shadow-lg relative">
                <h3 className="text-lg font-semibold mb-2">{widget.name}</h3>
                {widget.image && <img src={widget.image} alt={widget.name} className="mb-4 w-full h-40 object-cover rounded-lg"/>}
                <p className="mb-4">{widget.text}</p>
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => removeWidget(category.id, widget.id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Widget Name"
              className="border p-2 mr-2"
              value={newWidget.name}
              onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value, categoryId: category.id })}
            />
            <input
              type="text"
              placeholder="Widget Text"
              className="border p-2 mr-2"
              value={newWidget.text}
              onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value, categoryId: category.id })}
            />
            <input
              type="file"
              accept="image/*"
              className="border p-2 mr-2"
              onChange={handleImageUpload}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => addWidget(category.id)}
            >
              Add Widget
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
