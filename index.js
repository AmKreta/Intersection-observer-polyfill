const root = document.getElementById('root');
const container = document.getElementById('container');
const observable = document.getElementById('observable');

console.log(root, container, observable);

class IntersectionObserver{
    constructor(root){
        this.root = root;
        this.observables = new Map();
        this.init();
        this.visibleElements = new Set();
    }

    scroll=(e)=>{
        const rootScrollTop = this.root.scrollTop;
        const rootClientHeight = this.root.clientHeight;
        this.observables.forEach((callback, element)=>{
            const elementOffsetTop = element.offsetTop;
            const elementClientHeight = element.clientHeight;
            const isVisible = rootScrollTop <= elementOffsetTop + elementClientHeight
                && elementOffsetTop <=rootClientHeight + rootScrollTop;
            if(isVisible){
                if(!this.visibleElements.has(element)){
                    callback('true', element);
                    this.visibleElements.add(element);
                }
            }
            else{
                if(this.visibleElements.has(element)){
                    this.visibleElements.delete(element);
                    callback('false', element);
                }
            }
        })
    }

    init(){
        this.root.addEventListener('scroll', this.scroll);
    }

    addObservable(el, cb){
        this.observables.set(el, cb);
    }

    removeObservable(el){
        this.observables.delete(el);
    }

    decompose(){
        this.root.removeObservable('scroll', this.scroll);
    }
};

const intersectionObserver = new IntersectionObserver(root);
intersectionObserver.addObservable(observable, (status, element)=>{
    console.log(status, element);
})

console.log(intersectionObserver);