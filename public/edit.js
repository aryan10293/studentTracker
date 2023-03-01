const updateItem = [...document.querySelectorAll('.update')]
const name = document.getElementById('name').value
const position = document.getElementById('position').value
const height = document.getElementById('height').value
const weight = document.getElementById('weight').value
updateItem.forEach(x => {
    x.addEventListener('click', edit)
})
async function edit(){
    const nameUp = document.getElementById('name').value
    const positionUp = document.getElementById('position').value
    const heightUp = document.getElementById('height').value
    const weightUp = document.getElementById('weight').value
    console.log(name)
    console.log(position)
    console.log(height)
    console.log(weight)
    try{
        const response = await fetch('/editPlayer/edit', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "nameS": name,
              "positionS": position,
              "heightS": height,
              "weightS": weight,
              "nameUp": nameUp,
              "positionUp": positionUp,
              "heightUp": heightUp,
              "weightUp": weightUp,
            })
          })
        const data = await response.json()
        console.log(data)
        //location.reload()

    }catch(err){
        console.log(err)
    }
}