const deleteItem = [...document.querySelectorAll('.delete')]
deleteItem.forEach(x => {
    x.addEventListener('click', deleteEdit)
})
async function deleteEdit(){
    const name = this.parentNode.childNodes[1].innerText
    const date = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': name,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
//console.log(name)
