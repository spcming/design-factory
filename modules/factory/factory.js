import ModalType from './typing.js'

class Modal {
    constructor(status){
        this.status = status
    }
    
    get className(){
        let classStr = 'modal'
        switch(this.status){
            case ModalType.SUCCESS:
                classStr += ' success';
                break;
            case ModalType.WARNING:
                classStr += ' warning';
                break;
            case ModalType.ERROR:
                classStr += ' error';
                break;
            default:
                break;
        }
        return classStr
    }

    static checkStatusIsExist(types, status) {
        for(let k in types){
            if(types[k] === status){
                return true
            }
        }
        return false
    }

    static outputInfo(info){
        console.log(info)
    }
}

class SuccessModal extends Modal{
    constructor(title){
        super(ModalType.SUCCESS)
        this.title = '成功：' + title;
    }
    goHome(url){
        setTimeout(() => {
            window.location.href = url;
        }, 3000);
    }
}

class WarningModal extends Modal{
    constructor(title){
        super(ModalType.WARNING)
        this.title = '告警：' + title;
    }

    outputInfo(info){
        Modal.outputInfo('告警信息：' + info)
    }
}

class ErrorModal extends Modal{
    constructor(title){
        super(ModalType.ERROR)
        this.title = '错误：' + title;
    }
    outputInfo(info){
        Modal.outputInfo('错误信息：' + info)
    }
}

class ModalFactory {
    constructor(dom){
        this.dom = dom
    }

    create(title, status){
        let statusIsCorrect = Modal.checkStatusIsExist(ModalType, status)
        if(!statusIsCorrect){
            throw new Error('ModalType is incorrect.');
        }
        const dom = this.dom
        let modal = null
        switch(status){
            case ModalType.SUCCESS:
                modal = new SuccessModal(title);
                break;
            case ModalType.WARNING:
                modal = new WarningModal(title);
                break;
            case ModalType.ERROR:
                modal = new ErrorModal(title);
                break;
            default:
                break;
        }
        dom.getElementsByTagName('header')[0].innerText = modal.title;
        dom.className = modal.className
        return {
            outputInfo: modal.outputInfo,
            goHome: modal.goHome
        }
    }
    
}

export default ModalFactory