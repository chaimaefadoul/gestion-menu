export const addMenuAction = (menu) => {
    return {type:"Add_Menu", payload:menu}
}

export const updateMenuAction = (menu) => {
    return {type:"Update_Menu", payload:menu}
}

export const deleteMenuAction = (id) => {
    return {type:"Delete_Menu", payload:id}
}

export const filterMenuAction = (idVille) => {
    return {type:"Filter_Menu", payload:idVille}
}

export const clearFilterMenuAction = () => {
    return {type:"Clear_Filter_Menu"}
}
