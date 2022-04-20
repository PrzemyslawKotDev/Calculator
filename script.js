class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state={
      operation: '0',
      display: '0',
      operationSign: ' '
    }    
    this.brain = this.brain.bind(this);
  }
  brain(e){
    const item = e.target.innerText;   
    switch(item){
      case 'C': console.log('doneC');                    // KASOWANIE
      this.setState({
      operation: '0',
      display: '0',
      operationSign: '0'
      }); break;
      case '=':                                                          //LICZENIE
      if(this.state.operation.slice(-2) === '/0'){                            //NIE DZIEL PRZEZ ZERO
      this.setState({
      operation: this.state.operation,
      display: 'NO DIVIDE BY 0',
      operationSign: this.state.operationSign
      });
       } else if(this.state.operationSign === '/'|| this.state.operationSign === '*'|| this.state.operationSign === '-'|| this.state.operationSign === '+' || this.state.operationSign === '.'){                                          //UTNIJ ZNAKI NA KONCU
      this.setState({
      operation: eval(this.state.operation.slice(0, this.state.operation.length-1).toString()),
      display: eval(this.state.operation.slice(0, this.state.operation.length-1).toString()),
      operationSign: "0"
      })} else                                                              // WYNIK
      this.setState({
      operation: eval(this.state.operation).toString(),
      display: eval(this.state.operation).toString(),
      operationSign: '0'
      }); break;
      case '*': case '/': case '-': case '+': case '.':                     //DZIALANIA NA ZNAKACH
        if(this.state.operationSign === '/'|| this.state.operationSign === '*'|| this.state.operationSign === '-'|| this.state.operationSign === '--'|| this.state.operationSign === '+' || this.state.operationSign === '.'){           
          if(this.state.display.includes('.') && item === '.'){                     //JESLI JEST KROPKA W DANEJ LICZBIE TO NIC NIE ROBI
      this.setState({
      operation: this.state.operation,
      display: this.state.display,
      operationSign: '0'
      })}else if(this.state.display.includes('*-') && item !=="-"){         //ZMIANA MNOZENIE UJEMNEJ
                  this.setState({
      operation: this.state.display.slice(0, this.state.display.length-2) + item,
      display: this.state.display.slice(0, this.state.display.length-2) + item,
      operationSign: item })     
      }else if(this.state.operationSign === '-' && item === '-'){               //WYJATEK WPISANIA DWOCH --
                this.setState({
                 operation:this.state.operation.slice(0, this.state.operation.length-1) + '+',
                 display: this.state.display + item,
                  operationSign: this.state.operationSign + item
      })} else if(this.state.display.includes('--')){                             //WYJATEK ZMIANY DWOCH --
                  this.setState({
      operation: this.state.operation.slice(0, this.state.operation.length-1) + item,
      display: this.state.display.slice(0, this.state.display.length-2) + item,
      operationSign: item })
                } else if(this.state.display.includes('*') && item ==="-"){         //ZNAK MNOZENIA i +/-
                  this.setState({
      operation: this.state.operation + item,
      display: this.state.display + item,
      operationSign: item })     
                }else this.setState({                                                      //WYMIANA ZNAKU
      operation: this.state.operation.slice(0, this.state.operation.length-1) + item,
      display: this.state.display.slice(0, this.state.display.length-1) + item,
      operationSign: item
      })} else if(this.state.display.indexOf('.') !== -1 && item === '.'){                     //JESLI JEST KROPKA W DANEJ LICZBIE TO NIC NIE ROBI
      this.setState({
      operation: this.state.operation,
      display: this.state.display,
      operationSign: '0'
      })}else this.setState({                                                  //DODANIE ZNAKU
      operation: this.state.operation + item,
      display: this.state.display + item,
      operationSign: item
      }); break;
      case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':   //CYFRY
        if(this.state.operation === '0'){                                      //WPISANIE CYFRY NA PUSTO USUWA 0 Z PRZODU
       this.setState({
       operation: item,
       display: item,
       operationSign: '0'
      })}else if(this.state.operationSign !== '0'){                                 //DOPISANIE CYFRY
         if(this.state.operationSign === '.'){                                     //DOPISANIE KROPKI
      this.setState({
      operation: this.state.operation + item,
      display: this.state.display + item,
      operationSign: '0'
      })}else this.setState({
      operation:  this.state.operation + item,
      display: item,
      operationSign: '0'
      })}else this.setState({
      operation: this.state.operation + item,
      display: this.state.display + item,
      operationSign: '0'
      })
    }
  }  
render(){
  return (
<div id='calculator' className="container">
  <div id="displayer">
    <div id='upperDisplay'>{this.state.operation}
    </div>
    <div id="display">{this.state.display}
    </div>
  </div>
    <div id="keypad">
      <div id="clear" className="bigButton" onClick={this.brain}>C</div>
      <div id="divide" className="button" onClick={this.brain}>/</div>
      <div id="multiply" className="button" onClick={this.brain}>*</div>
      <div id="seven" className="button" onClick={this.brain}>7</div>
      <div id="eight" className="button" onClick={this.brain}>8</div>
      <div id="nine" className="button" onClick={this.brain}>9</div>
      <div id="subtract" className="button" onClick={this.brain}>-</div>
      <div id="four" className="button" onClick={this.brain}>4</div>
      <div id="five" className="button" onClick={this.brain}>5</div>
      <div id="six" className="button" onClick={this.brain}>6</div>
      <div id="add" className="button" onClick={this.brain}>+</div>
      <div id="one" className="button" onClick={this.brain}>1</div>
      <div id="two" className="button" onClick={this.brain}>2</div>
      <div id="three" className="button" onClick={this.brain}>3</div>
      <div id="zero" className="bigButton" onClick={this.brain}>0</div>
      <div id="decimal" className="button" onClick={this.brain}>.</div>
      <div id="equals" onClick={this.brain}>=</div>
    </div>
</div>
  )
}}
ReactDOM.render(<Calculator />, document.getElementById("app"))
