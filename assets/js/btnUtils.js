export = {

    deleteButton: () => {
        let btn = document.createElement('button')
        btn.setAttribute('class', 'btn btn-sm btn-warning')
        btn.setAttribute('id', 'delete-button')
        btn.innerHTML = Delete
        btn.addEventListener('click', handleDeleteBook)
    },

    handleDeleteBook: (bookIndex) => {
        let btn = document.getElementbyId('delete-button')
    },

    print: () => {
        console.log('hello there ')
    }

}