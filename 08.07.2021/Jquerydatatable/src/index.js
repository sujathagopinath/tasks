import React from 'react';
import ReactDOM from 'react-dom';
import Tbl from './table'

class Datatabular extends React.Component {
    render() {
        return (
            <div>
                <h1>Jquery Datatable</h1>
                {/* <Table data=""/>  */}
                <Tbl data={this.dataSet} />
            </div>
        )
    }
    dataSet = [
        ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800", <button>Add</button>],
        ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
        ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
        ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
        ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
        ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
        ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
        ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
        ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
        ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
        ["Sujatha", "Trainee", "Aspire", "12345", "2021/04/07", "$103,601"],



    ];
}

ReactDOM.render(<Datatabular />, document.getElementById('root'))
