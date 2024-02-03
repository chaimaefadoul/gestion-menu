const initialState = {
    menu: [
      { id: 1, plat: "pizza" },
      { id: 2, plat: "pasta" },
      { id: 3, plat: "payla" },
    ],
    users: [
      { id: 1, plat: "pizza", drink: "coca", dessert: "crepe", menu: 1 },
      { id: 2, plat: "pasta", drink: "sprite", dessert: "cheesecake", menu: 2 },
    ],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "Add_Menu":
        return { ...state, users: [...state.users, action.payload] };
      case "Update_Menu":
        const updatedUsers = state.users.map((user) =>
          user.id === parseInt(action.payload.id)
            ? {
                ...user,
                plat: action.payload.plat,
                drink: action.payload.drink,
                dessert: action.payload.dessert,
                menu: parseInt(action.payload.menu),
              }
            : user
        );
        return { ...state, users: updatedUsers };
      case "Delete_Menu":
        return {
          ...state,
          users: [...state.users.filter((user) => user.id !== parseInt(action.payload))],
        };
      case "Filter_Menu":
        return {
          ...state,
          usersFilter: [...state.users.filter((user) => user.menu === parseInt(action.payload))],
        };
      case "Clear_Filter_Menu":
        return { ...state, usersFilter: null };
      default:
        return state;
    }
  };
  
  export default reducer;
  