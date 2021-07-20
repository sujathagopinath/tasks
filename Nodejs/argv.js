// console.log(process);

// console.log(process.argv);

const value = process.argv[2];
console.log(process.argv);

if (value == 'add') {
    console.log('value is added');
}
else {
    console.log('value is not added');
}

const yargs = require('yargs');

const notes = ["note1", "note2"]

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'This is new title',
            demandOption: true,
            type: 'String'
        }
    },
    handler: function (argv) {
        notes.push(argv.title)
        console.log(notes);
    }
})
console.log(yargs.argv)