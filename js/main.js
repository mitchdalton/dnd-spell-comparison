// Add Event Listeners
const allButtons = document.querySelectorAll('.searchButton')
Array.from(allButtons).forEach(element => element.addEventListener('click', handleClick))




// Spells
function handleClick(click) {
    let searchQ = ''
    let spell = 'B'

    if (click.target.classList.contains('buttonA')) {
        searchQ = document.getElementById('searchBarA').value.replace(' ', '-').toLowerCase()
        spell = 'A'
    } else {
        searchQ = document.getElementById('searchBarB').value.replace(' ', '-').toLowerCase()
    }
    
    fetch(`https://www.dnd5eapi.co/api/spells/${searchQ}`)
        .then(response => response.json())
        .then(data => handleSpellsObj(data, spell))
        .catch(error => console.log(error));
}


function handleSpellsObj(obj, str) {
    console.log(obj)
    document.querySelector('.flex-child:first-child').style = 'border-right: 2px solid black;'
    document.querySelector(`#descTitle${str}`).innerText = obj.name
    document.querySelector(`#type${str}`).innerText = `Attack Type: ${obj.attack_type}`
    document.querySelector(`#castingTime${str}`).innerText = `Casting Time: ${obj.casting_time}`
    document.querySelector(`#range${str}`).innerText = `Range: ${obj.range}`
    document.querySelector(`#damage${str}`).innerText = obj.damage.damage_at_slot_level ? `Damage: ${obj.damage.damage_at_slot_level['1']}` : `Damage: ${obj.damage.damage_at_character_level['1']}`
    document.querySelector(`#damageType${str}`).innerText = `Damage Type: ${obj.damage.damage_type.name}`
    document.querySelector(`#duration${str}`).innerText = `Duration: ${obj.duration}`
    document.querySelector(`#classes${str}`).innerText = `Available To: ${obj.classes.map(e => e.name).join(', ')}`
    document.querySelector(`#description${str}`).innerText = `Description: ${obj.desc.join('\n \n')} \n \n ${obj.higher_level.join(', ')}`
}