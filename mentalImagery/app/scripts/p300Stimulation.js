
document.getElementById("startStimulation").addEventListener("click", startStimulation);
var images = [];
images[0] = 'resources/mentalImg/img/carretera.jpeg';
images[1] = 'resources/mentalImg/img/ciudad.jpg';
images[2] = 'resources/mentalImg/img/ciudad.jpg';
images[3] = 'resources/mentalImg/img/construccion.jpeg';
images[4] = 'resources/mentalImg/img/fabrica.jpg';
images[5] = 'resources/mentalImg/img/terreno.jpg';

function startStimulation() {
  var current = 0;
  var text = $('#text');
  text.hide();
  var both = text.add($('#flip'));

  var interval = setInterval(function() {
    both.toggle();
    text.text('');
    
    setTimeout(function() {
      both.toggle()
      flip.attr('src', images[current]);
    }, 4000);
    
    setTimeout(function() {
      both.toggle();
      text.text("Some randowm text");
      
      if (current < images.length - 1) {
        current++;
      } 
      else {
        clearInterval(interval);
      }
    }, 5400);
  }, 6000);
}