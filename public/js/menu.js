const toggleSideDrawer = () => {
  const backdrop = document.querySelector('.backdrop');
  const backdropClasses = Array.from(backdrop.classList);
  if(backdropClasses.some(className => className === 'hide')) {
    backdrop.classList = backdropClasses.filter(className => className !== 'hide');
  } else {
    backdrop.classList.add('hide')
  }
  const sideDrawer = document.querySelector('.side-drawer');
  const sideDrawerClasses = Array.from(sideDrawer.classList);
  if(sideDrawerClasses.some(className => className === 'open')) {
    sideDrawer.classList = sideDrawerClasses.filter(className => className !== 'open');
  } else {
    sideDrawer.classList.add('open')
  }
}