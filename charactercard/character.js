const character = {
      name: "Snortleblat",
      class: "Swamp Beast Diplomat",
      level: 5,
      health: 100,
      image: 'snortleblat.webp',
      attacked() {
        if (this.health >= 20) {
          this.health -= 20;
        } else {
            alert('Character Died');
        }
      },
      levelUp() {
        this.level += 1;
      }
};

document.querySelector('.image').src = character.image;
document.querySelector('.name').innerHTML = character.name;
document.querySelector('#class').innerHTML = character.class;
document.querySelector('#level').innerHTML = character.level;
document.querySelector('#health').innerHTML = character.health;

document.querySelector('#attacked').addEventListener('click', function(){
    character.attacked();
    document.querySelector('#level').innerHTML = character.level;
    document.querySelector('#health').innerHTML = character.health;
})

document.querySelector('#levelup').addEventListener('click', function(){
    character.levelUp();
    document.querySelector('#level').innerHTML = character.level;
    document.querySelector('#health').innerHTML = character.health;
})