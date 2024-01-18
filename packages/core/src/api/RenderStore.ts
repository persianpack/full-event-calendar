

export class RenderStore {
    subscribers:any = []
    state  = new Map()
    constructor() {
      this.subscribers = [];
    }
  
    subscribe(subscriber:any) {
      this.subscribers.push(subscriber);
  
      // Return a function to unsubscribe
      return () => {
        this.subscribers = this.subscribers.filter((sub:any) => sub !== subscriber);
      };
    }
  
    dispatch(customRender:any) { 
      this.state.set(customRender.id,customRender)
      console.log('slot render req',customRender)
    
      // Notify subscribers about the state change
      this.subscribers.forEach((subscriber:any) => {
        if (typeof subscriber === 'function') {
        }
        subscriber(this.state);
      });
    }
    
    remove(id:any){
      this.state.delete(id)
    }
    
    getState() {
      return this.state;
    }
  }

