// import ' ./src/src/css/jquery.datatables.css'
import React from 'react';
import ReactDOM from 'react-dom';

const $ = require('jquery')
$.DataTable = require('datatables.net')

class Tbl extends React.Component {
    componentDidMount() {
        console.log(this.el)
        this.$el = $(this.el)
        this.$el.DataTable({
            data: this.props.data,
            columns: [
                { title: "Name" },
                { title: "Position" },
                { title: "Office" },
                { title: "Extn." },
                { title: "Start date" },
                { title: "Salary" },
                { title: "Action" }

            ]
        }

        )
    }


    componentWillUnmount() {

    }
    render() {
        return (
            <div>
                <table className="display" width="100%" ref={el => this.el = el}></table>
                {/* <button id="addrow">Add</button> */}

            </div>
        )
    }
}
export default Tbl