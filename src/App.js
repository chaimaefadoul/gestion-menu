// App.js

import './App.css';
import './styles.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMenuAction, updateMenuAction, deleteMenuAction, filterMenuAction, clearFilterMenuAction } from './Config/actions';

const styles = {
  buttonPrimary: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '5px 5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  buttonSecondary: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '5px 5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  menuItem: {
    backgroundColor: '#ffd700',
    color: '#333',
    padding: '10px',
    margin: '5px',
  },
};

function App() {
  const menus = useSelector((data) => data.menu) || [];
  const users = useSelector((data) => data.users);
  const usersFilter = useSelector((data) => data.usersFilter);
  const listeUsersMap = usersFilter ? usersFilter : users;
  const indexUser = users.length;
  const [id, setId] = useState('');
  const [plat, setPlat] = useState('');
  const [drink, setDrink] = useState('');
  const [dessert, setDessert] = useState('');
  const [menu, setMenu] = useState(1);
  const [menuFilter, setMenuFilter] = useState('');
  const dispatch = useDispatch();

  const handleEnregistrer = () => {
    dispatch(addMenuAction({ id: indexUser + 1, plat: plat, drink: drink, dessert: dessert, menu: parseInt(menu) }));
    handleClear();
  };

  const handleClear = () => {
    setPlat('');
    setDrink('');
    setDessert('');
    setMenu(1);
  };

  const handleRemplirForm = (userId) => {
    const user = users.find((u) => u.id === parseInt(userId));
    setId(userId);
    setPlat(user.plat);
    setDrink(user.drink);
    setDessert(user.dessert);
    setMenu(parseInt(user.menu));
  };

  const handleModifier = () => {
    dispatch(updateMenuAction({ id: id, plat: plat, drink: drink, dessert: dessert, menu: menu }));
    handleClear();
    setId('');
  };

  const handleDelete = (userId) => {
    dispatch(deleteMenuAction(userId));
  };

  const handleFilter = () => {
    dispatch(filterMenuAction(menuFilter));
  };

  const handleFilterClear = () => {
    dispatch(clearFilterMenuAction());
  };

  return (
    <div className="container">
      <h1>GESTION DE</h1>
      <div>
        <label>plat</label>
        <input type="text" value={plat} onChange={(e) => setPlat(e.target.value)} />
        <br /><br />
        <label>drink</label>
        <input type="text" value={drink} onChange={(e) => setDrink(e.target.value)} />
        <br /><br />
        <label>dessert</label>
        <input type="text" value={dessert} onChange={(e) => setDessert(e.target.value)} />
        <br /><br />
        <label>menu</label>
        <select value={menu} onChange={(e) => setMenu(e.target.value)}>
          {menus.map((menuOption, i) => (
            <option key={i} value={menuOption.id}>{menuOption.plat}</option>
          ))}
        </select>
        <button style={styles.buttonPrimary} onClick={() => handleEnregistrer()}>
          Enregistrer
        </button>
        <button style={styles.buttonSecondary} onClick={() => handleClear()}>
          Clear
        </button>
      </div>
      <div>
        <label>Filtrer par menu</label>
        <select value={menuFilter} onChange={(e) => setMenuFilter(e.target.value)}>
          {menus.map((menuOption, i) => (
            <option key={i} value={menuOption.id}>{menuOption.plat}</option>
          ))}
        </select>
        <button style={styles.buttonPrimary} onClick={() => handleFilter()}>
          Filtrer
        </button>
        <button style={styles.buttonSecondary} onClick={() => handleFilterClear()}>
          Clear
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>plat</td>
            <td>drink</td>
            <td>dessert</td>
            <td>menu</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {listeUsersMap.map((user, index) => {
            const userMenu = menus.find((v) => v.id === parseInt(user.menu));
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.plat}</td>
                <td>{user.drink}</td>
                <td>{user.dessert}</td>
                <td>{userMenu ? userMenu.plat : user.plat}</td>
                <td>
                  <button style={styles.buttonPrimary} onClick={() => handleRemplirForm(user.id)}>
                    Modifier
                  </button>
                  <button style={styles.buttonSecondary} onClick={() => handleDelete(user.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
