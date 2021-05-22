import ModalFactory from './factory.js'


;import ModalType from './typing.js';
(()=>{
  let oModal = document.getElementsByClassName('modal')[0]
  let oButton = document.getElementsByClassName('button-group')[0]
  const modalFactory = new ModalFactory(oModal)

  function init(){
    bindEvent()
  }

  function bindEvent(){
    oButton.addEventListener('click', handleBtnClick, false)
  }

  function handleBtnClick(e){
    let tar = e.target
    let tagName = tar.tagName.toLowerCase()

    if(tagName === 'button'){
      const status = tar.dataset.status
      // changeStatus(status)
      let modal = modalFactory.create('这是一个工厂模式的实例', status)
      switch(status){
        case ModalType.SUCCESS:
          modal.goHome('https://baidu.com');
          break;
        case ModalType.WARNING:
          modal.outputInfo('告警信息');
          break;
        case ModalType.ERROR:
          modal.outputInfo('错误信息')
          break;
        default:
          break;
      }
    }

    // function changeStatus(status){
    //   switch(status){
    //     case 'S':
    //       oModal.className = 'modal success'
    //       break;
    //     case 'W':
    //       oModal.className = 'modal warning'
    //       break;
    //     case 'E':
    //       oModal.className = 'modal error'
    //       break;
    //     default:
    //       break;
    //   }
    // }
    
  }

  init();
})();