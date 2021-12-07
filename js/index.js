const URL_PREFIX='http://localhost:3000/monsters/';
let counter = 1 

document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container')
    const createMonsterDiv = document.getElementById('create-monster')
    
    fetchMonsters();
    createMonster();
    fetchNexstPage();

    
    function fetchMonsters(){
    fetch (`${URL_PREFIX}?_limit=50&_page=${counter}`)
    .then((resp) => resp.json())
    .then((json) => initDisplay(json))
    }

    function initDisplay(monsters) {
        monsterContainer.innerText = ''
        for (const key in monsters) {
        //grabber
        const name = monsters[key].name;
        const age = monsters[key].age;
        const description = monsters[key].description;
        const id = monsters[key].id;
        
        //elements 
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');

        //append
        h2.innerText = name
        h4.innerText = age
        p.innerText = description 
        div.id = id
        div.append(h2)
        div.append(h4)
        div.append(p)
        monsterContainer.appendChild(div)
        }
    }

    function createMonster() {
        //make and append form
        const form = document.createElement('form');
        form.id = 'monster-form';

        const inputName = document.createElement('input');
        inputName.id = 'name';
        inputName.placeholder = 'name...';

        const inputAge = document.createElement('input');
        inputAge.id = 'age';
        inputAge.placeholder = 'age...';

        const inputDescription = document.createElement('input');
        inputDescription.id = 'description';
        inputDescription.placeholder = 'description...';

        const btn = document.createElement('button');
        btn.innerText = 'Create';
        
        form.append(inputName, inputAge, inputDescription, btn)
        createMonsterDiv.appendChild(form)

        //add listener to handle/POST 
        form.addEventListener('submit', e => postNewMonster(e))
    }

    function postNewMonster(e){
        e.preventDefault();

        // input grabbers 
        const inputName = document.getElementById('name').value;
        const inputAge = document.getElementById('age').value;
        const inputDescription = document.getElementById('description').value;
        
        //create obj to POST 
        const newMonsterObj = {
            name: inputName,
            age: inputAge,
            description: inputDescription
        }

        // fetch POST
        fetch(`${URL_PREFIX}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(newMonsterObj)        
        })
    }

    function fetchNexstPage(){
        const forwardBtn = document.getElementById('forward');
        const backBtn = document.getElementById('back');
        
        forwardBtn.addEventListener('click', () => forward())
        backBtn.addEventListener('click', () => back())
        backBtn.setAttribute('disabled', true)
        console.log(counter)

        function forward(){
            counter +=1;
            fetchMonsters();
            console.log(counter)
            backBtn.removeAttribute('disabled')
            return counter
        }

        function back(){
            counter -= 1;
            fetchMonsters();
            if (counter === 1){
                backBtn.setAttribute('disabled', true)
            }
            else {
                backBtn.setAttribute('disabled', false)
            }
            return counter
        }
    }
})



