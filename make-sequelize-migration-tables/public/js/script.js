let addRowBtn = document.querySelector('#add-row-button')
let btn = document.querySelector('#submit-button')
let columnName = document.querySelector('#column-name')
let dataType = document.querySelector('#data-type')
let allowNull = document.querySelector('#allow-null')
let downloadScriptBtn = document.querySelector('#download-script')
let num = 0
let all = ''
let dataTypes = ['INTEGER', 'BIGINT', 'STRING(255)']

addRowBtn.addEventListener('click', function (e) {
	e.preventDefault()
	addNewRow()
	update()
})

function update() {
	document.querySelectorAll('.delete-row-btn').forEach((btn) => {
		btn.addEventListener('click', function (e) {
			e.target.parentElement.parentElement.remove()
		})
	})
}

function addNewRow() {
	num++
	document.querySelector('.tbody').insertAdjacentHTML(
		'beforeend',
		`
		<tr>
			<td><input type="text" name='row-${num}' /></td>
			<td>
					<select name="row-${num}">
						${makeDatatypeDropdownOptions()}
					</select>
			</td>
			<td><input type="checkbox" name="row-${num}" checked='true'/></td>
			<td><button class='delete-row-btn' type='button'>Delete</button></td>
		</tr>
	`
	)
}

function makeDatatypeDropdownOptions() {
	let optionsHtml = ''
	for (let i = 0; i < dataTypes.length; i++) {
		optionsHtml += `<option value=${dataTypes[i]}>${dataTypes[i]}</option>`
	}
	return optionsHtml
}
btn.addEventListener('click', function (e) {
	e.preventDefault()
	let tableName = document.getElementById('table-name').value
	let obj = {}
	let form = new FormData(document.getElementById('my-form'))
	for (let [key, value] of form) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]]
			}
			obj[key].push(value)
		} else {
			obj[key] = value
		}
	}
	all += returnCommonSequelizeScript(tableName, obj)
	getSequelizeScript(tableName, all, (fileName) => {
		downloadSequelizeScript(fileName)
		all = ''
	})
})

function returnCommonSequelizeScript(tableName, obj) {
	return `
			const Sequelize = require('sequelize')	
			const sequelize = require('../../application/config/db.connect.js')

			const ${tableName} = sequelize.define('${tableName}', {
				id:{ 
					type:Sequelize.INTEGER, 
					allowNull: false, 
					primaryKey: true, 
					autoIncrement: true
				},
				${makeTableColumns(obj)}	
			})
			module.exports = ${tableName}
		`
}

function makeTableColumns(obj) {
	let columns = ''
	for (let i of Object.values(obj)) {
		columns += makeColumns(i[0], i[1], i[2])
	}
	return columns
}

function makeColumns(columnName, dataType, allowNull) {
	return `
			${columnName} : {
				type: Sequelize.${dataType.toUpperCase()}, 
				allowNull: ${allowNull ? true : false}
			},
			`
}

function getSequelizeScript(fileName, script, cb) {
	let sendData = {
		fileName,
		script,
	}
	fetch('/post-sequelize-script', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sendData),
	})
		.then((response) => {
			return response.json()
		})
		.then((result) => {
			if (result.success === 1) {
				cb(fileName)
			} else {
				throw new Error('Something went wrong')
			}
		})
		.catch((err) => {
			console.log(err)
		})
}

function downloadSequelizeScript(fileName) {
	downloadScriptBtn.setAttribute('href', `/get-sequelize-file?fileName=${fileName}`)
}
