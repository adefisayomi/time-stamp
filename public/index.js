const form = document.getElementById('form')
const output = document.getElementById('output')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const timeStamp = formData.get('timeStamp')
    const data = { timeStamp }

    const url = 'http://localhost:5000/api/timestamp'
    const config = {
        method: 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type': 'application/json',

        }
    }
    const res = await fetch(url, config)
    const rep = await res.json()
    console.log(rep)
    output.innerText = JSON.stringify(rep)
    
})


   
