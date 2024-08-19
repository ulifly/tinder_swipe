let isAnimating = false;
let pullDeltaX = 0;


function startDrag (event) {
  if (isAnimating) return;


  //obtiene el primer elemento article
  const actualCard = event.target.closest('article')

  //obtiene la posición inicial del mouse o dedo
  const startX = event.pageX ?? event.touches[0].pageX;

  //escucha el evento de arrastre
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);

  document.addEventListener('touchmove', onMove, {passive: true});
  document.addEventListener('touchend', onEnd, {passive: true});

  function onMove (event) {
    //obtiene la posición actual del mouse o dedo
    const currentX = event.pageX ?? event.touches[0].pageX;
    //calcula la distancia recorrida entre el punto inicial y el final
    pullDeltaX = currentX - startX;

    if(pullDeltaX===0) return;
    
    isAnimating = true;
    //calcula la rotación de la tarjeta usando la distancia recorrida
    const deg = pullDeltaX / 15;
    //aplica la rotación a la tarjeta
    actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;
    //cambia el cursor a grabbing
    document.body.style.cursor = 'grabbing';
  }
  function onEnd(event) {
    //elimina los eventos de arrastre
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);

    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);

    //restablece la rotación de la tarjeta
    actualCard.style.transform = '';
    //restablece el cursor
    document.body.style.cursor = '';

    //si la distancia recorrida es mayor a 100px
    if (Math.abs(pullDeltaX) > 100) {
      //si la distancia recorrida es positiva
      if (pullDeltaX > 0) {
        //muestra la siguiente tarjeta
        showNextCard(actualCard);
      } else {
        //muestra la tarjeta anterior
        showPrevCard(actualCard);
      }
    }
    //restablece la distancia recorrida
    pullDeltaX = 0;

  }
}



document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, {passive: true});