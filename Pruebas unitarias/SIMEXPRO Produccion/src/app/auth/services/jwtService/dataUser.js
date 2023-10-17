function user () {
    const user = JSON.parse(localStorage.getItem('user'))
    return user;
}

export default user