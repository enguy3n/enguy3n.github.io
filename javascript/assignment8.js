const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

let storyText = 'The reason why :insertx:, an animal weighing 300 pounds, went extinct is because one day they went to :inserty: with God and :insertz:.  God would have just went home, but it was 94 fahrenheit and that\'s gross, so they buried the body before and that\'s why it\'s a fossil.';
let insertX = ['Entelodont','Kaprosuchus','Utahraptor'];
let insertY = ['the convenience store', 'hell', 'Monterey Bay Aquarium'];
let insertZ = ['were so excited they died', 'got lost in the merchandise aisle', 'realized they were allergic to eggs'];

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

   newStory = newStory.replace(/:insertx:/g, xItem);
   newStory = newStory.replace(':inserty:', yItem);
   newStory = newStory.replace(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace(/God/g, name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300/14) +  ' stone';
    const temperature =  Math.round((94-32)*5/9) + ' centigrade';

    newStory = newStory.replace('94 fahrenheit', temperature);
    newStory = newStory.replace('300 pounds', weight);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}