import React, {Componet} from 'react';

class HelloComponet extends Component{
    sayHello()
    {

    }
    render(){
        return (
            <div>
                <h1>함수호출하기</h1>
                <button type="button" onClick={this.sayHello}>누르기</button>
            </div>
        )
    }
}

export default HelloComponet;