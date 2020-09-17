const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)
    
    if (!duplicateNote) {
        const newNote = {
            title: title,
            body: body
        }
        notes.push(newNote)
        saveNotes(notes)
        console.log(chalk.green.bold('SUCCESS ') + chalk.reset('New note added!'))
    } else {
        console.log(chalk.red.bold('ERROR ') + chalk.reset('Note with title \'') +  title + '\' already exists!')
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesFound = notes.filter(note => note.title === title)

    if (notesFound.length === 1) {
        const index = notes.indexOf(notesFound[0])
        notes.splice(index, 1)
        saveNotes(notes)
        console.log(chalk.green.bold('SUCCESS ') + chalk.reset('Note removed!'))
    } else {
        console.log(chalk.red.bold('ERROR ') + chalk.reset('Note with title \'') +  title + '\' doesn\'t exist!')
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.bold('SUCCESS ') + chalk.reset('Your notes:'))
    notes.forEach((note,index) => console.log(chalk.bold.green('(') + chalk.bold.green((index+1)) + chalk.green.bold(') ') + chalk.reset() + 'title: ' + note.title + ', body: ' + note.body))
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find(note => note.title === title)

    if (foundNote) {
        console.log(chalk.green.bold('SUCCESS ') + chalk.reset('Your note:'))
        console.log('title: ' + foundNote.title + ', body: ' + foundNote.body)
    } else {
        console.log(chalk.red.bold('ERROR ') + chalk.reset('Note with title \'') +  title + '\' doesn\'t exist!')
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const data = JSON.parse(dataBuffer.toString());
        return data;
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

module.exports = { addNote, removeNote, listNotes, readNote};