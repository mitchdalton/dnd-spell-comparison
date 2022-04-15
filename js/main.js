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
    document.querySelector(`#descTitle${str}`).innerText = obj.name ? obj.name : 'Not Found'
    document.querySelector(`#type${str}`).innerText = obj.school.name ? `Type: ${obj.school.name}` : 'none'
    document.querySelector(`#castingTime${str}`).innerText = obj.casting_time ? `Casting Time: ${obj.casting_time}` : 'not defined'
    document.querySelector(`#range${str}`).innerText = obj.range ? `Range: ${obj.range}` : 'not defined'
    if (obj.damage) {
        document.querySelector(`#damage${str}`).innerText = obj.damage.damage_at_slot_level ? `Damage: ${obj.damage.damage_at_slot_level['1']}` : `not defined`
        document.querySelector(`#damage${str}`).innerText = obj.damage.damage_at_character_level ? `Damage: ${obj.damage.damage_at_character_level['1']}` : 'not defined'
    }
    document.querySelector(`#damageType${str}`).innerText = obj.damage ? `Damage Type: ${obj.damage.damage_type.name}` : null
    document.querySelector(`#duration${str}`).innerText = `Duration: ${obj.duration}`
    document.querySelector(`#classes${str}`).innerText = `Available To: ${obj.classes.map(e => e.name).join(', ')}`
    document.querySelector(`#description${str}`).innerText = `Description: ${obj.desc.join('\n \n')} \n \n ${obj.higher_level.join(', ')}`
}